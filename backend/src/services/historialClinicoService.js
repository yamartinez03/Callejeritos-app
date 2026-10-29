const prisma = require('../../lib/prisma');
const AppError = require('../lib/AppError');
const { validar, parseId } = require('../lib/validar');

/*
 * Cómo se modela el historial según el schema.prisma:
 *  - HistorialClinico: una entrada del historial de un animal (fecha + descripción).
 *  - RegistroAtencionMedica: cuelga de una entrada, indica la veterinaria/profesional
 *    (Responsable) y el tipo (VACUNA, DESPARASITACION, ESTUDIO, TRATAMIENTO).
 *  - Cada tipo tiene su tabla de detalle (RegistroVacuna, RegistroDesparasitacion, etc).
 * "Registrar atención veterinaria" (GH_02) crea solo la entrada. Vacuna, desparasitación,
 * estudio y tratamiento crean la entrada (salvo que se indique idhistorial) + el registro.
 */

const incluirResponsable = {
  select: { idresponsable: true, nombre: true, telefono: true, email: true, tipo: true },
};

const incluirDetalle = {
  responsable: incluirResponsable,
  registrovacuna: { include: { vacuna: true } },
  registrodesparasitacion: true,
  registroestudio: true,
  registrotratamiento: true,
};

const esquemaAtencion = {
  fecha: { tipo: 'fecha' },
  descripcion: { tipo: 'string', max: 500 },
};

const esquemaComun = {
  idresponsable: { tipo: 'id' },
  idhistorial: { tipo: 'id', opcional: true }, // para colgar el registro de una entrada existente
};

const campoInvalido = (campo, mensaje) =>
  new AppError(400, 'Datos incompletos o no válidos', { campos: { [campo]: mensaje } });

// Configuración de cada tipo de registro
const TIPOS = {
  VACUNA: {
    relacion: 'registrovacuna',
    campoFecha: 'fechaaplicacion',
    esquema: {
      idvacuna: { tipo: 'id' },
      fechaaplicacion: { tipo: 'fecha' },
      fechavencimiento: { tipo: 'fecha' },
    },
    camposRelacion: ['idvacuna', 'fechaaplicacion', 'fechavencimiento'],
    validarFechas(d) {
      if (d.fechavencimiento <= d.fechaaplicacion) {
        throw campoInvalido('fechavencimiento', 'Debe ser posterior a la fecha de aplicación');
      }
    },
    // Verifica que la vacuna exista y devuelve su nombre para la descripción
    async verificarReferencias(d) {
      if (d.idvacuna === undefined) return undefined;
      const vacuna = await prisma.vacuna.findUnique({ where: { idvacuna: d.idvacuna } });
      if (!vacuna) throw campoInvalido('idvacuna', 'La vacuna indicada no existe');
      return vacuna.nombre;
    },
    descripcion: (d, nombreVacuna) => `Vacunación: ${nombreVacuna}`,
  },

  DESPARASITACION: {
    relacion: 'registrodesparasitacion',
    campoFecha: 'fechaaplicacion',
    soloUno: true,
    esquema: {
      producto: { tipo: 'string', max: 150 },
      dosis: { tipo: 'string', max: 50 },
      fechaaplicacion: { tipo: 'fecha' },
      proximaaplicacion: { tipo: 'fecha' },
    },
    camposRelacion: ['producto', 'dosis', 'fechaaplicacion', 'proximaaplicacion'],
    validarFechas(d) {
      if (d.proximaaplicacion <= d.fechaaplicacion) {
        throw campoInvalido('proximaaplicacion', 'Debe ser posterior a la fecha de aplicación');
      }
    },
    // Precondición: no puede haber una desparasitación vigente para el animal
    async verificarCreacion(d, idanimal) {
      const hoy = new Date();
      hoy.setUTCHours(0, 0, 0, 0);
      const vigente = await prisma.registroDesparasitacion.findFirst({
        where: {
          proximaaplicacion: { gte: hoy },
          registroatencionmedica: { historialclinico: { idanimal } },
        },
      });
      if (vigente) {
        throw new AppError(409, 'El animal ya tiene una desparasitación vigente', {
          proximaAplicacion: vigente.proximaaplicacion,
        });
      }
    },
    descripcion: (d) => `Desparasitación: ${d.producto}`,
  },

  ESTUDIO: {
    relacion: 'registroestudio',
    campoFecha: 'fecha',
    esquema: {
      fecha: { tipo: 'fecha' },
      tipo: { tipo: 'string', max: 50 },
      resultado: { tipo: 'string', max: 500 },
      archivo: { tipo: 'archivo' },
    },
    camposRelacion: ['fecha', 'tipo', 'resultado', 'archivo'],
    validarFechas() {},
    descripcion: (d) => `Estudio: ${d.tipo}`,
  },

  TRATAMIENTO: {
    relacion: 'registrotratamiento',
    campoFecha: 'fecha',
    esquema: {
      fecha: { tipo: 'fecha' },
      descripcion: { tipo: 'string', max: 500 },
      fechainicio: { tipo: 'fecha' },
      fechafin: { tipo: 'fecha' },
      medicacion: { tipo: 'string', max: 200 },
      archivo: { tipo: 'archivo' },
    },
    camposRelacion: ['descripcion', 'fechainicio', 'fechafin', 'medicacion', 'archivo'],
    validarFechas(d) {
      if (d.fechafin < d.fechainicio) {
        throw campoInvalido('fechafin', 'No puede ser anterior a la fecha de inicio');
      }
    },
    descripcion: (d) => `Tratamiento: ${d.descripcion}`,
  },
};

