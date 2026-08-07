-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "accion" (
    "idaccion" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "accion_pkey" PRIMARY KEY ("idaccion")
);

-- CreateTable
CREATE TABLE "adopcion" (
    "idadopcion" INTEGER NOT NULL,
    "idanimal" INTEGER NOT NULL,
    "idadoptante" INTEGER NOT NULL,
    "fechaentrega" DATE NOT NULL,
    "observaciones" VARCHAR(500) NOT NULL,

    CONSTRAINT "adopcion_pkey" PRIMARY KEY ("idadopcion")
);

-- CreateTable
CREATE TABLE "adoptante" (
    "idpersona" INTEGER NOT NULL,
    "idestadoa" INTEGER NOT NULL,

    CONSTRAINT "adoptante_pkey" PRIMARY KEY ("idpersona")
);

-- CreateTable
CREATE TABLE "alimento" (
    "idinsumo" INTEGER NOT NULL,
    "idespecie" INTEGER NOT NULL,
    "marca" VARCHAR(100) NOT NULL,
    "tipoalimento" VARCHAR(50) NOT NULL,
    "peso" INTEGER NOT NULL,

    CONSTRAINT "alimento_pkey" PRIMARY KEY ("idinsumo")
);

-- CreateTable
CREATE TABLE "animal" (
    "idanimal" INTEGER NOT NULL,
    "idespecie" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "sexo" VARCHAR(10) NOT NULL,
    "edadestimada" INTEGER NOT NULL,
    "colorpelaje" VARCHAR(50) NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "castrado" BOOLEAN NOT NULL,
    "lugarorigen" VARCHAR(150) NOT NULL,
    "estado" VARCHAR(30) NOT NULL,
    "fechaingreso" DATE NOT NULL,
    "lactante" BOOLEAN NOT NULL,

    CONSTRAINT "animal_pkey" PRIMARY KEY ("idanimal")
);

-- CreateTable
CREATE TABLE "archivo" (
    "idarchivo" INTEGER NOT NULL,
    "idseguimiento" INTEGER NOT NULL,
    "archivo" VARCHAR(255) NOT NULL,

    CONSTRAINT "archivo_pkey" PRIMARY KEY ("idarchivo")
);

-- CreateTable
CREATE TABLE "direccionpersona" (
    "iddirper" INTEGER NOT NULL,
    "idpersona" INTEGER NOT NULL,
    "idlocalidad" INTEGER NOT NULL,
    "calle" VARCHAR(150) NOT NULL,
    "numero" VARCHAR(10) NOT NULL,

    CONSTRAINT "direccionpersona_pkey" PRIMARY KEY ("iddirper")
);

-- CreateTable
CREATE TABLE "donacion" (
    "iddonacion" INTEGER NOT NULL,
    "idpersona" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" DATE NOT NULL,
    "canal" VARCHAR(50) NOT NULL,

    CONSTRAINT "donacion_pkey" PRIMARY KEY ("iddonacion")
);

-- CreateTable
CREATE TABLE "especieanimal" (
    "idespecie" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "especieanimal_pkey" PRIMARY KEY ("idespecie")
);

-- CreateTable
CREATE TABLE "estadoadoptante" (
    "idestadoa" INTEGER NOT NULL,
    "estado" VARCHAR(30) NOT NULL,

    CONSTRAINT "estadoadoptante_pkey" PRIMARY KEY ("idestadoa")
);

-- CreateTable
CREATE TABLE "estadotransitante" (
    "idestadot" INTEGER NOT NULL,
    "estado" VARCHAR(30) NOT NULL,

    CONSTRAINT "estadotransitante_pkey" PRIMARY KEY ("idestadot")
);

-- CreateTable
CREATE TABLE "gasto" (
    "idgasto" INTEGER NOT NULL,
    "idanimal" INTEGER NOT NULL,
    "idtipogasto" INTEGER NOT NULL,
    "descripcion" VARCHAR(500) NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" DATE NOT NULL,
    "comprobante" VARCHAR(255) NOT NULL,
    "reintegrado" BOOLEAN NOT NULL,

    CONSTRAINT "gasto_pkey" PRIMARY KEY ("idgasto")
);

-- CreateTable
CREATE TABLE "historialclinico" (
    "idhistorial" INTEGER NOT NULL,
    "idanimal" INTEGER NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL,
    "descripcion" VARCHAR(500) NOT NULL,

    CONSTRAINT "historialclinico_pkey" PRIMARY KEY ("idhistorial")
);

