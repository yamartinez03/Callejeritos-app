const inventarioService = require("../services/inventarioService");
const { HttpError } = inventarioService;

// Valida que el :id de la URL sea un entero positivo (evita que "abc" llegue a Prisma)
const parsearId = (valor) => {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "El id debe ser un número entero positivo");
  }
  return id;
};

class InventarioController {
  // GET /api/inventario?tipo=medicamento|alimento|insumo
  async obtenerTodos(req, res, next) {
    try {
      const insumos = await inventarioService.obtenerTodos({
        tipo: req.query.tipo,
      });
      res.json(insumos);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/inventario/:id
  async obtenerPorId(req, res, next) {
    try {
      const insumo = await inventarioService.obtenerPorId(
        parsearId(req.params.id),
      );
      res.json(insumo);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/inventario
  async crear(req, res, next) {
    try {
      const insumo = await inventarioService.crear(req.body);
      res.status(201).json(insumo);
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/inventario/:id
  async actualizar(req, res, next) {
    try {
      const insumo = await inventarioService.actualizar(
        parsearId(req.params.id),
        req.body,
      );
      res.json(insumo);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/inventario/:id (baja lógica)
  async eliminar(req, res, next) {
    try {
      const resultado = await inventarioService.eliminar(
        parsearId(req.params.id),
      );
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/inventario/movimientos
  async registrarMovimiento(req, res, next) {
    try {
      // El usuario sale del token, no del body.
      // TEMPORAL: mientras el authMiddleware sea el de prueba (no setea req.user),
      // se acepta idpersona del body para poder probar. Borrar el fallback cuando
      // esté la autenticación real.
      const idpersona = req.user?.idpersona ?? req.body.idpersona;
      if (!idpersona) {
        throw new HttpError(401, "No se pudo identificar al usuario");
      }

      const movimiento = await inventarioService.registrarMovimiento({
        idinsumo: req.body.idinsumo,
        tipo: req.body.tipo,
        cantidad: req.body.cantidad,
        motivo: req.body.motivo,
        idpersona,
      });
      res.status(201).json(movimiento);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/inventario/:id/movimientos
  async obtenerMovimientos(req, res, next) {
    try {
      const movimientos = await inventarioService.obtenerMovimientos(
        parsearId(req.params.id),
      );
      res.json(movimientos);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/inventario/estadisticas
  async obtenerEstadisticas(req, res, next) {
    try {
      const estadisticas = await inventarioService.obtenerEstadisticas();
      res.json(estadisticas);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InventarioController();
