import { Search, Filter, X } from "lucide-react";

interface FiltrosHogaresProps {
  busqueda: string;
  estado: string;
  localidad: string;
  tipoAnimal: string;

  onBusquedaChange: (value: string) => void;
  onEstadoChange: (value: string) => void;
  onLocalidadChange: (value: string) => void;
  onTipoAnimalChange: (value: string) => void;
  onLimpiar: () => void;
}

export function FiltrosHogares({
  busqueda,
  estado,
  localidad,
  tipoAnimal,
  onBusquedaChange,
  onEstadoChange,
  onLocalidadChange,
  onTipoAnimalChange,
  onLimpiar,
}: FiltrosHogaresProps) {
  return (
    <div className="text-card-foreground">
      <div className="mb-4 flex items-center gap-2 pt-2">
        <Filter size={18} />
        <h3 className="font-semibold text-foreground">
          Buscar hogares
        </h3>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <select
          value={estado}
          onChange={(e) => onEstadoChange(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Todos los estados</option>
          <option value="DISPONIBLE">Disponible</option>
          <option value="OCUPADO">Ocupado</option>
          <option value="PAUSADO">Pausado</option>
          <option value="NO_DISPONIBLE">
            No disponible
          </option>
        </select>

        <select
          value={localidad}
          onChange={(e) => onLocalidadChange(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Todas las localidades</option>
          <option value="Villa Elisa">Villa Elisa</option>
          <option value="City Bell">City Bell</option>
          <option value="Gonnet">Gonnet</option>
          <option value="La Plata">La Plata</option>
        </select>

        <select
          value={tipoAnimal}
          onChange={(e) => onTipoAnimalChange(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Todos los animales</option>
          <option value="PERRO">Perros</option>
          <option value="GATO">Gatos</option>
          <option value="AMBOS">Perros y gatos</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onLimpiar}
        className="mt-3 inline-flex h-6 items-center gap-1 rounded-full border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        <X size={13} />
        Limpiar filtros
      </button>
    </div>
  );
}