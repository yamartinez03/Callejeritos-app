import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import CampoFormulario from "@/shared/components/CampoFormulario";
import AnimalNoEncontrado from "@/shared/components/AnimalNoEncontrado";
import ResponsableField from "../components/ResponsableField";
import CargarComprobante from "../components/CargarComprobante";
import RegistroCard from "../components/RegistroCard";
import HistorialPageShell from "../components/HistorialPageShell";
import { getAnimalPorId } from "@/shared/data/mockAnimales";
import {
  listarHistorial,
  actualizarRegistro,
  resolverResponsable,
  responsableAFormulario,
  TIPOS_ESTUDIO,
  VACUNAS,
} from "@/shared/data/mockHistorialClinico";
import { getTipoStyle } from "@/lib/historialUtils";

function draftInicial(registro) {
  const base = {
    fecha: registro.fecha.slice(0, 10),
    descripcion: registro.descripcion || "",
    archivo: registro.archivo || null,
    ...responsableAFormulario(registro.responsable),
  };
  switch (registro.tipo) {
    case "VACUNA":
      return {
        ...base,
        nombreVacuna: registro.vacuna.nombre,
        fechaVencimiento: registro.vacuna.fechaVencimiento,
      };
    case "DESPARASITACION":
      return {
        ...base,
        producto: registro.desparasitacion.producto,
        dosis: registro.desparasitacion.dosis,
        proximaAplicacion: registro.desparasitacion.proximaAplicacion,
      };
    case "ESTUDIO":
      return {
        ...base,
        tipoEstudio: registro.estudio.tipoEstudio,
        resultado: registro.estudio.resultado,
      };
    case "TRATAMIENTO":
      return {
        ...base,
        fechaInicio: registro.tratamiento.fechaInicio,
        fechaFin: registro.tratamiento.fechaFin,
        medicacion: registro.tratamiento.medicacion,
      };
    default:
      return base;
  }
}

function validarDraft(tipo, draft) {
  const errores = {};
  if (!draft.fecha) errores.fecha = "La fecha es obligatoria.";
  if (!draft.responsableId)
    errores.responsableId = "Elegí una veterinaria o profesional.";
  if (draft.responsableId === "OTRO" && !draft.responsableOtro.trim())
    errores.responsableOtro = "Especificá el nombre.";
  if (tipo === "ATENCION" || tipo === "TRATAMIENTO") {
    if (!draft.descripcion.trim())
      errores.descripcion = "La descripción es obligatoria.";
  }
  if (tipo === "VACUNA") {
    if (!draft.nombreVacuna) errores.nombreVacuna = "Elegí la vacuna.";
    if (!draft.fechaVencimiento)
      errores.fechaVencimiento = "La fecha de vencimiento es obligatoria.";
  }
  if (tipo === "DESPARASITACION") {
    if (!draft.producto.trim())
      errores.producto = "El producto es obligatorio.";
    if (!draft.dosis.trim()) errores.dosis = "La dosis es obligatoria.";
    if (!draft.proximaAplicacion)
      errores.proximaAplicacion = "La próxima aplicación es obligatoria.";
  }
  if (tipo === "ESTUDIO") {
    if (!draft.tipoEstudio) errores.tipoEstudio = "Elegí el tipo de estudio.";
    if (!draft.resultado.trim())
      errores.resultado = "El resultado es obligatorio.";
  }
  if (tipo === "TRATAMIENTO") {
    if (!draft.fechaInicio)
      errores.fechaInicio = "La fecha de inicio es obligatoria.";
    if (!draft.fechaFin) errores.fechaFin = "La fecha de fin es obligatoria.";
    if (!draft.medicacion.trim())
      errores.medicacion = "La medicación es obligatoria.";
  }
  return errores;
}

