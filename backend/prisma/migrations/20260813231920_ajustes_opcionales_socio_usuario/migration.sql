/*
  Warnings:

  - You are about to drop the column `contraseña` on the `persona` table. All the data in the column will be lost.
  - You are about to drop the column `fechaalta` on the `persona` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE persona_idpersona_seq;
ALTER TABLE "persona" DROP COLUMN "contraseña",
DROP COLUMN "fechaalta",
ALTER COLUMN "idpersona" SET DEFAULT nextval('persona_idpersona_seq'),
ALTER COLUMN "telefono" DROP NOT NULL,
ALTER COLUMN "usuarioinstagram" DROP NOT NULL,
ALTER COLUMN "usuariofacebook" DROP NOT NULL,
ALTER COLUMN "fechanac" DROP NOT NULL;
ALTER SEQUENCE persona_idpersona_seq OWNED BY "persona"."idpersona";

-- AlterTable
ALTER TABLE "publicacion" ADD COLUMN     "foto" VARCHAR(255),
ALTER COLUMN "idpersonaaprobo" DROP NOT NULL,
ALTER COLUMN "idanimal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "solicitudadopcion" ALTER COLUMN "idpersonaaprobo" DROP NOT NULL,
ALTER COLUMN "fechaaprobacion" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE transitante_idpersona_seq;
ALTER TABLE "transitante" ALTER COLUMN "idpersona" SET DEFAULT nextval('transitante_idpersona_seq');
ALTER SEQUENCE transitante_idpersona_seq OWNED BY "transitante"."idpersona";

-- AlterTable
ALTER TABLE "transito" ALTER COLUMN "fechafin" DROP NOT NULL;

-- CreateTable
CREATE TABLE "socio" (
    "idpersona" INTEGER NOT NULL,
    "fechaalta" DATE NOT NULL,

    CONSTRAINT "socio_pkey" PRIMARY KEY ("idpersona")
);

-- CreateTable
CREATE TABLE "usuario" (
    "idusuario" SERIAL NOT NULL,
    "idpersona" INTEGER NOT NULL,
    "nombreusuario" VARCHAR(50) NOT NULL,
    "contraseña" VARCHAR(255) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("idusuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_idpersona_key" ON "usuario"("idpersona");

-- AddForeignKey
ALTER TABLE "socio" ADD CONSTRAINT "socio_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;
