-- AlterTable
ALTER TABLE "foto" ADD COLUMN     "idanimal" INTEGER,
ALTER COLUMN "idpub" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "foto" ADD CONSTRAINT "foto_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE CASCADE ON UPDATE CASCADE;
