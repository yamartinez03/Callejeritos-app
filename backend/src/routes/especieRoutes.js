const express = require("express");
const router = express.Router();
const especieController = require("../controllers/especieController");

router.get("/", especieController.listar);

module.exports = router;
