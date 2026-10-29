const { Router } = require('express');
const historialController = require('../controllers/historialClinicoController');

// mergeParams para poder leer :idanimal definido en el app.js
const router = Router({ mergeParams: true });

router.get('/', historialController.consultar); // GH_07 Consultar historial clínico
router.put('/', historialController.modificar); // GH_04 Modificar historial clínico
router.post('/atenciones', historialController.registrarAtencion); // GH_02 Registrar atención veterinaria
router.post('/vacunas', historialController.registrarVacunacion); // GH_05 Registrar vacunación
router.post('/desparasitaciones', historialController.registrarDesparasitacion); // GH_06 Registrar desparasitación
router.post('/estudios', historialController.registrarEstudio); // GH_03 Registrar estudio
router.post('/tratamientos', historialController.registrarTratamiento); // GH_08 Registrar tratamiento

module.exports = router;
