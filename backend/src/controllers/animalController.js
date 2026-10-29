const animalService = require('../services/animalService');
const catchAsync = require('../lib/catchAsync');
const { parseId } = require('../lib/validar');

// POST /api/animales
const crear = catchAsync(async (req, res) => {
  const animal = await animalService.crearAnimal(req.body);
  res.status(201).json({ mensaje: 'Animal registrado correctamente', data: animal });
});

// GET /api/animales?especie=&sexo=&edad=&color=&estado=&veterinaria=&transitanteAdoptante=&lugarRescate=
const buscar = catchAsync(async (req, res) => {
  const animales = await animalService.buscarAnimales(req.query);
  const respuesta = { total: animales.length, data: animales };
  if (animales.length === 0) {
    respuesta.mensaje = 'No se encontraron animales que coincidan con la búsqueda';
  }
  res.json(respuesta);
});

// GET /api/animales/:id
const consultar = catchAsync(async (req, res) => {
  const animal = await animalService.obtenerAnimal(parseId(req.params.id));
  res.json({ data: animal });
});

// PUT /api/animales/:id
const modificar = catchAsync(async (req, res) => {
  const animal = await animalService.modificarAnimal(parseId(req.params.id), req.body);
  res.json({ mensaje: 'Animal modificado correctamente', data: animal });
});

// PATCH /api/animales/:id/estado
const cambiarEstado = catchAsync(async (req, res) => {
  const animal = await animalService.cambiarEstado(parseId(req.params.id), req.body);
  res.json({ mensaje: 'Estado actualizado correctamente', data: animal });
});

// DELETE /api/animales/:id
const eliminar = catchAsync(async (req, res) => {
  await animalService.eliminarAnimal(parseId(req.params.id));
  res.json({ mensaje: 'Animal eliminado correctamente' });
});

module.exports = { crear, buscar, consultar, modificar, cambiarEstado, eliminar };
