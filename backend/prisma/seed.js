/*
 * Seed de datos de prueba para el módulo Animal (y, de paso, el historial clínico).
 *
 * Uso (desde /backend):
 *   pnpm tsx prisma/seed.js            -> carga los datos (si ya hay animales, no hace nada)
 *   pnpm tsx prisma/seed.js --reset    -> borra los datos de animales y los vuelve a cargar
 *
 * ATENCIÓN: --reset borra TODOS los animales y sus registros relacionados
 * (historial clínico, tránsitos, adopciones, gastos, solicitudes). Usar solo en desarrollo.
 *
 * Los catálogos y personas (especies, vacunas, veterinarias, usuarios) se crean solo si
 * no existen, por lo que se puede ejecutar más de una vez sin duplicarlos.
 */
require('dotenv/config');
const prisma = require('../lib/prisma');

// ---------- Helpers ----------

// Fecha (a medianoche UTC) desplazada n días respecto de hoy
function dias(n) {
  const fecha = new Date();
  fecha.setUTCHours(0, 0, 0, 0);
  fecha.setUTCDate(fecha.getUTCDate() + n);
  return fecha;
}

const fecha = (texto) => new Date(texto);

// Devuelve el registro existente o lo crea (para catálogos sin campo único)
async function obtenerOCrear(delegado, where, data) {
  return (await delegado.findFirst({ where })) ?? delegado.create({ data });
}

// Hash de relleno: estos usuarios son solo datos de prueba y no pueden iniciar sesión
const PASSWORD_HASH_SEED = '$seed$sin-login';

// ---------- Limpieza (--reset) ----------

async function limpiarAnimales() {
  // Orden pensado para respetar los onDelete: Restrict del schema
  await prisma.registroAtencionMedica.deleteMany(); // borra en cascada vacuna/desparasitación/estudio/tratamiento
  await prisma.historialClinico.deleteMany();
  await prisma.seguimientoAdopcion.deleteMany();
  await prisma.adopcion.deleteMany();
  await prisma.transito.deleteMany();
  await prisma.gasto.deleteMany();
  await prisma.solicitudAdopcion.deleteMany();
  await prisma.animal.deleteMany(); // las publicaciones quedan con idanimal = null (SetNull)
}

// ---------- Catálogos y personas ----------

async function crearCatalogos() {
  const perro = await obtenerOCrear(prisma.especieAnimal, { nombre: 'Perro' }, { nombre: 'Perro' });
  const gato = await obtenerOCrear(prisma.especieAnimal, { nombre: 'Gato' }, { nombre: 'Gato' });

  const vacunas = {};
  for (const nombre of ['Antirrábica', 'Quíntuple canina', 'Triple felina']) {
    vacunas[nombre] = await obtenerOCrear(prisma.vacuna, { nombre }, { nombre });
  }

  // Veterinarias y profesionales (el "responsable" de cada atención médica)
  const sanRoque = await prisma.responsable.upsert({
    where: { email: 'sanroque@vet-test.com' },
    update: {},
    create: {
      nombre: 'Veterinaria San Roque',
      telefono: '221-555-0101',
      email: 'sanroque@vet-test.com',
      fecha: new Date(),
      tipo: 'VETERINARIA',
      veterinaria: { create: { direccion: 'Calle 7 N° 1234, Villa Elisa' } },
    },
  });
  const patitas = await prisma.responsable.upsert({
    where: { email: 'patitas@vet-test.com' },
    update: {},
    create: {
      nombre: 'Veterinaria Patitas',
      telefono: '221-555-0102',
      email: 'patitas@vet-test.com',
      fecha: new Date(),
      tipo: 'VETERINARIA',
      veterinaria: { create: { direccion: 'Av. 14 N° 567, City Bell' } },
    },
  });
  const draPerez = await prisma.responsable.upsert({
    where: { email: 'perez@vet-test.com' },
    update: {},
    create: {
      nombre: 'Dra. Laura Pérez',
      telefono: '221-555-0103',
      email: 'perez@vet-test.com',
      fecha: new Date(),
      tipo: 'PROFESIONAL',
      profesionalveterinario: { create: { especialidad: 'Clínica de pequeños animales' } },
    },
  });

  // Personas: dos transitantes y un adoptante
  const estadoTransitante = await obtenerOCrear(
    prisma.estadoTransitante,
    { estado: 'Disponible' },
    { estado: 'Disponible' }
  );
  const estadoAdoptante = await obtenerOCrear(
    prisma.estadoAdoptante,
    { estado: 'Activo' },
    { estado: 'Activo' }
  );

  const crearUsuario = (nombrecompleto, email, dni) =>
    prisma.usuario.upsert({
      where: { email },
      update: {},
      create: { nombrecompleto, email, dni, passwordHash: PASSWORD_HASH_SEED, estado: 'ACTIVO' },
    });

  const maria = await crearUsuario('María Gómez', 'maria.gomez@test.com', 30111222);
  const laura = await crearUsuario('Laura Fernández', 'laura.fernandez@test.com', 31222333);
  const juan = await crearUsuario('Juan Rodríguez', 'juan.rodriguez@test.com', 32333444);

  for (const usuario of [maria, laura]) {
    await prisma.transitante.upsert({
      where: { idpersona: usuario.idpersona },
      update: {},
      create: {
        idpersona: usuario.idpersona,
        idestadot: estadoTransitante.idestadot,
        disponibilidad: 'Fines de semana y tardes',
        capacidaddisponible: 2,
        experienciaprevia: 'Tránsitos previos de perros y gatos',
      },
    });
  }
  await prisma.adoptante.upsert({
    where: { idpersona: juan.idpersona },
    update: {},
    create: { idpersona: juan.idpersona, idestadoa: estadoAdoptante.idestadoa },
  });

  return { perro, gato, vacunas, sanRoque, patitas, draPerez, maria, laura, juan };
}

