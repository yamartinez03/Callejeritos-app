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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Filter size={18} />
        <h3 className="font-semibold text-gray-800">
          Buscar hogares
        </h3>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-green-500"
          />
        </div>

        <select
          value={estado}
          onChange={(e) => onEstadoChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-500"
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
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-500"
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
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-500"
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
        className="mt-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
      >
        <X size={15} />
        Limpiar filtros
      </button>
    </div>
  );
}