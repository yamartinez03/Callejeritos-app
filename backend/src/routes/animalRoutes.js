const { Router } = require('express');
const animalController = require('../controllers/animalController');

const router = Router();

router.post('/', animalController.crear); // Alta animal
router.get('/', animalController.buscar); // Buscar animal
router.get('/:id', animalController.consultar); // Consultar animal
router.put('/:id', animalController.modificar); // Modificar animal
router.patch('/:id/estado', animalController.cambiarEstado); // Cambio de estado
router.delete('/:id', animalController.eliminar); // Baja animal

module.exports = router;