-- CreateTable
CREATE TABLE "hogar" (
    "idhogar" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "observacionesexterior" VARCHAR(500) NOT NULL,
    "proteccionexterior" VARCHAR(255) NOT NULL,

    CONSTRAINT "hogar_pkey" PRIMARY KEY ("idhogar")
);

-- CreateTable
CREATE TABLE "insumo" (
    "idinsumo" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(500) NOT NULL,
    "stock" INTEGER NOT NULL,
    "fechavencimiento" DATE NOT NULL,

    CONSTRAINT "insumo_pkey" PRIMARY KEY ("idinsumo")
);

-- CreateTable
CREATE TABLE "localidad" (
    "idlocalidad" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "localidad_pkey" PRIMARY KEY ("idlocalidad")
);

-- CreateTable
CREATE TABLE "medicamento" (
    "idinsumo" INTEGER NOT NULL,
    "numerolote" VARCHAR(50) NOT NULL,
    "concentracion" VARCHAR(50) NOT NULL,
    "viaadministracion" VARCHAR(50) NOT NULL,

    CONSTRAINT "medicamento_pkey" PRIMARY KEY ("idinsumo")
);

-- CreateTable
CREATE TABLE "movimientoinventario" (
    "idmovimiento" INTEGER NOT NULL,
    "idinsumo" INTEGER NOT NULL,
    "idpersona" INTEGER NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "motivo" VARCHAR(255) NOT NULL,

    CONSTRAINT "movimientoinventario_pkey" PRIMARY KEY ("idmovimiento")
);

-- CreateTable
CREATE TABLE "permiso" (
    "idpermiso" INTEGER NOT NULL,
    "idrecurso" INTEGER NOT NULL,
    "idaccion" INTEGER NOT NULL,

    CONSTRAINT "permiso_pkey" PRIMARY KEY ("idpermiso")
);

-- CreateTable
CREATE TABLE "persona" (
    "idpersona" INTEGER NOT NULL,
    "nombrecompleto" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "dni" INTEGER NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "usuarioinstagram" VARCHAR(50) NOT NULL,
    "usuariofacebook" VARCHAR(100) NOT NULL,
    "fechanac" DATE NOT NULL,
    "fechaalta" TIMESTAMP(6) NOT NULL,
    "contraseña" VARCHAR(255) NOT NULL,

    CONSTRAINT "persona_pkey" PRIMARY KEY ("idpersona")
);

-- CreateTable
CREATE TABLE "personarol" (
    "idpersonarol" INTEGER NOT NULL,
    "idrol" INTEGER NOT NULL,
    "idpersona" INTEGER NOT NULL,

    CONSTRAINT "personarol_pkey" PRIMARY KEY ("idpersonarol")
);

-- CreateTable
CREATE TABLE "postulaciontransito" (
    "idpostulacion" INTEGER NOT NULL,
    "idpostulante" INTEGER NOT NULL,
    "idpersonaaprobo" INTEGER NOT NULL,
    "idhogar" INTEGER NOT NULL,
    "fechapostulacion" TIMESTAMP(6) NOT NULL,
    "estado" VARCHAR(30) NOT NULL,
    "rutaformulario" VARCHAR(255) NOT NULL,

    CONSTRAINT "postulaciontransito_pkey" PRIMARY KEY ("idpostulacion")
);

-- CreateTable
CREATE TABLE "profesionalveterinario" (
    "idresponsable" INTEGER NOT NULL,
    "especialidad" VARCHAR(100) NOT NULL,

    CONSTRAINT "profesionalveterinario_pkey" PRIMARY KEY ("idresponsable")
);

-- CreateTable
CREATE TABLE "publicacion" (
    "idpublicacion" INTEGER NOT NULL,
    "idpersonapublico" INTEGER NOT NULL,
    "idpersonaaprobo" INTEGER NOT NULL,
    "idanimal" INTEGER NOT NULL,
    "descripcion" VARCHAR(500) NOT NULL,
    "zona" VARCHAR(100) NOT NULL,
    "fecha" DATE NOT NULL,
    "contacto" VARCHAR(150) NOT NULL,
    "aprobado" BOOLEAN NOT NULL,
    "resuelto" BOOLEAN NOT NULL,

    CONSTRAINT "publicacion_pkey" PRIMARY KEY ("idpublicacion")
);

