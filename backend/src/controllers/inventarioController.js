const inventarioService = require('../services/inventarioService');

class InventarioController {
  // Obtener todos los insumos
  async obtenerTodos(req, res) {
    try {
      const insumos = await inventarioService.obtenerTodos();
      res.json(insumos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener insumo por ID
  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const insumo = await inventarioService.obtenerPorId(id);
      res.json(insumo);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Crear nuevo insumo
  async crear(req, res) {
    try {
      const insumo = await inventarioService.crear(req.body);
      res.status(201).json(insumo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar insumo
  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const insumo = await inventarioService.actualizar(id, req.body);
      res.json(insumo);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Eliminar insumo
  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const resultado = await inventarioService.eliminar(id);
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Registrar movimiento de inventario
  async registrarMovimiento(req, res) {
    try {
      const movimiento = await inventarioService.registrarMovimiento(req.body);
      res.status(201).json(movimiento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener movimientos de un insumo
  async obtenerMovimientos(req, res) {
    try {
      const { id } = req.params;
      const movimientos = await inventarioService.obtenerMovimientos(id);
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener estadísticas de inventario
  async obtenerEstadisticas(req, res) {
    try {
      const estadisticas = await inventarioService.obtenerEstadisticas();
      res.json(estadisticas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new InventarioController();
