-- AlterTable
ALTER TABLE "gasto" ADD COLUMN     "aceptado" BOOLEAN;

-- CreateIndex
CREATE INDEX "gasto_aceptado_idx" ON "gasto"("aceptado");