// ---------- Animales ----------

async function crearAnimales(c) {
  const datos = [
    // nombre, especie, sexo, edad (meses), color, peso, castrado, origen, estado, ingreso, lactante
    ['Firulais', c.perro, 'MACHO', 24, 'Marrón', 12.5, true, 'Plaza Belgrano', 'AVISTADO', '2026-10-01', false], // sin relaciones
    ['Luna', c.gato, 'HEMBRA', 6, 'Gris', 3.2, false, 'Calle 7 y 50', 'RESCATADO', '2026-10-05', true],
    ['Rocky', c.perro, 'MACHO', 36, 'Negro', 20.0, true, 'Barrio Norte', 'ADOPTADO', '2026-08-15', false],
    ['Michi', c.gato, 'MACHO', 12, 'Naranja', 4.1, true, 'Estación de tren', 'EN_TRANSITO', '2026-09-10', false],
    ['Canela', c.perro, 'HEMBRA', 18, 'Marrón claro', 14.0, true, 'Ruta 36 km 5', 'EN_ADOPCION', '2026-07-20', false],
    ['Pelusa', c.gato, 'HEMBRA', 10, 'Blanco', 3.8, true, 'Plaza Moreno', 'EN_ADOPCION', '2026-09-25', false], // sin relaciones
    ['Toby', c.perro, 'MACHO', 60, 'Negro y blanco', 18.0, false, 'Villa Elisa centro', 'AVISTADO', '2026-10-20', false], // sin relaciones
    ['Mora', c.perro, 'HEMBRA', 4, 'Tricolor', 5.5, false, 'Barrio Sur', 'RESCATADO', '2026-10-18', false], // sin relaciones
    ['Simón', c.gato, 'MACHO', 30, 'Gris', 5.0, true, 'Hospital zonal', 'FALLECIDO', '2026-06-02', false], // sin relaciones
    ['Nina', c.gato, 'HEMBRA', 3, 'Negro', 2.1, false, 'Calle 12 y 64', 'EN_TRANSITO', '2026-10-12', true],
  ];

  const animales = {};
  for (const [nombre, especie, sexo, edad, color, peso, castrado, origen, estado, ingreso, lactante] of datos) {
    animales[nombre] = await prisma.animal.create({
      data: {
        idespecie: especie.idespecie,
        nombre,
        sexo,
        edadestimada: edad,
        colorpelaje: color,
        peso,
        castrado,
        lugarorigen: origen,
        estado,
        fechaingreso: fecha(ingreso),
        lactante,
      },
    });
  }
  return animales;
}

// ---------- Tránsitos, adopciones e historial clínico ----------