-- CreateTable
CREATE TABLE "recurso" (
    "idrecurso" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "recurso_pkey" PRIMARY KEY ("idrecurso")
);

-- CreateTable
CREATE TABLE "registroatencionmedica" (
    "idregistro" INTEGER NOT NULL,
    "idhistorial" INTEGER NOT NULL,
    "idresponsable" INTEGER NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "registroatencionmedica_pkey" PRIMARY KEY ("idregistro")
);

-- CreateTable
CREATE TABLE "registrodesparasitacion" (
    "idregistro" INTEGER NOT NULL,
    "producto" VARCHAR(150) NOT NULL,
    "dosis" VARCHAR(50) NOT NULL,
    "fechaaplicacion" DATE NOT NULL,
    "proximaaplicacion" DATE NOT NULL,

    CONSTRAINT "registrodesparasitacion_pkey" PRIMARY KEY ("idregistro")
);

-- CreateTable
CREATE TABLE "registroestudio" (
    "idregistro" INTEGER NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "fecha" DATE NOT NULL,
    "resultado" VARCHAR(500) NOT NULL,
    "archivo" VARCHAR(255) NOT NULL,

    CONSTRAINT "registroestudio_pkey" PRIMARY KEY ("idregistro")
);

-- CreateTable
CREATE TABLE "registrotratamiento" (
    "idregistro" INTEGER NOT NULL,
    "descripcion" VARCHAR(500) NOT NULL,
    "fechainicio" DATE NOT NULL,
    "fechafin" DATE NOT NULL,
    "medicacion" VARCHAR(200) NOT NULL,
    "archivo" VARCHAR(255) NOT NULL,

    CONSTRAINT "registrotratamiento_pkey" PRIMARY KEY ("idregistro")
);

-- CreateTable
CREATE TABLE "registrovacuna" (
    "idregistro" INTEGER NOT NULL,
    "fechaaplicacion" DATE NOT NULL,
    "fechavencimiento" DATE NOT NULL,
    "idvacuna" INTEGER NOT NULL,

    CONSTRAINT "registrovacuna_pkey" PRIMARY KEY ("idregistro")
);

-- CreateTable
CREATE TABLE "responsable" (
    "idresponsable" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "responsable_pkey" PRIMARY KEY ("idresponsable")
);

-- CreateTable
CREATE TABLE "rol" (
    "idrol" INTEGER NOT NULL,
    "rol" VARCHAR(50) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("idrol")
);

-- CreateTable
CREATE TABLE "rolpermiso" (
    "idrolpermiso" INTEGER NOT NULL,
    "idrol" INTEGER NOT NULL,
    "idpermiso" INTEGER NOT NULL,

    CONSTRAINT "rolpermiso_pkey" PRIMARY KEY ("idrolpermiso")
);

-- CreateTable
CREATE TABLE "seguimientoadopcion" (
    "idseguimiento" INTEGER NOT NULL,
    "idadopcion" INTEGER NOT NULL,
    "idresponsable" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "observaciones" VARCHAR(500) NOT NULL,

    CONSTRAINT "seguimientoadopcion_pkey" PRIMARY KEY ("idseguimiento")
);

-- CreateTable
CREATE TABLE "servicioofrecido" (
    "idservicio" INTEGER NOT NULL,
    "servicio" VARCHAR(100) NOT NULL,

    CONSTRAINT "servicioofrecido_pkey" PRIMARY KEY ("idservicio")
);

-- CreateTable
CREATE TABLE "solicitudadopcion" (
    "idsolicituda" INTEGER NOT NULL,
    "idhogar" INTEGER NOT NULL,
    "idsolicitante" INTEGER NOT NULL,
    "idpersonaaprobo" INTEGER NOT NULL,
    "idanimal" INTEGER NOT NULL,
    "estado" VARCHAR(30) NOT NULL,
    "rutaformulario" VARCHAR(255) NOT NULL,
    "fechaaprobacion" DATE NOT NULL,

    CONSTRAINT "solicitudadopcion_pkey" PRIMARY KEY ("idsolicituda")
);

-- CreateTable
CREATE TABLE "tipogasto" (
    "idtipogasto" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "tipogasto_pkey" PRIMARY KEY ("idtipogasto")
);

