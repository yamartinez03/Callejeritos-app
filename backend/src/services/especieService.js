const prisma = require('../../lib/prisma');
const AppError = require('../lib/AppError');
const { validar } = require('../lib/validar');

const esquemaEspecie = {
  nombre: { tipo: 'string', max: 100 },
};

// Se cuentan animales y alimentos porque ambos referencian la especie con onDelete: Restrict
const incluirCantidades = { _count: { select: { animal: true, alimento: true } } };

// Devuelve la especie con la cantidad de animales (el front la usa para saber si se puede eliminar)
function formatear({ _count, ...especie }) {
  return { ...especie, cantidadAnimales: _count.animal };
}

async function obtenerEspecieOFallar(idespecie) {
  const especie = await prisma.especieAnimal.findUnique({
    where: { idespecie },
    include: incluirCantidades,
  });
  if (!especie) throw new AppError(404, 'La especie no existe');
  return especie;
}

// No puede haber dos especies con el mismo nombre (sin distinguir mayúsculas)
async function verificarNombreLibre(nombre, idActual) {
  const repetida = await prisma.especieAnimal.findFirst({
    where: {
      nombre: { equals: nombre, mode: 'insensitive' },
      ...(idActual && { NOT: { idespecie: idActual } }),
    },
  });
  if (repetida) {
    throw new AppError(409, 'Ya existe una especie con ese nombre', {
      campos: { nombre: 'Ya existe una especie con ese nombre' },
    });
  }
}

// Alta de especie
async function crearEspecie(datos) {
  const { nombre } = validar(datos, esquemaEspecie);
  await verificarNombreLibre(nombre);

  const especie = await prisma.especieAnimal.create({
    data: { nombre },
    include: incluirCantidades,
  });
  return formatear(especie);
}

// Consultar especies (ordenadas alfabéticamente)
async function listarEspecies() {
  const especies = await prisma.especieAnimal.findMany({
    orderBy: { nombre: 'asc' },
    include: incluirCantidades,
  });
  return especies.map(formatear);
}

// Consultar una especie
async function obtenerEspecie(idespecie) {
  return formatear(await obtenerEspecieOFallar(idespecie));
}

// Modificar especie
async function modificarEspecie(idespecie, datos) {
  await obtenerEspecieOFallar(idespecie);
  const { nombre } = validar(datos, esquemaEspecie);
  await verificarNombreLibre(nombre, idespecie);

  const especie = await prisma.especieAnimal.update({
    where: { idespecie },
    data: { nombre },
    include: incluirCantidades,
  });
  return formatear(especie);
}

// Eliminar especie: no se puede si hay animales o alimentos que la usan (integridad referencial)
async function eliminarEspecie(idespecie) {
  const especie = await obtenerEspecieOFallar(idespecie);

  const relacionados = {};
  if (especie._count.animal > 0) relacionados.animales = especie._count.animal;
  if (especie._count.alimento > 0) relacionados.alimentos = especie._count.alimento;

  if (Object.keys(relacionados).length > 0) {
    throw new AppError(409, 'No se puede eliminar la especie porque está en uso', { relacionados });
  }

  await prisma.especieAnimal.delete({ where: { idespecie } });
}

module.exports = {
  crearEspecie,
  listarEspecies,
  obtenerEspecie,
  modificarEspecie,
  eliminarEspecie,
};
