const prisma = require("../../lib/prisma");

const listar = async () => {
  try {
    const especies = await prisma.especieAnimal.findMany({
      select: {
        idespecie: true,
        nombre: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });
    return especies;
  } catch (error) {
    throw new Error("Error al obtener especies: " + error.message);
  }
};

module.exports = {
  listar,
};
