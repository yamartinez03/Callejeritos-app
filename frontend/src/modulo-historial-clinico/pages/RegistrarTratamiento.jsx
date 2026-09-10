import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import CampoFormulario from "@/shared/components/CampoFormulario";
import AnimalNoEncontrado from "@/shared/components/AnimalNoEncontrado";
import ResponsableField from "../components/ResponsableField";
import CargarComprobante from "../components/CargarComprobante";
import HistorialPageShell from "../components/HistorialPageShell";
import { getAnimalPorId } from "@/shared/data/mockAnimales";
import { registrarTratamientos } from "@/shared/data/mockHistorialClinico";

const BLOQUE_INICIAL = () => ({
  key: crypto.randomUUID(),
  fecha: new Date().toISOString().slice(0, 10),
  responsableId: "",
  responsableOtro: "",
  descripcion: "",
  fechaInicio: new Date().toISOString().slice(0, 10),
  fechaFin: "",
  medicacion: "",
  archivo: null,
});

export default function RegistrarTratamiento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = getAnimalPorId(id);
  const [bloques, setBloques] = useState([BLOQUE_INICIAL()]);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  if (!animal) return <AnimalNoEncontrado />;

  function actualizarBloque(key, campo, valor) {
    setBloques((bs) => bs.map((b) => (b.key === key ? { ...b, [campo]: valor } : b)));
  }

  function agregarBloque() {
    setBloques((bs) => [...bs, BLOQUE_INICIAL()]);
  }

  function quitarBloque(key) {
    setBloques((bs) => bs.filter((b) => b.key !== key));
    setErrores((e) => ({ ...e, [key]: undefined }));
  }

  function validar() {
    const nuevosErrores = {};
    bloques.forEach((b) => {
      const e = {};
      if (!b.fecha) e.fecha = "La fecha es obligatoria.";
      if (!b.responsableId) e.responsableId = "Elegí una veterinaria o profesional.";
      if (b.responsableId === "OTRO" && !b.responsableOtro.trim()) e.responsableOtro = "Especificá el nombre.";
      if (!b.descripcion.trim()) e.descripcion = "La descripción es obligatoria.";
      if (!b.fechaInicio) e.fechaInicio = "La fecha de inicio es obligatoria.";
      if (!b.fechaFin) e.fechaFin = "La fecha de fin es obligatoria.";
      if (b.fechaInicio && b.fechaFin && b.fechaFin < b.fechaInicio)
        e.fechaFin = "Debe ser igual o posterior a la fecha de inicio.";
      if (!b.medicacion.trim()) e.medicacion = "La medicación es obligatoria.";
      if (Object.keys(e).length) nuevosErrores[b.key] = e;
    });
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;

    const registros = registrarTratamientos(animal.idanimal, bloques);
    console.log("POST /api/animales/:id/historial/tratamiento ->", registros);
    setEnviado(true);
    setTimeout(() => navigate(`/animales/${animal.idanimal}/historial/consultar`), 700);
  }

  return (
    <HistorialPageShell
      animal={animal}
      titulo="Registrar tratamiento"
      subtitulo="Podés cargar varios tratamientos a la vez con “Otro tratamiento”."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {bloques.map((b, i) => {
          const err = errores[b.key] ?? {};
          return (
            <Card key={b.key}>
              <CardContent className="space-y-4">
                {bloques.length > 1 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Tratamiento {i + 1}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-destructive hover:text-destructive"
                      onClick={() => quitarBloque(b.key)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Quitar
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <CampoFormulario label="Fecha" error={err.fecha}>
                    <Input
                      type="date"
                      value={b.fecha}
                      onChange={(e) => actualizarBloque(b.key, "fecha", e.target.value)}
                    />
                  </CampoFormulario>

                  <div className="hidden sm:block" />

                  <ResponsableField
                    responsableId={b.responsableId}
                    responsableOtro={b.responsableOtro}
                    onChangeId={(v) => actualizarBloque(b.key, "responsableId", v)}
                    onChangeOtro={(v) => actualizarBloque(b.key, "responsableOtro", v)}
                    errorId={err.responsableId}
                    errorOtro={err.responsableOtro}
                  />

                  <CampoFormulario label="Descripción" error={err.descripcion} full>
                    <Textarea
                      rows={2}
                      value={b.descripcion}
                      onChange={(e) => actualizarBloque(b.key, "descripcion", e.target.value)}
                      placeholder="Ej: Otitis en oído izquierdo"
                    />
                  </CampoFormulario>

                  <CampoFormulario label="Fecha de inicio" error={err.fechaInicio}>
                    <Input
                      type="date"
                      value={b.fechaInicio}
                      onChange={(e) => actualizarBloque(b.key, "fechaInicio", e.target.value)}
                    />
                  </CampoFormulario>

                  <CampoFormulario label="Fecha de fin" error={err.fechaFin}>
                    <Input
                      type="date"
                      value={b.fechaFin}
                      onChange={(e) => actualizarBloque(b.key, "fechaFin", e.target.value)}
                    />
                  </CampoFormulario>

                  <CampoFormulario label="Medicación" error={err.medicacion} full>
                    <Input
                      value={b.medicacion}
                      onChange={(e) => actualizarBloque(b.key, "medicacion", e.target.value)}
                      placeholder="Ej: Otomax, 2 gotas cada 12hs"
                    />
                  </CampoFormulario>

                  <div className="sm:col-span-2">
                    <CargarComprobante
                      label="Archivo"
                      value={b.archivo}
                      onChange={(v) => actualizarBloque(b.key, "archivo", v)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={agregarBloque}>
          <Plus className="h-3.5 w-3.5" />
          Otro tratamiento
        </Button>

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end">
          <Button type="button" variant="outline" asChild>
            <Link to={`/animales/${animal.idanimal}/historial`}>Cancelar</Link>
          </Button>
          <Button type="submit">{enviado ? "Registrado ✓" : "Guardar"}</Button>
        </div>
      </form>
    </HistorialPageShell>
  );
}