import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import CampoFormulario from "@/shared/components/CampoFormulario";
import AnimalNoEncontrado from "@/shared/components/AnimalNoEncontrado";
import ResponsableField from "../components/ResponsableField";
import HistorialPageShell from "../components/HistorialPageShell";
import { getAnimalPorId } from "@/shared/data/mockAnimales";
import { registrarDesparasitacion, tieneDesparasitacionVigente, listarHistorial } from "@/shared/data/mockHistorialClinico";
import { formatFecha } from "@/lib/historialUtils";

const FORM_INICIAL = {
  producto: "",
  dosis: "",
  fechaAplicacion: new Date().toISOString().slice(0, 10),
  proximaAplicacion: "",
  responsableId: "",
  responsableOtro: "",
};

export default function RegistrarDesparasitacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = getAnimalPorId(id);
  const [form, setForm] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  if (!animal) return <AnimalNoEncontrado />;

  // Precondición: no existe una desparasitación vigente vinculada al animal.
  if (tieneDesparasitacionVigente(animal.idanimal)) {
    const vigente = listarHistorial(animal.idanimal).find(
      (r) => r.tipo === "DESPARASITACION" && new Date(r.desparasitacion.proximaAplicacion) >= new Date()
    );
    return (
      <HistorialPageShell animal={animal} titulo="Registrar desparasitación">
        <Card className="border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
          <CardContent className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-500" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                {animal.nombre} ya tiene una desparasitación vigente.
              </p>
              <p className="text-sm text-muted-foreground">
                Próxima aplicación registrada: {formatFecha(vigente?.desparasitacion.proximaAplicacion)}. No se
                puede cargar una nueva hasta que venza o se modifique el registro existente.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link to={`/animales/${animal.idanimal}/historial/consultar`}>Ver historial clínico</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </HistorialPageShell>
    );
  }

  const set = (campo) => (valor) => setForm((f) => ({ ...f, [campo]: valor }));

  function validar() {
    const nuevosErrores = {};
    if (!form.producto.trim()) nuevosErrores.producto = "El producto es obligatorio.";
    if (!form.dosis.trim()) nuevosErrores.dosis = "La dosis es obligatoria.";
    if (!form.fechaAplicacion) nuevosErrores.fechaAplicacion = "La fecha de aplicación es obligatoria.";
    if (!form.proximaAplicacion) nuevosErrores.proximaAplicacion = "La próxima aplicación es obligatoria.";
    if (form.fechaAplicacion && form.proximaAplicacion && form.proximaAplicacion <= form.fechaAplicacion)
      nuevosErrores.proximaAplicacion = "Debe ser posterior a la fecha de aplicación.";
    if (!form.responsableId) nuevosErrores.responsableId = "Elegí una veterinaria o profesional.";
    if (form.responsableId === "OTRO" && !form.responsableOtro.trim())
      nuevosErrores.responsableOtro = "Especificá el nombre.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;

    const registro = registrarDesparasitacion(animal.idanimal, form);
    console.log("POST /api/animales/:id/historial/desparasitacion ->", registro);
    setEnviado(true);
    setTimeout(() => navigate(`/animales/${animal.idanimal}/historial/consultar`), 700);
  }

  return (
    <HistorialPageShell animal={animal} titulo="Registrar desparasitación">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CampoFormulario label="Producto" error={errores.producto}>
              <Input
                value={form.producto}
                onChange={(e) => set("producto")(e.target.value)}
                placeholder="Ej: Drontal Plus"
              />
            </CampoFormulario>

            <CampoFormulario label="Dosis" error={errores.dosis}>
              <Input
                value={form.dosis}
                onChange={(e) => set("dosis")(e.target.value)}
                placeholder="Ej: 1 comprimido cada 10kg"
              />
            </CampoFormulario>

            <CampoFormulario label="Fecha de aplicación" error={errores.fechaAplicacion}>
              <Input
                type="date"
                value={form.fechaAplicacion}
                onChange={(e) => set("fechaAplicacion")(e.target.value)}
              />
            </CampoFormulario>

            <CampoFormulario label="Próxima aplicación" error={errores.proximaAplicacion}>
              <Input
                type="date"
                value={form.proximaAplicacion}
                onChange={(e) => set("proximaAplicacion")(e.target.value)}
              />
            </CampoFormulario>

            <ResponsableField
              responsableId={form.responsableId}
              responsableOtro={form.responsableOtro}
              onChangeId={set("responsableId")}
              onChangeOtro={set("responsableOtro")}
              errorId={errores.responsableId}
              errorOtro={errores.responsableOtro}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button type="button" variant="outline" asChild>
            <Link to={`/animales/${animal.idanimal}/historial`}>Cancelar</Link>
          </Button>
          <Button type="submit">{enviado ? "Registrado ✓" : "Guardar"}</Button>
        </div>
      </form>
    </HistorialPageShell>
  );
}