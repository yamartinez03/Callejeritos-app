import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CampoFormulario from "@/shared/components/CampoFormulario";
import AnimalNoEncontrado from "@/shared/components/AnimalNoEncontrado";
import ResponsableField from "../components/ResponsableField";
import CargarComprobante from "../components/CargarComprobante";
import HistorialPageShell from "../components/HistorialPageShell";
import { getAnimalPorId } from "@/shared/data/mockAnimales";
import { registrarEstudios, TIPOS_ESTUDIO } from "@/shared/data/mockHistorialClinico";

const BLOQUE_INICIAL = () => ({
  key: crypto.randomUUID(),
  fecha: new Date().toISOString().slice(0, 10),
  responsableId: "",
  responsableOtro: "",
  tipoEstudio: "",
  resultado: "",
  archivo: null,
});

export default function RegistrarEstudio() {
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
      if (!b.tipoEstudio) e.tipoEstudio = "Elegí el tipo de estudio.";
      if (!b.resultado.trim()) e.resultado = "El resultado es obligatorio.";
      if (Object.keys(e).length) nuevosErrores[b.key] = e;
    });
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;

    const registros = registrarEstudios(animal.idanimal, bloques);
    console.log("POST /api/animales/:id/historial/estudio ->", registros);
    setEnviado(true);
    setTimeout(() => navigate(`/animales/${animal.idanimal}/historial/consultar`), 700);
  }

  return (
    <HistorialPageShell
      animal={animal}
      titulo="Registrar estudio"
      subtitulo="Podés cargar varios estudios a la vez con “Agregar otro estudio”."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {bloques.map((b, i) => {
          const err = errores[b.key] ?? {};
          return (
            <Card key={b.key}>
              <CardContent className="space-y-4">
                {bloques.length > 1 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Estudio {i + 1}</p>
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

                  <CampoFormulario label="Tipo de estudio" error={err.tipoEstudio}>
                    <Select value={b.tipoEstudio} onValueChange={(v) => actualizarBloque(b.key, "tipoEstudio", v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccioná una opción" />
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

                  <ResponsableField
                    responsableId={b.responsableId}
                    responsableOtro={b.responsableOtro}
                    onChangeId={(v) => actualizarBloque(b.key, "responsableId", v)}
                    onChangeOtro={(v) => actualizarBloque(b.key, "responsableOtro", v)}
                    errorId={err.responsableId}
                    errorOtro={err.responsableOtro}
                  />

                  <CampoFormulario label="Resultado" error={err.resultado} full>
                    <Textarea
                      rows={3}
                      value={b.resultado}
                      onChange={(e) => actualizarBloque(b.key, "resultado", e.target.value)}
                      placeholder="Resultado del estudio..."
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
          Agregar otro estudio
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