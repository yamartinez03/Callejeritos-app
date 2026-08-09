const prisma = require("../../lib/prisma.js");

async function crearAnimal(datos) {
    console.log(Object.keys(prisma));
    return await prisma.animal.create({ data: datos });
}

module.exports = { crearAnimal };
