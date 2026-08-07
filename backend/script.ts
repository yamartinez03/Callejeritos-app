import { prisma } from "./lib/prisma";

async function main() {
  // Ejemplo: traer todas las filas de la tabla animal
  const allUsers = await prisma.animal.findMany();
  console.log("Animales:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
