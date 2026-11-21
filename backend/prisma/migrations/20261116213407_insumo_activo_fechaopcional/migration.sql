-- AlterTable
ALTER TABLE "alimento" ALTER COLUMN "marca" DROP NOT NULL;

-- AlterTable
ALTER TABLE "insumo" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "descripcion" DROP NOT NULL,
ALTER COLUMN "fechavencimiento" DROP NOT NULL;

-- AlterTable
ALTER TABLE "medicamento" ALTER COLUMN "numerolote" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "insumo_activo_idx" ON "insumo"("activo");
