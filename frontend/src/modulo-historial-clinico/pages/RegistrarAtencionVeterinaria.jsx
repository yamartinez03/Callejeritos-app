import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
import { registrarAtencionVeterinaria } from "@/shared/data/mockHistorialClinico";

const FORM_INICIAL = {
  fecha: new Date().toISOString().slice(0, 10),
  responsableId: "",
  responsableOtro: "",
  descripcion: "",
  archivo: null,
};

export default function RegistrarAtencionVeterinaria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = getAnimalPorId(id);
  const [form, setForm] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  if (!animal) return <AnimalNoEncontrado />;

  const set = (campo) => (valor) => setForm((f) => ({ ...f, [campo]: valor }));

  function validar() {
    const nuevosErrores = {};
    if (!form.fecha) nuevosErrores.fecha = "La fecha es obligatoria.";
    if (!form.responsableId) nuevosErrores.responsableId = "Elegí una veterinaria o profesional.";
    if (form.responsableId === "OTRO" && !form.responsableOtro.trim())
      nuevosErrores.responsableOtro = "Especificá el nombre.";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return; // 5a. Datos no válidos / 6a. Datos incompletos

    const registro = registrarAtencionVeterinaria(animal.idanimal, form);
    console.log("POST /api/animales/:id/historial/atencion ->", registro);
    setEnviado(true); // "El sistema informa operación exitosa"
    setTimeout(() => navigate(`/animales/${animal.idanimal}/historial/consultar`), 700);
  }

  return (
    <HistorialPageShell
      animal={animal}
      titulo="Registrar atención veterinaria"
      subtitulo="Consulta o chequeo general realizado por una veterinaria o profesional."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CampoFormulario label="Fecha" error={errores.fecha}>
              <Input type="date" value={form.fecha} onChange={(e) => set("fecha")(e.target.value)} />
            </CampoFormulario>

            <div className="hidden sm:block" />

            <ResponsableField
              responsableId={form.responsableId}
              responsableOtro={form.responsableOtro}
              onChangeId={set("responsableId")}
              onChangeOtro={set("responsableOtro")}
              errorId={errores.responsableId}
              errorOtro={errores.responsableOtro}
            />

            <CampoFormulario label="Descripción" error={errores.descripcion} full>
              <Textarea
                rows={3}
                value={form.descripcion}
                onChange={(e) => set("descripcion")(e.target.value)}
                placeholder="Motivo de la consulta, hallazgos, indicaciones..."
              />
            </CampoFormulario>

            <div className="sm:col-span-2">
              <CargarComprobante value={form.archivo} onChange={set("archivo")} />
            </div>
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
