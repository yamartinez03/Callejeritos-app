const prisma = require('../../lib/prisma');
const AppError = require('../lib/AppError');
const { validar } = require('../lib/validar');

// Valores de los enums del schema.prisma
const SEXOS = ['MACHO', 'HEMBRA'];
const ESTADOS = ['AVISTADO', 'EN_TRANSITO', 'EN_ADOPCION', 'ADOPTADO', 'RESCATADO', 'FALLECIDO'];

// Esquema de alta de un animal. "estado" y "lactante" son opcionales:
// el animal queda AVISTADO y no lactante por defecto.
const esquemaAnimal = {
  idespecie: { tipo: 'id' },
  nombre: { tipo: 'string', max: 100 },
  sexo: { tipo: 'enum', valores: SEXOS },
  edadestimada: { tipo: 'int', min: 0 },
  colorpelaje: { tipo: 'string', max: 50 },
  peso: { tipo: 'float' },
  castrado: { tipo: 'bool' },
  lugarorigen: { tipo: 'string', max: 150 },
  fechaingreso: { tipo: 'fecha' },
  estado: { tipo: 'enum', valores: ESTADOS, opcional: true },
  lactante: { tipo: 'bool', opcional: true },
};

// En la modificación el estado no se toca: tiene su propio endpoint
const { estado: _estado, ...esquemaModificacion } = esquemaAnimal;

// Filtros de búsqueda. Todos opcionales.
const esquemaFiltros = {
  especie: { tipo: 'id', opcional: true },
  sexo: { tipo: 'enum', valores: SEXOS, opcional: true },
  edad: { tipo: 'int', min: 0, opcional: true },
  color: { tipo: 'string', max: 50, opcional: true },
  estado: { tipo: 'enum', valores: ESTADOS, opcional: true },
  veterinaria: { tipo: 'id', opcional: true },
  transitanteAdoptante: { tipo: 'string', max: 150, opcional: true },
  lugarRescate: { tipo: 'string', max: 150, opcional: true },
};

const incluirEspecie = { especieanimal: true };

async function verificarEspecie(idespecie) {
  const especie = await prisma.especieAnimal.findUnique({ where: { idespecie } });
  if (!especie) {
    throw new AppError(400, 'Datos incompletos o no válidos', {
      campos: { idespecie: 'La especie indicada no existe' },
    });
  }
}

async function obtenerAnimalOFallar(idanimal) {
  const animal = await prisma.animal.findUnique({
    where: { idanimal },
    include: incluirEspecie,
  });
  if (!animal) throw new AppError(404, 'El animal no existe');
  return animal;
}

// Alta animal
async function crearAnimal(datos) {
  const d = validar(datos, esquemaAnimal);
  await verificarEspecie(d.idespecie);

  return prisma.animal.create({
    data: { ...d, estado: d.estado ?? 'AVISTADO', lactante: d.lactante ?? false },
    include: incluirEspecie,
  });
}

// Buscar animal: cero, uno o más filtros combinados
async function buscarAnimales(query) {
  // Los query params llegan como texto: convierto los numéricos antes de validar
  const crudo = { ...query };
  for (const campo of ['especie', 'edad', 'veterinaria']) {
    if (/^\d+$/.test(crudo[campo])) crudo[campo] = Number(crudo[campo]);
  }
  const f = validar(crudo, esquemaFiltros);

  const where = {};
  if (f.especie) where.idespecie = f.especie;
  if (f.sexo) where.sexo = f.sexo;
  if (f.edad !== undefined) where.edadestimada = f.edad;
  if (f.color) where.colorpelaje = { contains: f.color, mode: 'insensitive' };
  if (f.estado) where.estado = f.estado;
  if (f.lugarRescate) where.lugarorigen = { contains: f.lugarRescate, mode: 'insensitive' };

  // Veterinaria: animales con al menos una atención registrada por esa veterinaria
  if (f.veterinaria) {
    where.historialclinico = {
      some: { registroatencionmedica: { some: { idresponsable: f.veterinaria } } },
    };
  }

  // Transitante/adoptante: por nombre completo del usuario
  if (f.transitanteAdoptante) {
    const nombre = { contains: f.transitanteAdoptante, mode: 'insensitive' };
    where.OR = [
      { transito: { some: { transitante: { usuario: { nombrecompleto: nombre } } } } },
      { adopcion: { some: { adoptante: { usuario: { nombrecompleto: nombre } } } } },
    ];
  }

  const animales = await prisma.animal.findMany({
    where,
    include: incluirEspecie,
    orderBy: { idanimal: 'desc' },
  });

  return animales;
}

// Consultar animal
async function obtenerAnimal(idanimal) {
  return obtenerAnimalOFallar(idanimal);
}

// Modificar animal
async function modificarAnimal(idanimal, datos) {
  await obtenerAnimalOFallar(idanimal);

  const d = validar(datos, esquemaModificacion, { parcial: true });
  if (Object.keys(d).length === 0) {
    throw new AppError(400, 'No se enviaron datos para modificar');
  }
  if (d.idespecie) await verificarEspecie(d.idespecie);

  return prisma.animal.update({
    where: { idanimal },
    data: d,
    include: incluirEspecie,
  });
}

// Cambio de estado del ciclo de vida
async function cambiarEstado(idanimal, datos) {
  await obtenerAnimalOFallar(idanimal);
  const { estado } = validar(datos, { estado: { tipo: 'enum', valores: ESTADOS } });

  return prisma.animal.update({
    where: { idanimal },
    data: { estado },
    include: incluirEspecie,
  });
}

// Baja animal (respeta la integridad referencial)
async function eliminarAnimal(idanimal) {
  const animal = await prisma.animal.findUnique({
    where: { idanimal },
    include: {
      _count: {
        select: {
          transito: true,
          adopcion: true,
          solicitudadopcion: true,
          gasto: true,
          historialclinico: true,
        },
      },
    },
  });
  if (!animal) throw new AppError(404, 'El animal no existe');

  const c = animal._count;
  const relacionados = {
    transitos: c.transito,
    adopciones: c.adopcion,
    solicitudesAdopcion: c.solicitudadopcion,
    gastos: c.gasto,
    historialClinico: c.historialclinico,
  };
  const conRegistros = Object.fromEntries(Object.entries(relacionados).filter(([, n]) => n > 0));

  if (Object.keys(conRegistros).length > 0) {
    throw new AppError(409, 'No se puede eliminar el animal porque tiene registros relacionados', {
      relacionados: conRegistros,
    });
  }

  await prisma.animal.delete({ where: { idanimal } });
}

module.exports = {
  crearAnimal,
  buscarAnimales,
  obtenerAnimal,
  modificarAnimal,
  cambiarEstado,
  eliminarAnimal,
};