-- CreateTable
CREATE TABLE "transitante" (
    "idpersona" INTEGER NOT NULL,
    "idestadot" INTEGER NOT NULL,
    "disponibilidad" VARCHAR(100) NOT NULL,
    "capacidaddisponible" INTEGER NOT NULL,
    "experienciaprevia" VARCHAR(500) NOT NULL,

    CONSTRAINT "transitante_pkey" PRIMARY KEY ("idpersona")
);

-- CreateTable
CREATE TABLE "transito" (
    "idtransito" INTEGER NOT NULL,
    "idanimal" INTEGER NOT NULL,
    "idtransitante" INTEGER NOT NULL,
    "fechainicio" DATE NOT NULL,
    "fechafin" DATE NOT NULL,
    "estado" VARCHAR(30) NOT NULL,

    CONSTRAINT "transito_pkey" PRIMARY KEY ("idtransito")
);

-- CreateTable
CREATE TABLE "vacuna" (
    "idvacuna" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "vacuna_pkey" PRIMARY KEY ("idvacuna")
);

-- CreateTable
CREATE TABLE "veterinaria" (
    "idresponsable" INTEGER NOT NULL,
    "direccion" VARCHAR(200) NOT NULL,

    CONSTRAINT "veterinaria_pkey" PRIMARY KEY ("idresponsable")
);

-- CreateTable
CREATE TABLE "veterinariaservicio" (
    "idvetserv" INTEGER NOT NULL,
    "idveterinaria" INTEGER NOT NULL,
    "idservicio" INTEGER NOT NULL,

    CONSTRAINT "veterinariaservicio_pkey" PRIMARY KEY ("idvetserv")
);