function construirCambios(tipo, draft) {
  const responsable = resolverResponsable(draft);
  const comunes = { responsable };
  switch (tipo) {
    case "VACUNA":
      return {
        ...comunes,
        fecha: draft.fecha,
        vacuna: {
          nombre: draft.nombreVacuna,
          fechaVencimiento: draft.fechaVencimiento,
        },
      };
    case "DESPARASITACION":
      return {
        ...comunes,
        fecha: draft.fecha,
        desparasitacion: {
          producto: draft.producto.trim(),
          dosis: draft.dosis.trim(),
          proximaAplicacion: draft.proximaAplicacion,
        },
      };
    case "ESTUDIO":
      return {
        ...comunes,
        fecha: draft.fecha,
        archivo: draft.archivo,
        estudio: {
          tipoEstudio: draft.tipoEstudio,
          resultado: draft.resultado.trim(),
        },
      };
    case "TRATAMIENTO":
      return {
        ...comunes,
        fecha: draft.fecha,
        descripcion: draft.descripcion.trim(),
        archivo: draft.archivo,
        tratamiento: {
          fechaInicio: draft.fechaInicio,
          fechaFin: draft.fechaFin,
          medicacion: draft.medicacion.trim(),
        },
      };
    default: // ATENCION
      return {
        ...comunes,
        fecha: draft.fecha,
        descripcion: draft.descripcion.trim(),
        archivo: draft.archivo,
      };
  }
}

export default function ModificarHistorialClinico() {
  const { id } = useParams();
  const animal = getAnimalPorId(id);
  const [version, setVersion] = useState(0);
  const [editando, setEditando] = useState(null); // idregistro en edición, o null
  const [draft, setDraft] = useState(null);
  const [errores, setErrores] = useState({});

  if (!animal) return <AnimalNoEncontrado />;

  const registros = listarHistorial(animal.idanimal); // se recalcula en cada render; `version` fuerza el remount de la lista tras guardar

  function abrirEdicion(registro) {
    setEditando(registro.idregistro);
    setDraft(draftInicial(registro));
    setErrores({});
  }

  function cancelarEdicion() {
    setEditando(null);
    setDraft(null);
    setErrores({});
  }

  function guardar(registro) {
    const erroresDraft = validarDraft(registro.tipo, draft);
    if (Object.keys(erroresDraft).length) {
      setErrores(erroresDraft);
      return; // 6a. Datos no válidos / 7a. Datos incompletos
    }
    const cambios = construirCambios(registro.tipo, draft);
    actualizarRegistro(animal.idanimal, registro.idregistro, cambios);
    setVersion((v) => v + 1);
    cancelarEdicion();
  }

  return (
    <HistorialPageShell
      animal={animal}
      titulo="Modificar historial clínico"
      subtitulo="Elegí “Editar” en el registro que querés modificar."
    >
      <Link to={`/animales/${animal.idanimal}/historial/consultar`}>
        <Button variant="outline">
          <X />
          Cancelar
        </Button>
      </Link>
      {registros.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/40 py-12 text-center text-muted-foreground">
          Todavía no hay registros en el historial clínico de este animal.
        </div>
      ) : (
        <div className="space-y-3" key={version}>
          {registros.map((registro) =>
            editando === registro.idregistro ? (
              <FormularioEdicion
                key={registro.idregistro}
                registro={registro}
                draft={draft}
                setDraft={setDraft}
                errores={errores}
                onGuardar={() => guardar(registro)}
                onCancelar={cancelarEdicion}
              />
            ) : (
              <RegistroCard
                key={registro.idregistro}
                registro={registro}
                accionesExtra={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1.5 px-2"
                    onClick={() => abrirEdicion(registro)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </Button>
                }
              />
            ),
          )}
        </div>
      )}
    </HistorialPageShell>
  );
}

