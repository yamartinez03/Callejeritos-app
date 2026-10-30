const { Router } = require('express');
const especieController = require('../controllers/especieController');

const router = Router();

router.post('/', especieController.crear); // Alta de especie
router.get('/', especieController.listar); // Consultar especies
router.get('/:id', especieController.consultar); // Consultar una especie
router.put('/:id', especieController.modificar); // Modificar especie
router.delete('/:id', especieController.eliminar); // Eliminar especie

module.exports = router;
