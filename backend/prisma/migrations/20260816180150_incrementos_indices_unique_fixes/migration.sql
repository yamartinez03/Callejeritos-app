/*
  Warnings:

  - You are about to alter the column `monto` on the `donacion` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `monto` on the `gasto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - The `estado` column on the `postulaciontransito` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `aprobado` on the `publicacion` table. All the data in the column will be lost.
  - You are about to drop the column `contacto` on the `publicacion` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `publicacion` table. All the data in the column will be lost.
  - The `estado` column on the `solicitudadopcion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `estado` column on the `transito` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contraseña` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `idusuario` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombreusuario` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `persona` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `socio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idrecurso,idaccion]` on the table `permiso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idpersona,idrol]` on the table `personarol` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `publicacion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `responsable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idrol,idpermiso]` on the table `rolpermiso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dni]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idveterinaria,idservicio]` on the table `veterinariaservicio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `accion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `adopcion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `adoptante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `alimento` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipoalimento` on the `alimento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `animal` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sexo` on the `animal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `estado` on the `animal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `archivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `direccionpersona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `donacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `especieanimal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `estadoadoptante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `estadotransitante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `gasto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `historialclinico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `hogar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `insumo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `localidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `medicamento` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `viaadministracion` on the `medicamento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `movimientoinventario` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `movimientoinventario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `permiso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `personarol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `postulaciontransito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `profesionalveterinario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `publicacion` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `publicacion` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `recurso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `registroatencionmedica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `registroatencionmedica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `registrodesparasitacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `registroestudio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `registrotratamiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `registrovacuna` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `responsable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `responsable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `rolpermiso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `seguimientoadopcion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `servicioofrecido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `solicitudadopcion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tipogasto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `transitante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `transito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombrecompleto` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `vacuna` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `veterinaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `veterinariaservicio` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SexoAnimal" AS ENUM ('MACHO', 'HEMBRA');

-- CreateEnum
CREATE TYPE "EstadoAnimal" AS ENUM ('AVISTADO', 'EN_TRANSITO', 'EN_ADOPCION', 'ADOPTADO', 'RESCATADO', 'FALLECIDO');

-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'INACTIVO', 'BAJA');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('PENDIENTE', 'APROBADA', 'RECHAZADA');

-- CreateEnum
CREATE TYPE "EstadoTransito" AS ENUM ('ACTIVO', 'FINALIZADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoMovimientoInventario" AS ENUM ('ENTRADA', 'SALIDA');

-- CreateEnum
CREATE TYPE "TipoAlimento" AS ENUM ('SECO', 'HUMEDO', 'FRESCO');

-- CreateEnum
CREATE TYPE "TipoAtencionMedica" AS ENUM ('VACUNA', 'DESPARASITACION', 'ESTUDIO', 'TRATAMIENTO');

-- CreateEnum
CREATE TYPE "TipoResponsable" AS ENUM ('VETERINARIA', 'PROFESIONAL');

-- CreateEnum
CREATE TYPE "ViaAdminMedicamento" AS ENUM ('ORAL', 'INTRAVENOSA', 'CUTANEA', 'SUBCUTANEA');

-- DropForeignKey
ALTER TABLE "adopcion" DROP CONSTRAINT "adopcion_idadoptante_fkey";

-- DropForeignKey
ALTER TABLE "adopcion" DROP CONSTRAINT "adopcion_idanimal_fkey";

-- DropForeignKey
ALTER TABLE "adoptante" DROP CONSTRAINT "adoptante_idestadoa_fkey";

-- DropForeignKey
ALTER TABLE "adoptante" DROP CONSTRAINT "adoptante_idpersona_fkey";

-- DropForeignKey
ALTER TABLE "alimento" DROP CONSTRAINT "alimento_idespecie_fkey";

-- DropForeignKey
ALTER TABLE "alimento" DROP CONSTRAINT "alimento_idinsumo_fkey";

-- DropForeignKey
ALTER TABLE "animal" DROP CONSTRAINT "animal_idespecie_fkey";

-- DropForeignKey
ALTER TABLE "archivo" DROP CONSTRAINT "archivo_idseguimiento_fkey";

-- DropForeignKey
ALTER TABLE "direccionpersona" DROP CONSTRAINT "direccionpersona_idlocalidad_fkey";

-- DropForeignKey
ALTER TABLE "direccionpersona" DROP CONSTRAINT "direccionpersona_idpersona_fkey";

-- DropForeignKey
ALTER TABLE "donacion" DROP CONSTRAINT "donacion_idpersona_fkey";

-- DropForeignKey
ALTER TABLE "gasto" DROP CONSTRAINT "gasto_idanimal_fkey";

-- DropForeignKey
ALTER TABLE "gasto" DROP CONSTRAINT "gasto_idtipogasto_fkey";

-- DropForeignKey
ALTER TABLE "historialclinico" DROP CONSTRAINT "historialclinico_idanimal_fkey";

-- DropForeignKey
ALTER TABLE "medicamento" DROP CONSTRAINT "medicamento_idinsumo_fkey";

-- DropForeignKey
ALTER TABLE "movimientoinventario" DROP CONSTRAINT "movimientoinventario_idinsumo_fkey";

-- DropForeignKey
ALTER TABLE "movimientoinventario" DROP CONSTRAINT "movimientoinventario_idpersona_fkey";

-- DropForeignKey
ALTER TABLE "permiso" DROP CONSTRAINT "permiso_idaccion_fkey";

-- DropForeignKey
ALTER TABLE "permiso" DROP CONSTRAINT "permiso_idrecurso_fkey";

-- DropForeignKey
ALTER TABLE "personarol" DROP CONSTRAINT "personarol_idpersona_fkey";

-- DropForeignKey
ALTER TABLE "personarol" DROP CONSTRAINT "personarol_idrol_fkey";

-- DropForeignKey
ALTER TABLE "postulaciontransito" DROP CONSTRAINT "postulaciontransito_idhogar_fkey";

-- DropForeignKey
ALTER TABLE "postulaciontransito" DROP CONSTRAINT "postulaciontransito_idpersonaaprobo_fkey";

-- DropForeignKey
ALTER TABLE "postulaciontransito" DROP CONSTRAINT "postulaciontransito_idpostulante_fkey";

-- DropForeignKey
ALTER TABLE "profesionalveterinario" DROP CONSTRAINT "profesionalveterinario_idresponsable_fkey";

-- DropForeignKey
ALTER TABLE "publicacion" DROP CONSTRAINT "publicacion_idanimal_fkey";

-- DropForeignKey
ALTER TABLE "publicacion" DROP CONSTRAINT "publicacion_idpersonaaprobo_fkey";

-- DropForeignKey
ALTER TABLE "publicacion" DROP CONSTRAINT "publicacion_idpersonapublico_fkey";

-- DropForeignKey
ALTER TABLE "registroatencionmedica" DROP CONSTRAINT "registroatencionmedica_idhistorial_fkey";

-- DropForeignKey
ALTER TABLE "registroatencionmedica" DROP CONSTRAINT "registroatencionmedica_idresponsable_fkey";

-- DropForeignKey
ALTER TABLE "registrodesparasitacion" DROP CONSTRAINT "registrodesparasitacion_idregistro_fkey";

-- DropForeignKey
ALTER TABLE "registroestudio" DROP CONSTRAINT "registroestudio_idregistro_fkey";

-- DropForeignKey
ALTER TABLE "registrotratamiento" DROP CONSTRAINT "registrotratamiento_idregistro_fkey";

-- DropForeignKey
ALTER TABLE "registrovacuna" DROP CONSTRAINT "registrovacuna_idregistro_fkey";

-- DropForeignKey
ALTER TABLE "registrovacuna" DROP CONSTRAINT "registrovacuna_idvacuna_fkey";

-- DropForeignKey
ALTER TABLE "rolpermiso" DROP CONSTRAINT "rolpermiso_idpermiso_fkey";

-- DropForeignKey
ALTER TABLE "rolpermiso" DROP CONSTRAINT "rolpermiso_idrol_fkey";

-- DropForeignKey
ALTER TABLE "seguimientoadopcion" DROP CONSTRAINT "seguimientoadopcion_idadopcion_fkey";

-- DropForeignKey
ALTER TABLE "seguimientoadopcion" DROP CONSTRAINT "seguimientoadopcion_idresponsable_fkey";

-- DropForeignKey
ALTER TABLE "socio" DROP CONSTRAINT "socio_idpersona_fkey";

-- DropForeignKey
ALTER TABLE "solicitudadopcion" DROP CONSTRAINT "solicitudadopcion_idanimal_fkey";

-- DropForeignKey
ALTER TABLE "solicitudadopcion" DROP CONSTRAINT "solicitudadopcion_idhogar_fkey";

-- DropForeignKey
ALTER TABLE "solicitudadopcion" DROP CONSTRAINT "solicitudadopcion_idpersonaaprobo_fkey";

-- DropForeignKey
ALTER TABLE "solicitudadopcion" DROP CONSTRAINT "solicitudadopcion_idsolicitante_fkey";

-- DropForeignKey
ALTER TABLE "transitante" DROP CONSTRAINT "transitante_idestadot_fkey";

-- DropForeignKey
ALTER TABLE "transitante" DROP CONSTRAINT "transitante_idpersona_fkey";

-- DropForeignKey
ALTER TABLE "transito" DROP CONSTRAINT "transito_idanimal_fkey";

-- DropForeignKey
ALTER TABLE "transito" DROP CONSTRAINT "transito_idtransitante_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_idpersona_fkey";

-- DropForeignKey
ALTER TABLE "veterinaria" DROP CONSTRAINT "veterinaria_idresponsable_fkey";

-- DropForeignKey
ALTER TABLE "veterinariaservicio" DROP CONSTRAINT "veterinariaservicio_idservicio_fkey";

-- DropForeignKey
ALTER TABLE "veterinariaservicio" DROP CONSTRAINT "veterinariaservicio_idveterinaria_fkey";

-- DropIndex
DROP INDEX "usuario_idpersona_key";

-- AlterTable
CREATE SEQUENCE accion_idaccion_seq;
ALTER TABLE "accion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idaccion" SET DEFAULT nextval('accion_idaccion_seq');
ALTER SEQUENCE accion_idaccion_seq OWNED BY "accion"."idaccion";

-- AlterTable
CREATE SEQUENCE adopcion_idadopcion_seq;
ALTER TABLE "adopcion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idadopcion" SET DEFAULT nextval('adopcion_idadopcion_seq');
ALTER SEQUENCE adopcion_idadopcion_seq OWNED BY "adopcion"."idadopcion";

-- AlterTable
ALTER TABLE "adoptante" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "alimento" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "tipoalimento",
ADD COLUMN     "tipoalimento" "TipoAlimento" NOT NULL;

-- AlterTable
CREATE SEQUENCE animal_idanimal_seq;
ALTER TABLE "animal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idanimal" SET DEFAULT nextval('animal_idanimal_seq'),
DROP COLUMN "sexo",
ADD COLUMN     "sexo" "SexoAnimal" NOT NULL,
DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoAnimal" NOT NULL;
ALTER SEQUENCE animal_idanimal_seq OWNED BY "animal"."idanimal";

-- AlterTable
CREATE SEQUENCE archivo_idarchivo_seq;
ALTER TABLE "archivo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idarchivo" SET DEFAULT nextval('archivo_idarchivo_seq');
ALTER SEQUENCE archivo_idarchivo_seq OWNED BY "archivo"."idarchivo";

-- AlterTable
CREATE SEQUENCE direccionpersona_iddirper_seq;
ALTER TABLE "direccionpersona" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "iddirper" SET DEFAULT nextval('direccionpersona_iddirper_seq');
ALTER SEQUENCE direccionpersona_iddirper_seq OWNED BY "direccionpersona"."iddirper";

-- AlterTable
CREATE SEQUENCE donacion_iddonacion_seq;
ALTER TABLE "donacion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "iddonacion" SET DEFAULT nextval('donacion_iddonacion_seq'),
ALTER COLUMN "monto" SET DATA TYPE DECIMAL(12,2);
ALTER SEQUENCE donacion_iddonacion_seq OWNED BY "donacion"."iddonacion";

-- AlterTable
CREATE SEQUENCE especieanimal_idespecie_seq;
ALTER TABLE "especieanimal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idespecie" SET DEFAULT nextval('especieanimal_idespecie_seq');
ALTER SEQUENCE especieanimal_idespecie_seq OWNED BY "especieanimal"."idespecie";

-- AlterTable
CREATE SEQUENCE estadoadoptante_idestadoa_seq;
ALTER TABLE "estadoadoptante" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idestadoa" SET DEFAULT nextval('estadoadoptante_idestadoa_seq');
ALTER SEQUENCE estadoadoptante_idestadoa_seq OWNED BY "estadoadoptante"."idestadoa";

-- AlterTable
CREATE SEQUENCE estadotransitante_idestadot_seq;
ALTER TABLE "estadotransitante" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idestadot" SET DEFAULT nextval('estadotransitante_idestadot_seq');
ALTER SEQUENCE estadotransitante_idestadot_seq OWNED BY "estadotransitante"."idestadot";

-- AlterTable
CREATE SEQUENCE gasto_idgasto_seq;
ALTER TABLE "gasto" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idgasto" SET DEFAULT nextval('gasto_idgasto_seq'),
ALTER COLUMN "monto" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "reintegrado" SET DEFAULT false;
ALTER SEQUENCE gasto_idgasto_seq OWNED BY "gasto"."idgasto";

-- AlterTable
CREATE SEQUENCE historialclinico_idhistorial_seq;
ALTER TABLE "historialclinico" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idhistorial" SET DEFAULT nextval('historialclinico_idhistorial_seq');
ALTER SEQUENCE historialclinico_idhistorial_seq OWNED BY "historialclinico"."idhistorial";

-- AlterTable
CREATE SEQUENCE hogar_idhogar_seq;
ALTER TABLE "hogar" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idhogar" SET DEFAULT nextval('hogar_idhogar_seq');
ALTER SEQUENCE hogar_idhogar_seq OWNED BY "hogar"."idhogar";

-- AlterTable
CREATE SEQUENCE insumo_idinsumo_seq;
ALTER TABLE "insumo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idinsumo" SET DEFAULT nextval('insumo_idinsumo_seq');
ALTER SEQUENCE insumo_idinsumo_seq OWNED BY "insumo"."idinsumo";

-- AlterTable
CREATE SEQUENCE localidad_idlocalidad_seq;
ALTER TABLE "localidad" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idlocalidad" SET DEFAULT nextval('localidad_idlocalidad_seq');
ALTER SEQUENCE localidad_idlocalidad_seq OWNED BY "localidad"."idlocalidad";

-- AlterTable
ALTER TABLE "medicamento" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "viaadministracion",
ADD COLUMN     "viaadministracion" "ViaAdminMedicamento" NOT NULL;

-- AlterTable
CREATE SEQUENCE movimientoinventario_idmovimiento_seq;
ALTER TABLE "movimientoinventario" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idmovimiento" SET DEFAULT nextval('movimientoinventario_idmovimiento_seq'),
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoMovimientoInventario" NOT NULL;
ALTER SEQUENCE movimientoinventario_idmovimiento_seq OWNED BY "movimientoinventario"."idmovimiento";

-- AlterTable
CREATE SEQUENCE permiso_idpermiso_seq;
ALTER TABLE "permiso" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idpermiso" SET DEFAULT nextval('permiso_idpermiso_seq');
ALTER SEQUENCE permiso_idpermiso_seq OWNED BY "permiso"."idpermiso";

-- AlterTable
CREATE SEQUENCE personarol_idpersonarol_seq;
ALTER TABLE "personarol" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idpersonarol" SET DEFAULT nextval('personarol_idpersonarol_seq');
ALTER SEQUENCE personarol_idpersonarol_seq OWNED BY "personarol"."idpersonarol";

-- AlterTable
CREATE SEQUENCE postulaciontransito_idpostulacion_seq;
ALTER TABLE "postulaciontransito" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idpostulacion" SET DEFAULT nextval('postulaciontransito_idpostulacion_seq'),
DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoSolicitud" NOT NULL DEFAULT 'PENDIENTE';
ALTER SEQUENCE postulaciontransito_idpostulacion_seq OWNED BY "postulaciontransito"."idpostulacion";

-- AlterTable
ALTER TABLE "profesionalveterinario" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
CREATE SEQUENCE publicacion_idpublicacion_seq;
ALTER TABLE "publicacion" DROP COLUMN "aprobado",
DROP COLUMN "contacto",
DROP COLUMN "foto",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailVisitante" VARCHAR(255),
ADD COLUMN     "estadoaprobado" "EstadoSolicitud" NOT NULL DEFAULT 'PENDIENTE',
ADD COLUMN     "ipHash" VARCHAR(64),
ADD COLUMN     "nombreVisitante" VARCHAR(150),
ADD COLUMN     "telefonoVisitante" VARCHAR(20),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uuid" UUID NOT NULL,
ALTER COLUMN "idpublicacion" SET DEFAULT nextval('publicacion_idpublicacion_seq'),
ALTER COLUMN "idpersonapublico" DROP NOT NULL,
ALTER COLUMN "resuelto" SET DEFAULT false;
ALTER SEQUENCE publicacion_idpublicacion_seq OWNED BY "publicacion"."idpublicacion";

-- AlterTable
CREATE SEQUENCE recurso_idrecurso_seq;
ALTER TABLE "recurso" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idrecurso" SET DEFAULT nextval('recurso_idrecurso_seq');
ALTER SEQUENCE recurso_idrecurso_seq OWNED BY "recurso"."idrecurso";

-- AlterTable
CREATE SEQUENCE registroatencionmedica_idregistro_seq;
ALTER TABLE "registroatencionmedica" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tipo" "TipoAtencionMedica" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idregistro" SET DEFAULT nextval('registroatencionmedica_idregistro_seq');
ALTER SEQUENCE registroatencionmedica_idregistro_seq OWNED BY "registroatencionmedica"."idregistro";

-- AlterTable
ALTER TABLE "registrodesparasitacion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "registroestudio" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "registrotratamiento" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "registrovacuna" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
CREATE SEQUENCE responsable_idresponsable_seq;
ALTER TABLE "responsable" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tipo" "TipoResponsable" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idresponsable" SET DEFAULT nextval('responsable_idresponsable_seq');
ALTER SEQUENCE responsable_idresponsable_seq OWNED BY "responsable"."idresponsable";

-- AlterTable
CREATE SEQUENCE rol_idrol_seq;
ALTER TABLE "rol" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idrol" SET DEFAULT nextval('rol_idrol_seq');
ALTER SEQUENCE rol_idrol_seq OWNED BY "rol"."idrol";

-- AlterTable
CREATE SEQUENCE rolpermiso_idrolpermiso_seq;
ALTER TABLE "rolpermiso" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idrolpermiso" SET DEFAULT nextval('rolpermiso_idrolpermiso_seq');
ALTER SEQUENCE rolpermiso_idrolpermiso_seq OWNED BY "rolpermiso"."idrolpermiso";

-- AlterTable
CREATE SEQUENCE seguimientoadopcion_idseguimiento_seq;
ALTER TABLE "seguimientoadopcion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idseguimiento" SET DEFAULT nextval('seguimientoadopcion_idseguimiento_seq');
ALTER SEQUENCE seguimientoadopcion_idseguimiento_seq OWNED BY "seguimientoadopcion"."idseguimiento";

-- AlterTable
CREATE SEQUENCE servicioofrecido_idservicio_seq;
ALTER TABLE "servicioofrecido" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idservicio" SET DEFAULT nextval('servicioofrecido_idservicio_seq');
ALTER SEQUENCE servicioofrecido_idservicio_seq OWNED BY "servicioofrecido"."idservicio";

-- AlterTable
CREATE SEQUENCE solicitudadopcion_idsolicituda_seq;
ALTER TABLE "solicitudadopcion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idsolicituda" SET DEFAULT nextval('solicitudadopcion_idsolicituda_seq'),
DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoSolicitud" NOT NULL DEFAULT 'PENDIENTE';
ALTER SEQUENCE solicitudadopcion_idsolicituda_seq OWNED BY "solicitudadopcion"."idsolicituda";

-- AlterTable
CREATE SEQUENCE tipogasto_idtipogasto_seq;
ALTER TABLE "tipogasto" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idtipogasto" SET DEFAULT nextval('tipogasto_idtipogasto_seq');
ALTER SEQUENCE tipogasto_idtipogasto_seq OWNED BY "tipogasto"."idtipogasto";

-- AlterTable
ALTER TABLE "transitante" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idpersona" DROP DEFAULT;
DROP SEQUENCE "transitante_idpersona_seq";

-- AlterTable
CREATE SEQUENCE transito_idtransito_seq;
ALTER TABLE "transito" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idtransito" SET DEFAULT nextval('transito_idtransito_seq'),
DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoTransito" NOT NULL DEFAULT 'ACTIVO';
ALTER SEQUENCE transito_idtransito_seq OWNED BY "transito"."idtransito";

-- AlterTable
CREATE SEQUENCE usuario_idpersona_seq;
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "contraseña",
DROP COLUMN "idusuario",
DROP COLUMN "nombreusuario",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dni" INTEGER NOT NULL,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "estado" "EstadoUsuario" NOT NULL,
ADD COLUMN     "fechanac" DATE,
ADD COLUMN     "nombrecompleto" VARCHAR(150) NOT NULL,
ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL,
ADD COLUMN     "telefono" VARCHAR(20),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usuariofacebook" VARCHAR(100),
ADD COLUMN     "usuarioinstagram" VARCHAR(50),
ALTER COLUMN "idpersona" SET DEFAULT nextval('usuario_idpersona_seq'),
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("idpersona");
ALTER SEQUENCE usuario_idpersona_seq OWNED BY "usuario"."idpersona";

-- AlterTable
CREATE SEQUENCE vacuna_idvacuna_seq;
ALTER TABLE "vacuna" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idvacuna" SET DEFAULT nextval('vacuna_idvacuna_seq');
ALTER SEQUENCE vacuna_idvacuna_seq OWNED BY "vacuna"."idvacuna";

-- AlterTable
ALTER TABLE "veterinaria" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
CREATE SEQUENCE veterinariaservicio_idvetserv_seq;
ALTER TABLE "veterinariaservicio" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "idvetserv" SET DEFAULT nextval('veterinariaservicio_idvetserv_seq');
ALTER SEQUENCE veterinariaservicio_idvetserv_seq OWNED BY "veterinariaservicio"."idvetserv";

-- DropTable
DROP TABLE "persona";

-- DropTable
DROP TABLE "socio";

-- CreateTable
CREATE TABLE "foto" (
    "idfoto" SERIAL NOT NULL,
    "idpub" INTEGER NOT NULL,
    "ruta" VARCHAR(255) NOT NULL,

    CONSTRAINT "foto_pkey" PRIMARY KEY ("idfoto")
);

-- CreateIndex
CREATE INDEX "adopcion_fechaentrega_idx" ON "adopcion"("fechaentrega");

-- CreateIndex
CREATE INDEX "animal_estado_idx" ON "animal"("estado");

-- CreateIndex
CREATE INDEX "donacion_fecha_idx" ON "donacion"("fecha");

-- CreateIndex
CREATE INDEX "gasto_fecha_idx" ON "gasto"("fecha");

-- CreateIndex
CREATE INDEX "historialclinico_fecha_idx" ON "historialclinico"("fecha");

-- CreateIndex
CREATE INDEX "insumo_fechavencimiento_idx" ON "insumo"("fechavencimiento");

-- CreateIndex
CREATE INDEX "movimientoinventario_fecha_idx" ON "movimientoinventario"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "permiso_idrecurso_idaccion_key" ON "permiso"("idrecurso", "idaccion");

-- CreateIndex
CREATE UNIQUE INDEX "personarol_idpersona_idrol_key" ON "personarol"("idpersona", "idrol");

-- CreateIndex
CREATE INDEX "postulaciontransito_estado_idx" ON "postulaciontransito"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "publicacion_uuid_key" ON "publicacion"("uuid");

-- CreateIndex
CREATE INDEX "publicacion_resuelto_idx" ON "publicacion"("resuelto");

-- CreateIndex
CREATE INDEX "publicacion_fecha_idx" ON "publicacion"("fecha");

-- CreateIndex
CREATE INDEX "publicacion_ipHash_idx" ON "publicacion"("ipHash");

-- CreateIndex
CREATE INDEX "publicacion_estadoaprobado_idx" ON "publicacion"("estadoaprobado");

-- CreateIndex
CREATE INDEX "registroatencionmedica_fecha_idx" ON "registroatencionmedica"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "responsable_email_key" ON "responsable"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rolpermiso_idrol_idpermiso_key" ON "rolpermiso"("idrol", "idpermiso");

-- CreateIndex
CREATE INDEX "seguimientoadopcion_fecha_idx" ON "seguimientoadopcion"("fecha");

-- CreateIndex
CREATE INDEX "solicitudadopcion_estado_idx" ON "solicitudadopcion"("estado");

-- CreateIndex
CREATE INDEX "transito_estado_idx" ON "transito"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_dni_key" ON "usuario"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "veterinariaservicio_idveterinaria_idservicio_key" ON "veterinariaservicio"("idveterinaria", "idservicio");

-- AddForeignKey
ALTER TABLE "adopcion" ADD CONSTRAINT "adopcion_idadoptante_fkey" FOREIGN KEY ("idadoptante") REFERENCES "adoptante"("idpersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adopcion" ADD CONSTRAINT "adopcion_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptante" ADD CONSTRAINT "adoptante_idestadoa_fkey" FOREIGN KEY ("idestadoa") REFERENCES "estadoadoptante"("idestadoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptante" ADD CONSTRAINT "adoptante_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "usuario"("idpersona") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alimento" ADD CONSTRAINT "alimento_idespecie_fkey" FOREIGN KEY ("idespecie") REFERENCES "especieanimal"("idespecie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alimento" ADD CONSTRAINT "alimento_idinsumo_fkey" FOREIGN KEY ("idinsumo") REFERENCES "insumo"("idinsumo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_idespecie_fkey" FOREIGN KEY ("idespecie") REFERENCES "especieanimal"("idespecie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archivo" ADD CONSTRAINT "archivo_idseguimiento_fkey" FOREIGN KEY ("idseguimiento") REFERENCES "seguimientoadopcion"("idseguimiento") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direccionpersona" ADD CONSTRAINT "direccionpersona_idlocalidad_fkey" FOREIGN KEY ("idlocalidad") REFERENCES "localidad"("idlocalidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direccionpersona" ADD CONSTRAINT "direccionpersona_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "usuario"("idpersona") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donacion" ADD CONSTRAINT "donacion_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "usuario"("idpersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gasto" ADD CONSTRAINT "gasto_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gasto" ADD CONSTRAINT "gasto_idtipogasto_fkey" FOREIGN KEY ("idtipogasto") REFERENCES "tipogasto"("idtipogasto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historialclinico" ADD CONSTRAINT "historialclinico_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicamento" ADD CONSTRAINT "medicamento_idinsumo_fkey" FOREIGN KEY ("idinsumo") REFERENCES "insumo"("idinsumo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientoinventario" ADD CONSTRAINT "movimientoinventario_idinsumo_fkey" FOREIGN KEY ("idinsumo") REFERENCES "insumo"("idinsumo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientoinventario" ADD CONSTRAINT "movimientoinventario_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "usuario"("idpersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permiso" ADD CONSTRAINT "permiso_idaccion_fkey" FOREIGN KEY ("idaccion") REFERENCES "accion"("idaccion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permiso" ADD CONSTRAINT "permiso_idrecurso_fkey" FOREIGN KEY ("idrecurso") REFERENCES "recurso"("idrecurso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personarol" ADD CONSTRAINT "personarol_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "usuario"("idpersona") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personarol" ADD CONSTRAINT "personarol_idrol_fkey" FOREIGN KEY ("idrol") REFERENCES "rol"("idrol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulaciontransito" ADD CONSTRAINT "postulaciontransito_idhogar_fkey" FOREIGN KEY ("idhogar") REFERENCES "hogar"("idhogar") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulaciontransito" ADD CONSTRAINT "postulaciontransito_idpersonaaprobo_fkey" FOREIGN KEY ("idpersonaaprobo") REFERENCES "usuario"("idpersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulaciontransito" ADD CONSTRAINT "postulaciontransito_idpostulante_fkey" FOREIGN KEY ("idpostulante") REFERENCES "usuario"("idpersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesionalveterinario" ADD CONSTRAINT "profesionalveterinario_idresponsable_fkey" FOREIGN KEY ("idresponsable") REFERENCES "responsable"("idresponsable") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_idpersonaaprobo_fkey" FOREIGN KEY ("idpersonaaprobo") REFERENCES "usuario"("idpersona") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_idpersonapublico_fkey" FOREIGN KEY ("idpersonapublico") REFERENCES "usuario"("idpersona") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foto" ADD CONSTRAINT "foto_idpub_fkey" FOREIGN KEY ("idpub") REFERENCES "publicacion"("idpublicacion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroatencionmedica" ADD CONSTRAINT "registroatencionmedica_idhistorial_fkey" FOREIGN KEY ("idhistorial") REFERENCES "historialclinico"("idhistorial") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroatencionmedica" ADD CONSTRAINT "registroatencionmedica_idresponsable_fkey" FOREIGN KEY ("idresponsable") REFERENCES "responsable"("idresponsable") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrodesparasitacion" ADD CONSTRAINT "registrodesparasitacion_idregistro_fkey" FOREIGN KEY ("idregistro") REFERENCES "registroatencionmedica"("idregistro") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroestudio" ADD CONSTRAINT "registroestudio_idregistro_fkey" FOREIGN KEY ("idregistro") REFERENCES "registroatencionmedica"("idregistro") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrotratamiento" ADD CONSTRAINT "registrotratamiento_idregistro_fkey" FOREIGN KEY ("idregistro") REFERENCES "registroatencionmedica"("idregistro") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrovacuna" ADD CONSTRAINT "registrovacuna_idregistro_fkey" FOREIGN KEY ("idregistro") REFERENCES "registroatencionmedica"("idregistro") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrovacuna" ADD CONSTRAINT "registrovacuna_idvacuna_fkey" FOREIGN KEY ("idvacuna") REFERENCES "vacuna"("idvacuna") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rolpermiso" ADD CONSTRAINT "rolpermiso_idpermiso_fkey" FOREIGN KEY ("idpermiso") REFERENCES "permiso"("idpermiso") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rolpermiso" ADD CONSTRAINT "rolpermiso_idrol_fkey" FOREIGN KEY ("idrol") REFERENCES "rol"("idrol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguimientoadopcion" ADD CONSTRAINT "seguimientoadopcion_idadopcion_fkey" FOREIGN KEY ("idadopcion") REFERENCES "adopcion"("idadopcion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguimientoadopcion" ADD CONSTRAINT "seguimientoadopcion_idresponsable_fkey" FOREIGN KEY ("idresponsable") REFERENCES "usuario"("idpersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitudadopcion" ADD CONSTRAINT "solicitudadopcion_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitudadopcion" ADD CONSTRAINT "solicitudadopcion_idhogar_fkey" FOREIGN KEY ("idhogar") REFERENCES "hogar"("idhogar") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitudadopcion" ADD CONSTRAINT "solicitudadopcion_idpersonaaprobo_fkey" FOREIGN KEY ("idpersonaaprobo") REFERENCES "usuario"("idpersona") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitudadopcion" ADD CONSTRAINT "solicitudadopcion_idsolicitante_fkey" FOREIGN KEY ("idsolicitante") REFERENCES "usuario"("idpersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transitante" ADD CONSTRAINT "transitante_idestadot_fkey" FOREIGN KEY ("idestadot") REFERENCES "estadotransitante"("idestadot") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transitante" ADD CONSTRAINT "transitante_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "usuario"("idpersona") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transito" ADD CONSTRAINT "transito_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transito" ADD CONSTRAINT "transito_idtransitante_fkey" FOREIGN KEY ("idtransitante") REFERENCES "transitante"("idpersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veterinaria" ADD CONSTRAINT "veterinaria_idresponsable_fkey" FOREIGN KEY ("idresponsable") REFERENCES "responsable"("idresponsable") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veterinariaservicio" ADD CONSTRAINT "veterinariaservicio_idservicio_fkey" FOREIGN KEY ("idservicio") REFERENCES "servicioofrecido"("idservicio") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veterinariaservicio" ADD CONSTRAINT "veterinariaservicio_idveterinaria_fkey" FOREIGN KEY ("idveterinaria") REFERENCES "veterinaria"("idresponsable") ON DELETE CASCADE ON UPDATE CASCADE;