-- AddForeignKey
ALTER TABLE "adopcion" ADD CONSTRAINT "adopcion_idadoptante_fkey" FOREIGN KEY ("idadoptante") REFERENCES "adoptante"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adopcion" ADD CONSTRAINT "adopcion_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adoptante" ADD CONSTRAINT "adoptante_idestadoa_fkey" FOREIGN KEY ("idestadoa") REFERENCES "estadoadoptante"("idestadoa") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adoptante" ADD CONSTRAINT "adoptante_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alimento" ADD CONSTRAINT "alimento_idespecie_fkey" FOREIGN KEY ("idespecie") REFERENCES "especieanimal"("idespecie") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alimento" ADD CONSTRAINT "alimento_idinsumo_fkey" FOREIGN KEY ("idinsumo") REFERENCES "insumo"("idinsumo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_idespecie_fkey" FOREIGN KEY ("idespecie") REFERENCES "especieanimal"("idespecie") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archivo" ADD CONSTRAINT "archivo_idseguimiento_fkey" FOREIGN KEY ("idseguimiento") REFERENCES "seguimientoadopcion"("idseguimiento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "direccionpersona" ADD CONSTRAINT "direccionpersona_idlocalidad_fkey" FOREIGN KEY ("idlocalidad") REFERENCES "localidad"("idlocalidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "direccionpersona" ADD CONSTRAINT "direccionpersona_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donacion" ADD CONSTRAINT "donacion_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gasto" ADD CONSTRAINT "gasto_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gasto" ADD CONSTRAINT "gasto_idtipogasto_fkey" FOREIGN KEY ("idtipogasto") REFERENCES "tipogasto"("idtipogasto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historialclinico" ADD CONSTRAINT "historialclinico_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medicamento" ADD CONSTRAINT "medicamento_idinsumo_fkey" FOREIGN KEY ("idinsumo") REFERENCES "insumo"("idinsumo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movimientoinventario" ADD CONSTRAINT "movimientoinventario_idinsumo_fkey" FOREIGN KEY ("idinsumo") REFERENCES "insumo"("idinsumo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movimientoinventario" ADD CONSTRAINT "movimientoinventario_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permiso" ADD CONSTRAINT "permiso_idaccion_fkey" FOREIGN KEY ("idaccion") REFERENCES "accion"("idaccion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permiso" ADD CONSTRAINT "permiso_idrecurso_fkey" FOREIGN KEY ("idrecurso") REFERENCES "recurso"("idrecurso") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personarol" ADD CONSTRAINT "personarol_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personarol" ADD CONSTRAINT "personarol_idrol_fkey" FOREIGN KEY ("idrol") REFERENCES "rol"("idrol") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "postulaciontransito" ADD CONSTRAINT "postulaciontransito_idhogar_fkey" FOREIGN KEY ("idhogar") REFERENCES "hogar"("idhogar") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "postulaciontransito" ADD CONSTRAINT "postulaciontransito_idpersonaaprobo_fkey" FOREIGN KEY ("idpersonaaprobo") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "postulaciontransito" ADD CONSTRAINT "postulaciontransito_idpostulante_fkey" FOREIGN KEY ("idpostulante") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profesionalveterinario" ADD CONSTRAINT "profesionalveterinario_idresponsable_fkey" FOREIGN KEY ("idresponsable") REFERENCES "responsable"("idresponsable") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_idpersonaaprobo_fkey" FOREIGN KEY ("idpersonaaprobo") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_idpersonapublico_fkey" FOREIGN KEY ("idpersonapublico") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registroatencionmedica" ADD CONSTRAINT "registroatencionmedica_idhistorial_fkey" FOREIGN KEY ("idhistorial") REFERENCES "historialclinico"("idhistorial") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registroatencionmedica" ADD CONSTRAINT "registroatencionmedica_idresponsable_fkey" FOREIGN KEY ("idresponsable") REFERENCES "responsable"("idresponsable") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registrodesparasitacion" ADD CONSTRAINT "registrodesparasitacion_idregistro_fkey" FOREIGN KEY ("idregistro") REFERENCES "registroatencionmedica"("idregistro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registroestudio" ADD CONSTRAINT "registroestudio_idregistro_fkey" FOREIGN KEY ("idregistro") REFERENCES "registroatencionmedica"("idregistro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registrotratamiento" ADD CONSTRAINT "registrotratamiento_idregistro_fkey" FOREIGN KEY ("idregistro") REFERENCES "registroatencionmedica"("idregistro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registrovacuna" ADD CONSTRAINT "registrovacuna_idregistro_fkey" FOREIGN KEY ("idregistro") REFERENCES "registroatencionmedica"("idregistro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registrovacuna" ADD CONSTRAINT "registrovacuna_idvacuna_fkey" FOREIGN KEY ("idvacuna") REFERENCES "vacuna"("idvacuna") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rolpermiso" ADD CONSTRAINT "rolpermiso_idpermiso_fkey" FOREIGN KEY ("idpermiso") REFERENCES "permiso"("idpermiso") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rolpermiso" ADD CONSTRAINT "rolpermiso_idrol_fkey" FOREIGN KEY ("idrol") REFERENCES "rol"("idrol") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguimientoadopcion" ADD CONSTRAINT "seguimientoadopcion_idadopcion_fkey" FOREIGN KEY ("idadopcion") REFERENCES "adopcion"("idadopcion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguimientoadopcion" ADD CONSTRAINT "seguimientoadopcion_idresponsable_fkey" FOREIGN KEY ("idresponsable") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitudadopcion" ADD CONSTRAINT "solicitudadopcion_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitudadopcion" ADD CONSTRAINT "solicitudadopcion_idhogar_fkey" FOREIGN KEY ("idhogar") REFERENCES "hogar"("idhogar") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitudadopcion" ADD CONSTRAINT "solicitudadopcion_idpersonaaprobo_fkey" FOREIGN KEY ("idpersonaaprobo") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitudadopcion" ADD CONSTRAINT "solicitudadopcion_idsolicitante_fkey" FOREIGN KEY ("idsolicitante") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transitante" ADD CONSTRAINT "transitante_idestadot_fkey" FOREIGN KEY ("idestadot") REFERENCES "estadotransitante"("idestadot") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transitante" ADD CONSTRAINT "transitante_idpersona_fkey" FOREIGN KEY ("idpersona") REFERENCES "persona"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transito" ADD CONSTRAINT "transito_idanimal_fkey" FOREIGN KEY ("idanimal") REFERENCES "animal"("idanimal") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transito" ADD CONSTRAINT "transito_idtransitante_fkey" FOREIGN KEY ("idtransitante") REFERENCES "transitante"("idpersona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "veterinaria" ADD CONSTRAINT "veterinaria_idresponsable_fkey" FOREIGN KEY ("idresponsable") REFERENCES "responsable"("idresponsable") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "veterinariaservicio" ADD CONSTRAINT "veterinariaservicio_idservicio_fkey" FOREIGN KEY ("idservicio") REFERENCES "servicioofrecido"("idservicio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "veterinariaservicio" ADD CONSTRAINT "veterinariaservicio_idveterinaria_fkey" FOREIGN KEY ("idveterinaria") REFERENCES "veterinaria"("idresponsable") ON DELETE NO ACTION ON UPDATE NO ACTION;