// ---------- Verificaciones ----------

async function verificarAnimal(idanimal) {
  const animal = await prisma.animal.findUnique({ where: { idanimal } });
  if (!animal) throw new AppError(404, 'El animal no existe');
}

async function verificarResponsable(idresponsable) {
  const responsable = await prisma.responsable.findUnique({ where: { idresponsable } });
  if (!responsable) {
    throw campoInvalido('idresponsable', 'La veterinaria o profesional indicado no existe');
  }
}

async function verificarHistorial(idanimal, idhistorial) {
  const entrada = await prisma.historialClinico.findFirst({ where: { idhistorial, idanimal } });
  if (!entrada) {
    throw campoInvalido('idhistorial', 'La entrada del historial no existe para este animal');
  }
}

// ---------- Consultar historial clínico ----------

async function consultarHistorial(idanimal) {
  await verificarAnimal(idanimal);

  return prisma.historialClinico.findMany({
    where: { idanimal },
    orderBy: [{ fecha: 'asc' }, { idhistorial: 'asc' }], // cronológico
    include: {
      registroatencionmedica: { orderBy: { fecha: 'asc' }, include: incluirDetalle },
    },
  });
}

// ---------- Registrar atención veterinaria ----------

async function registrarAtencion(idanimal, datos) {
  await verificarAnimal(idanimal);
  const d = validar(datos, esquemaAtencion);

  return prisma.historialClinico.create({ data: { idanimal, ...d } });
}

// ---------- Registrar vacuna, desparasitación, estudio, tratamiento ----------
// "datos" puede ser un objeto o un array (botón "Otra vacunación / Otro estudio / Otro tratamiento").
// Se valida todo antes de guardar y se guarda en una sola transacción.

async function registrarRegistros(idanimal, tipo, datos) {
  const cfg = TIPOS[tipo];
  await verificarAnimal(idanimal);

  const lista = Array.isArray(datos) ? datos : [datos];
  if (lista.length === 0) throw new AppError(400, 'No se enviaron datos para registrar');
  if (cfg.soloUno && lista.length > 1) {
    throw new AppError(400, 'Solo se puede registrar una desparasitación por vez');
  }

  const preparados = [];
  for (const [i, item] of lista.entries()) {
    try {
      const d = validar(item, { ...esquemaComun, ...cfg.esquema });
      cfg.validarFechas(d);
      await verificarResponsable(d.idresponsable);
      if (d.idhistorial) await verificarHistorial(idanimal, d.idhistorial);
      const extra = cfg.verificarReferencias ? await cfg.verificarReferencias(d) : undefined;
      if (cfg.verificarCreacion) await cfg.verificarCreacion(d, idanimal);

      preparados.push({
        d,
        fecha: d[cfg.campoFecha],
        descripcion: cfg.descripcion(d, extra).slice(0, 500),
      });
    } catch (error) {
      // Si se enviaron varios, indico cuál falló
      if (error instanceof AppError && lista.length > 1) {
        error.extra = { ...error.extra, registro: i + 1 };
      }
      throw error;
    }
  }

  return prisma.$transaction(async (tx) => {
    const creados = [];
    for (const { d, fecha, descripcion } of preparados) {
      let idhistorial = d.idhistorial;
      if (!idhistorial) {
        const entrada = await tx.historialClinico.create({
          data: { idanimal, fecha, descripcion },
        });
        idhistorial = entrada.idhistorial;
      }

      const detalle = Object.fromEntries(cfg.camposRelacion.map((campo) => [campo, d[campo]]));
      const registro = await tx.registroAtencionMedica.create({
        data: {
          idhistorial,
          idresponsable: d.idresponsable,
          tipo,
          fecha,
          [cfg.relacion]: { create: detalle },
        },
        include: incluirDetalle,
      });
      creados.push(registro);
    }
    return creados;
  });
}

