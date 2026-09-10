import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimalNoEncontrado from "@/shared/components/AnimalNoEncontrado";
import RegistroCard from "../components/RegistroCard";
import HistorialPageShell from "../components/HistorialPageShell";
import { getAnimalPorId } from "@/shared/data/mockAnimales";
import {
  listarHistorial,
  TIPOS_ATENCION,
} from "@/shared/data/mockHistorialClinico";

export default function ConsultarHistorialClinico() {
  const { id } = useParams();
  const animal = getAnimalPorId(id);
  const [filtroTipo, setFiltroTipo] = useState("TODOS");

  if (!animal) return <AnimalNoEncontrado />;

  const registros = listarHistorial(animal.idanimal);
  const registrosFiltrados = useMemo(
    () =>
      filtroTipo === "TODOS"
        ? registros
        : registros.filter((r) => r.tipo === filtroTipo),
    [registros, filtroTipo],
  );

  return (
    <HistorialPageShell
      animal={animal}
      titulo="Historial clínico"
      subtitulo={`${registros.length} ${registros.length === 1 ? "registro" : "registros"} en total.`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-56">
          <Select value={filtroTipo} onValueChange={setFiltroTipo}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un tipo">
                {filtroTipo === "TODOS"
                  ? "Todos los tipos"
                  : TIPOS_ATENCION.find((t) => t.value === filtroTipo)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos los tipos</SelectItem>
              {TIPOS_ATENCION.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Link to={`/animales/${animal.idanimal}/historial/modificar`}>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Modificar registros
          </Button>
        </Link>
      </div>

      {registrosFiltrados.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/40 py-12 text-center text-muted-foreground">
          {registros.length === 0
            ? "Todavía no hay registros en el historial clínico de este animal."
            : "No hay registros que coincidan con el filtro seleccionado."}
        </div>
      ) : (
        <div className="space-y-3">
          {registrosFiltrados.map((registro) => (
            <RegistroCard key={registro.idregistro} registro={registro} />
          ))}
        </div>
      )}
    </HistorialPageShell>
  );
}
