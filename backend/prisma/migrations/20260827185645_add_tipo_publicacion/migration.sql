/*
  Warnings:

  - Added the required column `tipoPublicacion` to the `publicacion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoPublicacion" AS ENUM ('PERDIDO', 'ENCONTRADO', 'AVISTAMIENTO');

-- AlterTable
ALTER TABLE "publicacion" ADD COLUMN     "tipoPublicacion" "TipoPublicacion" NOT NULL;
