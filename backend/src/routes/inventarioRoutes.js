const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener estadísticas de inventario
router.get('/estadisticas', inventarioController.obtenerEstadisticas);

// Obtener todos los insumos
router.get('/', inventarioController.obtenerTodos);

// Obtener insumo por ID
router.get('/:id', inventarioController.obtenerPorId);

// Crear nuevo insumo
router.post('/', inventarioController.crear);

// Actualizar insumo
router.put('/:id', inventarioController.actualizar);

// Eliminar insumo
router.delete('/:id', inventarioController.eliminar);

// Registrar movimiento de inventario
router.post('/movimientos', inventarioController.registrarMovimiento);

// Obtener movimientos de un insumo
router.get('/:id/movimientos', inventarioController.obtenerMovimientos);

module.exports = router;
