require('dotenv/config');
const express = require('express');
const cors = require('cors');

const AppError = require('./lib/AppError');
const animalRoutes = require('./routes/animalRoutes');
const historialClinicoRoutes = require('./routes/historialClinicoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Módulo historial clínico (cuelga de un animal)
app.use('/api/animales/:idanimal/historial-clinico', historialClinicoRoutes);
// Módulo animal
app.use('/api/animales', animalRoutes);

// Ruta inexistente
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo centralizado de errores (CC10): mensaje amigable, el detalle va al log
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message, ...err.extra });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
  }
  if (err.code === 'P2003') {
    return res.status(409).json({ error: 'La operación viola una relación con otros registros' });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'El registro solicitado no existe' });
  }

  console.error(err);
  res.status(500).json({ error: 'Ocurrió un error inesperado. Intentá nuevamente más tarde.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app;
