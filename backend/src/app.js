const express = require("express");
const cors = require("cors");

// Rutas
const animalRoutes = require("./routes/animalRoutes");
const inventarioRoutes = require("./routes/inventarioRoutes");
const especieRoutes = require("./routes/especieRoutes");
// const publicacionRoutes = require("./routes/publicacionRoutes");

const app = express();

// Middlewares globales
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// API router para definir /api como la ruta base
const apiRouter = express.Router();

apiRouter.get("/health", (req, res) => res.json({ ok: true }));

apiRouter.use("/animal", animalRoutes);
apiRouter.use("/inventario", inventarioRoutes);
apiRouter.use("/especies", especieRoutes);
// apiRouter.use("/publicaciones", publicacionRoutes);

app.use("/api", apiRouter);

// Manejo de errores (siempre al final, después de las rutas)
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Error interno del servidor" });
});

module.exports = app;
