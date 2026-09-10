import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CampoFormulario from "@/shared/components/CampoFormulario";
import AnimalNoEncontrado from "@/shared/components/AnimalNoEncontrado";
import ResponsableField from "../components/ResponsableField";
import HistorialPageShell from "../components/HistorialPageShell";
import { getAnimalPorId } from "@/shared/data/mockAnimales";
import { registrarVacunaciones, VACUNAS } from "@/shared/data/mockHistorialClinico";

const BLOQUE_INICIAL = () => ({
  key: crypto.randomUUID(),
  nombreVacuna: "",
  fechaAplicacion: new Date().toISOString().slice(0, 10),
  fechaVencimiento: "",
  responsableId: "",
  responsableOtro: "",
});

export default function RegistrarVacunacion() {
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
      if (!b.nombreVacuna) e.nombreVacuna = "Elegí la vacuna aplicada.";
      if (!b.fechaAplicacion) e.fechaAplicacion = "La fecha de aplicación es obligatoria.";
      if (!b.fechaVencimiento) e.fechaVencimiento = "La fecha de vencimiento es obligatoria.";
      if (b.fechaAplicacion && b.fechaVencimiento && b.fechaVencimiento <= b.fechaAplicacion)
        e.fechaVencimiento = "Debe ser posterior a la fecha de aplicación.";
      if (!b.responsableId) e.responsableId = "Elegí una veterinaria o profesional.";
      if (b.responsableId === "OTRO" && !b.responsableOtro.trim()) e.responsableOtro = "Especificá el nombre.";
      if (Object.keys(e).length) nuevosErrores[b.key] = e;
    });
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;

    const registros = registrarVacunaciones(animal.idanimal, bloques);
    console.log("POST /api/animales/:id/historial/vacunacion ->", registros);
    setEnviado(true);
    setTimeout(() => navigate(`/animales/${animal.idanimal}/historial/consultar`), 700);
  }

  return (
    <HistorialPageShell
      animal={animal}
      titulo="Registrar vacunación"
      subtitulo="Podés cargar varias vacunas a la vez con “Otra vacunación”."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {bloques.map((b, i) => {
          const err = errores[b.key] ?? {};
          return (
            <Card key={b.key}>
              <CardContent className="space-y-4">
                {bloques.length > 1 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Vacuna {i + 1}</p>
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
                  <CampoFormulario label="Nombre de la vacuna" error={err.nombreVacuna} full>
                    <Select
                      value={b.nombreVacuna}
                      onValueChange={(v) => actualizarBloque(b.key, "nombreVacuna", v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccioná una opción" />
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

                  <CampoFormulario label="Fecha de aplicación" error={err.fechaAplicacion}>
                    <Input
                      type="date"
                      value={b.fechaAplicacion}
                      onChange={(e) => actualizarBloque(b.key, "fechaAplicacion", e.target.value)}
                    />
                  </CampoFormulario>

                  <CampoFormulario label="Fecha de vencimiento" error={err.fechaVencimiento}>
                    <Input
                      type="date"
                      value={b.fechaVencimiento}
                      onChange={(e) => actualizarBloque(b.key, "fechaVencimiento", e.target.value)}
                    />
                  </CampoFormulario>

                  <ResponsableField
                    responsableId={b.responsableId}
                    responsableOtro={b.responsableOtro}
                    onChangeId={(v) => actualizarBloque(b.key, "responsableId", v)}
                    onChangeOtro={(v) => actualizarBloque(b.key, "responsableOtro", v)}
                    errorId={err.responsableId}
                    errorOtro={err.responsableOtro}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={agregarBloque}>
          <Plus className="h-3.5 w-3.5" />
          Otra vacunación
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