function FormularioEdicion({
  registro,
  draft,
  setDraft,
  errores,
  onGuardar,
  onCancelar,
}) {
  const estilo = getTipoStyle(registro.tipo);
  const set = (campo) => (valor) => setDraft((d) => ({ ...d, [campo]: valor }));

  return (
    <Card className="border-primary/40">
      <CardContent className="space-y-4">
        <span
          className={`inline-block w-fit rounded-full px-2.5 py-1 text-xs font-medium ${estilo.className}`}
        >
          {estilo.label}
        </span>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CampoFormulario label="Fecha" error={errores.fecha}>
            <Input
              type="date"
              value={draft.fecha}
              onChange={(e) => set("fecha")(e.target.value)}
            />
          </CampoFormulario>

          {(registro.tipo === "ATENCION" ||
            registro.tipo === "TRATAMIENTO") && (
            <div className="hidden sm:block" />
          )}

          <ResponsableField
            responsableId={draft.responsableId}
            responsableOtro={draft.responsableOtro}
            onChangeId={set("responsableId")}
            onChangeOtro={set("responsableOtro")}
            errorId={errores.responsableId}
            errorOtro={errores.responsableOtro}
          />

          {(registro.tipo === "ATENCION" ||
            registro.tipo === "TRATAMIENTO") && (
            <CampoFormulario
              label="Descripción"
              error={errores.descripcion}
              full
            >
              <Textarea
                rows={2}
                value={draft.descripcion}
                onChange={(e) => set("descripcion")(e.target.value)}
              />
            </CampoFormulario>
          )}

          {registro.tipo === "VACUNA" && (
            <>
              <CampoFormulario label="Vacuna" error={errores.nombreVacuna}>
                <Select
                  value={draft.nombreVacuna}
                  onValueChange={set("nombreVacuna")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VACUNAS.map((v) => (
                      <SelectItem key={v.idvacuna} value={v.nombre}>
                        {v.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CampoFormulario>
              <CampoFormulario
                label="Fecha de vencimiento"
                error={errores.fechaVencimiento}
              >
                <Input
                  type="date"
                  value={draft.fechaVencimiento}
                  onChange={(e) => set("fechaVencimiento")(e.target.value)}
                />
              </CampoFormulario>
            </>
          )}

          {registro.tipo === "DESPARASITACION" && (
            <>
              <CampoFormulario label="Producto" error={errores.producto}>
                <Input
                  value={draft.producto}
                  onChange={(e) => set("producto")(e.target.value)}
                />
              </CampoFormulario>
              <CampoFormulario label="Dosis" error={errores.dosis}>
                <Input
                  value={draft.dosis}
                  onChange={(e) => set("dosis")(e.target.value)}
                />
              </CampoFormulario>
              <CampoFormulario
                label="Próxima aplicación"
                error={errores.proximaAplicacion}
              >
                <Input
                  type="date"
                  value={draft.proximaAplicacion}
                  onChange={(e) => set("proximaAplicacion")(e.target.value)}
                />
              </CampoFormulario>
            </>
          )}

          {registro.tipo === "ESTUDIO" && (
            <>
              <CampoFormulario
                label="Tipo de estudio"
                error={errores.tipoEstudio}
              >
                <Select
                  value={draft.tipoEstudio}
                  onValueChange={set("tipoEstudio")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_ESTUDIO.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CampoFormulario>
              <CampoFormulario label="Resultado" error={errores.resultado} full>
                <Textarea
                  rows={2}
                  value={draft.resultado}
                  onChange={(e) => set("resultado")(e.target.value)}
                />
              </CampoFormulario>
              <div className="sm:col-span-2">
                <CargarComprobante
                  label="Archivo"
                  value={draft.archivo}
                  onChange={set("archivo")}
                />
              </div>
            </>
          )}

          {registro.tipo === "TRATAMIENTO" && (
            <>
              <CampoFormulario
                label="Fecha de inicio"
                error={errores.fechaInicio}
              >
                <Input
                  type="date"
                  value={draft.fechaInicio}
                  onChange={(e) => set("fechaInicio")(e.target.value)}
                />
              </CampoFormulario>
              <CampoFormulario label="Fecha de fin" error={errores.fechaFin}>
                <Input
                  type="date"
                  value={draft.fechaFin}
                  onChange={(e) => set("fechaFin")(e.target.value)}
                />
              </CampoFormulario>
              <CampoFormulario
                label="Medicación"
                error={errores.medicacion}
                full
              >
                <Input
                  value={draft.medicacion}
                  onChange={(e) => set("medicacion")(e.target.value)}
                />
              </CampoFormulario>
              <div className="sm:col-span-2">
                <CargarComprobante
                  label="Archivo"
                  value={draft.archivo}
                  onChange={set("archivo")}
                />
              </div>
            </>
          )}

          {registro.tipo === "ATENCION" && (
            <div className="sm:col-span-2">
              <CargarComprobante
                label="Comprobante"
                value={draft.archivo}
                onChange={set("archivo")}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-border pt-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={onCancelar}
          >
            <X className="h-3.5 w-3.5" />
            Cancelar
          </Button>
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            onClick={onGuardar}
          >
            <Check className="h-3.5 w-3.5" />
            Guardar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
