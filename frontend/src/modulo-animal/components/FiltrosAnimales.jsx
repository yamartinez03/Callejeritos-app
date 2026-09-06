import { RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ESPECIES, VETERINARIAS, RESPONSABLES_HOGAR, ESTADOS_ANIMAL } from "@/shared/data/mockAnimales";

/**
 * Panel de filtros avanzados. Es "controlado": recibe el estado actual y
 * un callback para actualizarlo, para que ListaAnimales sea la única
 * fuente de verdad (y pueda combinarlo con el buscador y los tabs rápidos).
 */
export default function FiltrosAnimales({ filtros, onChange, onReset }) {
  const set = (campo) => (valor) => onChange({ ...filtros, [campo]: valor });
 
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Especie / raza */}
        <div className="space-y-1.5">
          <Label>Especie / raza</Label>
          <Select value={filtros.especie} onValueChange={set("especie")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODAS">Todas</SelectItem>
              {ESPECIES.map((e) => (
                <SelectItem key={e.idespecie} value={String(e.idespecie)}>
                  {e.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
 
        {/* Sexo */}
        <div className="space-y-1.5">
          <Label>Sexo</Label>
          <Select value={filtros.sexo} onValueChange={set("sexo")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="MACHO">Macho</SelectItem>
              <SelectItem value="HEMBRA">Hembra</SelectItem>
            </SelectContent>
          </Select>
        </div>
 
        {/* Estado */}
        <div className="space-y-1.5">
          <Label>Estado</Label>
          <Select value={filtros.estado} onValueChange={set("estado")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              {ESTADOS_ANIMAL.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
 
        {/* Edad (rango) */}
        <div className="space-y-1.5">
          <Label>Edad (años)</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Mín."
              value={filtros.edadMin}
              onChange={(e) => set("edadMin")(e.target.value)}
            />
            <span className="shrink-0 text-muted-foreground">–</span>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Máx."
              value={filtros.edadMax}
              onChange={(e) => set("edadMax")(e.target.value)}
            />
          </div>
        </div>
 
        {/* Color de pelaje */}
        <div className="space-y-1.5">
          <Label>Color de pelaje</Label>
          <Input
            placeholder="Ej: Dorado, Negro..."
            value={filtros.color}
            onChange={(e) => set("color")(e.target.value)}
          />
        </div>
 
        {/* Veterinaria */}
        <div className="space-y-1.5">
          <Label>Veterinaria</Label>
          <Select value={filtros.veterinaria} onValueChange={set("veterinaria")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODAS">Todas</SelectItem>
              {VETERINARIAS.map((v) => (
                <SelectItem key={v.idresponsable} value={String(v.idresponsable)}>
                  {v.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
 
        {/* Transitante / adoptante */}
        <div className="space-y-1.5">
          <Label>Transitante / adoptante</Label>
          <Select value={filtros.responsable} onValueChange={set("responsable")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              {RESPONSABLES_HOGAR.map((r) => (
                <SelectItem key={r.idpersona} value={String(r.idpersona)}>
                  {r.nombre} ({r.tipo === "TRANSITANTE" ? "Transitante" : "Adoptante"})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
 
        {/* Lugar de rescate */}
        <div className="space-y-1.5">
          <Label>Lugar de rescate</Label>
          <Input
            placeholder="Ej: Tolosa, La Plata"
            value={filtros.lugarOrigen}
            onChange={(e) => set("lugarOrigen")(e.target.value)}
          />
        </div>
      </div>
 
      <div className="mt-4 flex justify-end border-t border-border pt-3">
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={onReset}>
          <RotateCcw className="h-3.5 w-3.5" />
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
}
 