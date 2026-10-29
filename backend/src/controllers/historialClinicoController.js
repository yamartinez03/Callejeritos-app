const historialService = require('../services/historialClinicoService');
const catchAsync = require('../lib/catchAsync');
const { parseId } = require('../lib/validar');

const idAnimal = (req) => parseId(req.params.idanimal, 'idanimal');

// Si el body es un array (varios formularios), devuelve la lista; si no, el único registro creado
const respuestaCreacion = (req, creados) => (Array.isArray(req.body) ? creados : creados[0]);

// GET /api/animales/:idanimal/historial-clinico
const consultar = catchAsync(async (req, res) => {
  const historial = await historialService.consultarHistorial(idAnimal(req));
  const respuesta = { total: historial.length, data: historial };
  if (historial.length === 0) {
    respuesta.mensaje = 'El animal todavía no tiene registros en su historial clínico';
  }
  res.json(respuesta);
});

// POST /api/animales/:idanimal/historial-clinico/atenciones
const registrarAtencion = catchAsync(async (req, res) => {
  const atencion = await historialService.registrarAtencion(idAnimal(req), req.body);
  res.status(201).json({ mensaje: 'Atención veterinaria registrada correctamente', data: atencion });
});

// POST /api/animales/:idanimal/historial-clinico/vacunas
const registrarVacunacion = catchAsync(async (req, res) => {
  const creados = await historialService.registrarVacunacion(idAnimal(req), req.body);
  res.status(201).json({ mensaje: 'Vacunación registrada correctamente', data: respuestaCreacion(req, creados) });
});

// POST /api/animales/:idanimal/historial-clinico/desparasitaciones
const registrarDesparasitacion = catchAsync(async (req, res) => {
  const creados = await historialService.registrarDesparasitacion(idAnimal(req), req.body);
  res.status(201).json({ mensaje: 'Desparasitación registrada correctamente', data: respuestaCreacion(req, creados) });
});

// POST /api/animales/:idanimal/historial-clinico/estudios
const registrarEstudio = catchAsync(async (req, res) => {
  const creados = await historialService.registrarEstudio(idAnimal(req), req.body);
  res.status(201).json({ mensaje: 'Estudio registrado correctamente', data: respuestaCreacion(req, creados) });
});

// POST /api/animales/:idanimal/historial-clinico/tratamientos
const registrarTratamiento = catchAsync(async (req, res) => {
  const creados = await historialService.registrarTratamiento(idAnimal(req), req.body);
  res.status(201).json({ mensaje: 'Tratamiento registrado correctamente', data: respuestaCreacion(req, creados) });
});

// PUT /api/animales/:idanimal/historial-clinico
const modificar = catchAsync(async (req, res) => {
  const historial = await historialService.modificarHistorial(idAnimal(req), req.body);
  res.json({ mensaje: 'Historial clínico modificado correctamente', total: historial.length, data: historial });
});

module.exports = {
  consultar,
  registrarAtencion,
  registrarVacunacion,
  registrarDesparasitacion,
  registrarEstudio,
  registrarTratamiento,
  modificar,
};
