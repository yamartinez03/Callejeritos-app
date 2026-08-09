const animalService = require("../services/animalService");

async function crear(req, res) {
    try {
        const animal = await animalService.crearAnimal(req.body);
        res.status(201).json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { crear };
