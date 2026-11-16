require("dotenv").config();

const app = require("./src/app");
const prisma = require("./lib/prisma");

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await prisma.$connect();
    console.log("Base de datos conectada");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    process.exit(1);
  }
}

iniciar();