async function crearRelaciones(c, a) {
  // Tránsitos
  await prisma.transito.create({
    data: { idanimal: a.Michi.idanimal, idtransitante: c.maria.idpersona, fechainicio: fecha('2026-09-12'), estado: 'ACTIVO' },
  });
  await prisma.transito.create({
    data: { idanimal: a.Nina.idanimal, idtransitante: c.laura.idpersona, fechainicio: fecha('2026-10-13'), estado: 'ACTIVO' },
  });
  await prisma.transito.create({
    data: {
      idanimal: a.Canela.idanimal,
      idtransitante: c.laura.idpersona,
      fechainicio: fecha('2026-07-22'),
      fechafin: fecha('2026-09-30'),
      estado: 'FINALIZADO',
    },
  });

  // Adopción
  await prisma.adopcion.create({
    data: {
      idanimal: a.Rocky.idanimal,
      idadoptante: c.juan.idpersona,
      fechaentrega: fecha('2026-10-10'),
      observaciones: 'Entrega sin inconvenientes. Se adaptó rápido al hogar.',
    },
  });

  // Historial clínico: cada entrada con su registro de atención médica
  const entrada = (idanimal, fechaEntrada, descripcion, registro) =>
    prisma.historialClinico.create({
      data: {
        idanimal,
        fecha: fechaEntrada,
        descripcion,
        ...(registro && { registroatencionmedica: { create: registro } }),
      },
    });

  const vacuna = (responsable, nombreVacuna, aplicacion, vencimiento) => ({
    idresponsable: responsable.idresponsable,
    tipo: 'VACUNA',
    fecha: aplicacion,
    registrovacuna: {
      create: { idvacuna: c.vacunas[nombreVacuna].idvacuna, fechaaplicacion: aplicacion, fechavencimiento: vencimiento },
    },
  });

  // Canela: vacuna próxima a vencer, desparasitación vigente y estudio
  await entrada(a.Canela.idanimal, dias(-335), 'Vacunación: Antirrábica', vacuna(c.sanRoque, 'Antirrábica', dias(-335), dias(30)));
  await entrada(a.Canela.idanimal, dias(-20), 'Desparasitación: Drontal', {
    idresponsable: c.draPerez.idresponsable,
    tipo: 'DESPARASITACION',
    fecha: dias(-20),
    registrodesparasitacion: {
      create: { producto: 'Drontal', dosis: '1 comprimido cada 10 kg', fechaaplicacion: dias(-20), proximaaplicacion: dias(70) },
    },
  });
  await entrada(a.Canela.idanimal, dias(-60), 'Estudio: Hemograma', {
    idresponsable: c.sanRoque.idresponsable,
    tipo: 'ESTUDIO',
    fecha: dias(-60),
    registroestudio: {
      create: { tipo: 'Hemograma', fecha: dias(-60), resultado: 'Valores dentro de los parámetros normales', archivo: 'uploads/hemograma-canela.pdf' },
    },
  });

  // Rocky: vacuna y tratamiento
  await entrada(a.Rocky.idanimal, dias(-90), 'Vacunación: Quíntuple canina', vacuna(c.patitas, 'Quíntuple canina', dias(-90), dias(275)));
  await entrada(a.Rocky.idanimal, dias(-75), 'Tratamiento: Antibiótico por infección en oído', {
    idresponsable: c.patitas.idresponsable,
    tipo: 'TRATAMIENTO',
    fecha: dias(-75),
    registrotratamiento: {
      create: {
        descripcion: 'Antibiótico por infección en oído',
        fechainicio: dias(-75),
        fechafin: dias(-65),
        medicacion: 'Amoxicilina 500 mg cada 12 hs',
        archivo: 'uploads/receta-rocky.jpg',
      },
    },
  });

  // Michi: vacuna triple felina y una atención sin registro específico
  await entrada(a.Michi.idanimal, dias(-45), 'Vacunación: Triple felina', vacuna(c.draPerez, 'Triple felina', dias(-45), dias(320)));
  await entrada(a.Michi.idanimal, dias(-10), 'Control general: buen estado, se indica alimento balanceado', null);

  // Luna: solo una atención general
  await entrada(a.Luna.idanimal, dias(-20), 'Control de lactancia y peso, sin hallazgos', null);
}

// ---------- Main ----------

async function main() {
  const reset = process.argv.includes('--reset');
  const existentes = await prisma.animal.count();

  if (existentes > 0 && !reset) {
    console.log(`Ya hay ${existentes} animales cargados. No se hizo nada.`);
    console.log('Usá "node prisma/seed.js --reset" para borrarlos y volver a cargar los datos de prueba.');
    return;
  }

  if (reset) {
    console.log('Borrando animales y registros relacionados...');
    await limpiarAnimales();
  }

  console.log('Cargando catálogos y personas...');
  const catalogos = await crearCatalogos();

  console.log('Cargando animales...');
  const animales = await crearAnimales(catalogos);

  console.log('Cargando tránsitos, adopciones e historial clínico...');
  await crearRelaciones(catalogos, animales);

  console.log(`Listo: ${Object.keys(animales).length} animales de prueba cargados.`);
  console.log('Sin registros relacionados (se pueden dar de baja): Firulais, Pelusa, Toby, Mora, Simón.');
  console.log('Con registros relacionados (la baja devuelve 409): Luna, Rocky, Michi, Canela, Nina.');
}

main()
  .catch((error) => {
    console.error('Error al ejecutar el seed:', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
