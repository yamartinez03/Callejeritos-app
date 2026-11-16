const express = require("express");
const router = express.Router();
const inventarioController = require("../controllers/inventarioController");
const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middlewares/roleMiddleware");

// Todas las rutas requieren estar logueado
router.use(authMiddleware);

// IMPORTANTE: las rutas fijas van ANTES que las que usan /:id,
// si no, Express interpreta "estadisticas" o "movimientos" como un id.
router.get("/estadisticas", inventarioController.obtenerEstadisticas);
router.post("/movimientos", inventarioController.registrarMovimiento);

// Consulta: admin, núcleo operativo y transitante (solo lectura)
router.get("/", inventarioController.obtenerTodos);
router.get("/:id", inventarioController.obtenerPorId);
router.get("/:id/movimientos", inventarioController.obtenerMovimientos);

// Gestión: admin y núcleo operativo
router.post(
  "/",
  /* roleMiddleware(["administrador", "nucleo_operativo"]), */ inventarioController.crear,
);
router.put(
  "/:id",
  /* roleMiddleware(["administrador", "nucleo_operativo"]), */ inventarioController.actualizar,
);

// Baja: SOLO administrador
router.delete(
  "/:id",
  /* roleMiddleware(["administrador"]), */ inventarioController.eliminar,
);

module.exports = router;
