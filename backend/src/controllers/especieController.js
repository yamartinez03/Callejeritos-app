const especieService = require('../services/especieService');
const catchAsync = require('../lib/catchAsync');
const { parseId } = require('../lib/validar');

// POST /api/especies
const crear = catchAsync(async (req, res) => {
  const especie = await especieService.crearEspecie(req.body);
  res.status(201).json({ mensaje: 'Especie registrada correctamente', data: especie });
});

// GET /api/especies
const listar = catchAsync(async (req, res) => {
  const especies = await especieService.listarEspecies();
  res.json({ total: especies.length, data: especies });
});

// GET /api/especies/:id
const consultar = catchAsync(async (req, res) => {
  const especie = await especieService.obtenerEspecie(parseId(req.params.id));
  res.json({ data: especie });
});

// PUT /api/especies/:id
const modificar = catchAsync(async (req, res) => {
  const especie = await especieService.modificarEspecie(parseId(req.params.id), req.body);
  res.json({ mensaje: 'Especie modificada correctamente', data: especie });
});

// DELETE /api/especies/:id
const eliminar = catchAsync(async (req, res) => {
  await especieService.eliminarEspecie(parseId(req.params.id));
  res.json({ mensaje: 'Especie eliminada correctamente' });
});

module.exports = { crear, listar, consultar, modificar, eliminar };
