const especieService = require("../services/especieService");

const listar = async (req, res) => {
  try {
    const especies = await especieService.listar();
    res.json(especies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listar,
};
