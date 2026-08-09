const express = require('express');
// acá van middlewares globales como cors (averiguar)

// Rutas
const animalRoutes = require("./routes/animalRoutes");

const app = express();
app.use(express.json());

// API router para definir /api como la ruta base
const apiRouter = express.Router();

apiRouter.use("/animal", animalRoutes);

app.use("/api", apiRouter);

module.exports = app;
