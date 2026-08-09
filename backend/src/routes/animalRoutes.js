const express = require("express");
const router = express.Router();

// Controlador
const animalController = require("../controllers/animalController");

// Métodos HTTP
router.post("/", animalController.crear);

module.exports = router;
