const express = require('express');
// acá van middlewares globales como cors (averiguar)

const app = express();
app.use(express.json());

module.exports = app;
