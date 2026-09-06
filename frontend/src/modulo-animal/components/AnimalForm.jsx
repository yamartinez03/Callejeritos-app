import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ESPECIES, ESTADOS_ANIMAL, VETERINARIAS, RESPONSABLES_HOGAR } from "@/shared/data/mockAnimales";
import { FORM_INICIAL } from "#lib/animalUtils.js";
 
/**
 * Formulario controlado, usado tanto para crear como para editar un animal.
 * El componente sólo valida y junta los datos; quien lo use decide qué hacer
 * con ellos en `onSubmit` (crearAnimal / editarAnimal en mockAnimales.js).
 */

export default function AnimalForm({
  valoresIniciales = FORM_INICIAL,
  onSubmit,
  submitLabel = "Guardar animal",
  cancelarHref = "/animales",
}) {
  const [form, setForm] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
 
  const set = (campo) => (valor) => setForm((f) => ({ ...f, [campo]: valor }));
 
  function validar() {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.idespecie) nuevosErrores.idespecie = "Elegí una especie/raza.";
    if (form.edadestimada === "" || Number(form.edadestimada) < 0)
      nuevosErrores.edadestimada = "Ingresá una edad estimada válida.";
    if (!form.colorpelaje.trim()) nuevosErrores.colorpelaje = "El color de pelaje es obligatorio.";
    if (form.peso === "" || Number(form.peso) <= 0) nuevosErrores.peso = "Ingresá un peso válido.";
    if (!form.lugarorigen.trim()) nuevosErrores.lugarorigen = "El lugar de rescate es obligatorio.";
    if (!form.fechaingreso) nuevosErrores.fechaingreso = "La fecha de ingreso es obligatoria.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }
 
  function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;
    onSubmit(form);
  }
 
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Card>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Campo label="Nombre" error={errores.nombre}>
            <Input value={form.nombre} onChange={(e) => set("nombre")(e.target.value)} placeholder="Ej: Luna" />
          </Campo>
 
          <Campo label="Especie / raza" error={errores.idespecie}>
            <Select value={form.idespecie} onValueChange={set("idespecie")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccioná una opción" />
              </SelectTrigger>
              <SelectContent>
                {ESPECIES.map((e) => (
                  <SelectItem key={e.idespecie} value={String(e.idespecie)}>
                    {e.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Campo>
 
          <Campo label="Sexo">
            <Select value={form.sexo} onValueChange={set("sexo")}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MACHO">Macho</SelectItem>
                <SelectItem value="HEMBRA">Hembra</SelectItem>
              </SelectContent>
            </Select>
          </Campo>
 
          <Campo label="Edad estimada (años)" error={errores.edadestimada}>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              value={form.edadestimada}
              onChange={(e) => set("edadestimada")(e.target.value)}
              placeholder="Ej: 3"
            />
          </Campo>
 
          <Campo label="Color de pelaje" error={errores.colorpelaje}>
            <Input
              value={form.colorpelaje}
              onChange={(e) => set("colorpelaje")(e.target.value)}
              placeholder="Ej: Blanco y marrón"
            />
          </Campo>
 
          <Campo label="Peso (kg)" error={errores.peso}>
            <Input
              type="number"
              min={0}
              step="0.1"
              inputMode="decimal"
              value={form.peso}
              onChange={(e) => set("peso")(e.target.value)}
              placeholder="Ej: 8.5"
            />
          </Campo>
 
          <Campo label="Estado">
            <Select value={form.estado} onValueChange={set("estado")}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ESTADOS_ANIMAL.map((e) => (
                  <SelectItem key={e.value} value={e.value}>
                    {e.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Campo>
 
          <Campo label="Fecha de ingreso" error={errores.fechaingreso}>
            <Input type="date" value={form.fechaingreso} onChange={(e) => set("fechaingreso")(e.target.value)} />
          </Campo>
 
          <Campo label="Lugar de rescate" error={errores.lugarorigen} full>
            <Textarea
              rows={2}
              value={form.lugarorigen}
              onChange={(e) => set("lugarorigen")(e.target.value)}
              placeholder="Ej: Av. Rivadavia 4500, CABA"
            />
          </Campo>
 
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
            <Label htmlFor="castrado" className="cursor-pointer">
              Castrado/a
            </Label>
            <Switch id="castrado" checked={form.castrado} onCheckedChange={set("castrado")} />
          </div>
 
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
            <Label htmlFor="lactante" className="cursor-pointer">
              Lactante
            </Label>
            <Switch id="lactante" checked={form.lactante} onCheckedChange={set("lactante")} />
          </div>
        </CardContent>
      </Card>
 
      {/* Datos opcionales de asignación (no pertenecen al modelo Animal:
          se guardarían como registros de Transito/Adopcion + Veterinaria) */}
      <Card>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Campo label="Veterinaria asignada (opcional)">
            <Select value={form.veterinariaId} onValueChange={set("veterinariaId")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sin asignar" />
              </SelectTrigger>
              <SelectContent>
                {VETERINARIAS.map((v) => (
                  <SelectItem key={v.idresponsable} value={String(v.idresponsable)}>
                    {v.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Campo>
 
          <Campo label="Transitante / adoptante (opcional)">
            <Select value={form.responsableId} onValueChange={set("responsableId")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sin asignar" />
              </SelectTrigger>
              <SelectContent>
                {RESPONSABLES_HOGAR.map((r) => (
                  <SelectItem key={r.idpersona} value={String(r.idpersona)}>
                    {r.nombre} ({r.tipo === "TRANSITANTE" ? "Transitante" : "Adoptante"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Campo>
        </CardContent>
      </Card>
 
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button type="button" variant="outline" asChild>
          <Link to={cancelarHref}>Cancelar</Link>
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
 
function Campo({ label, error, full, children }) {
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
 