/*
  Warnings:

  - You are about to drop the column `idhogar` on the `solicitudadopcion` table. All the data in the column will be lost.
  - You are about to drop the column `rutaformulario` on the `solicitudadopcion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "solicitudadopcion" DROP COLUMN "idhogar",
DROP COLUMN "rutaformulario";

-- CreateTable
CREATE TABLE "configuracionformulario" (
    "idconfig" SERIAL NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "rutaformulario" VARCHAR(255) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configuracionformulario_pkey" PRIMARY KEY ("idconfig")
);

-- CreateIndex
CREATE UNIQUE INDEX "configuracionformulario_tipo_key" ON "configuracionformulario"("tipo");