// ---------- Modificar historial clínico ----------
// Body: { atenciones: [{ idhistorial, fecha?, descripcion? }], registros: [{ idregistro, idresponsable?, ...campos del tipo }] }
// Se aplican todos los cambios juntos (equivale al "Guardar" del formulario con un form por registro).

async function modificarHistorial(idanimal, body) {
  await verificarAnimal(idanimal);

  const atenciones = body?.atenciones ?? [];
  const registros = body?.registros ?? [];
  if (!Array.isArray(atenciones) || !Array.isArray(registros)) {
    throw new AppError(400, '"atenciones" y "registros" deben ser listas');
  }

  // Precondición: el historial tiene al menos un registro
  const total = await prisma.historialClinico.count({ where: { idanimal } });
  if (total === 0) throw new AppError(404, 'El animal no tiene registros en su historial clínico');

  const cambiosAtenciones = [];
  for (const item of atenciones) {
    const idhistorial = parseId(item?.idhistorial, 'idhistorial');
    const entrada = await prisma.historialClinico.findFirst({ where: { idhistorial, idanimal } });
    if (!entrada) throw new AppError(404, `La entrada ${idhistorial} no existe en el historial del animal`);

    const d = validar(item, esquemaAtencion, { parcial: true });
    if (Object.keys(d).length > 0) cambiosAtenciones.push({ idhistorial, d });
  }

  const cambiosRegistros = [];
  for (const item of registros) {
    const idregistro = parseId(item?.idregistro, 'idregistro');
    const registro = await prisma.registroAtencionMedica.findFirst({
      where: { idregistro, historialclinico: { idanimal } },
      include: incluirDetalle,
    });
    if (!registro) throw new AppError(404, `El registro ${idregistro} no existe en el historial del animal`);

    const cfg = TIPOS[registro.tipo];
    const d = validar(item, { idresponsable: esquemaComun.idresponsable, ...cfg.esquema }, { parcial: true });
    if (Object.keys(d).length === 0) continue;

    cfg.validarFechas({ ...registro[cfg.relacion], ...d }); // valida contra los datos ya guardados
    if (d.idresponsable) await verificarResponsable(d.idresponsable);
    if (cfg.verificarReferencias) await cfg.verificarReferencias(d);

    const detalle = Object.fromEntries(
      cfg.camposRelacion.filter((campo) => d[campo] !== undefined).map((campo) => [campo, d[campo]])
    );
    const data = {};
    if (d.idresponsable) data.idresponsable = d.idresponsable;
    if (d[cfg.campoFecha]) data.fecha = d[cfg.campoFecha];
    if (Object.keys(detalle).length > 0) data[cfg.relacion] = { update: detalle };

    cambiosRegistros.push({ idregistro, data });
  }

  if (cambiosAtenciones.length + cambiosRegistros.length === 0) {
    throw new AppError(400, 'No se enviaron cambios para guardar');
  }

  await prisma.$transaction(async (tx) => {
    for (const { idhistorial, d } of cambiosAtenciones) {
      await tx.historialClinico.update({ where: { idhistorial }, data: d });
    }
    for (const { idregistro, data } of cambiosRegistros) {
      await tx.registroAtencionMedica.update({ where: { idregistro }, data });
    }
  });

  return consultarHistorial(idanimal);
}

module.exports = {
  consultarHistorial,
  registrarAtencion,
  registrarVacunacion: (idanimal, datos) => registrarRegistros(idanimal, 'VACUNA', datos),
  registrarDesparasitacion: (idanimal, datos) => registrarRegistros(idanimal, 'DESPARASITACION', datos),
  registrarEstudio: (idanimal, datos) => registrarRegistros(idanimal, 'ESTUDIO', datos),
  registrarTratamiento: (idanimal, datos) => registrarRegistros(idanimal, 'TRATAMIENTO', datos),
  modificarHistorial,
};
