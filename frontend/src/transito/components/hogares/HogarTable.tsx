import {
  Eye,
  Pencil,
  Plus,
  MapPin,
  Dog,
  Cat,
} from "lucide-react";
import type { HogarTransito } from "../../types/transito";
import { HogarStatusBadge } from "./HogarStatusBadge";
import { CapacityBar } from "./CapacityBar";


interface HogarTableProps {
  hogares: HogarTransito[];

  onVer: (hogar: HogarTransito) => void;
  onEditar: (hogar: HogarTransito) => void;
  onRegistrarTransito: (hogar: HogarTransito) => void;
}

export function HogarTable({
  hogares,
  onVer,
  onEditar,
  onRegistrarTransito,
}: HogarTableProps) {
  if (hogares.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <p className="font-medium text-gray-700">
          No se encontraron hogares
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Probá modificando los filtros de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-5 py-4 font-semibold text-gray-700">
                Transitario
              </th>

              <th className="px-5 py-4 font-semibold text-gray-700">
                Zona
              </th>

              <th className="px-5 py-4 font-semibold text-gray-700">
                Acepta
              </th>

              <th className="px-5 py-4 font-semibold text-gray-700">
                Capacidad
              </th>

              <th className="px-5 py-4 font-semibold text-gray-700">
                Estado
              </th>

              <th className="px-5 py-4 text-right font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {hogares.map((hogar) => (
              <tr
                key={hogar.id}
                className="transition hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      {hogar.nombreTransitante}{" "}
                      {hogar.apellidoTransitante}
                    </p>

                    <p className="text-xs text-gray-500">
                      {hogar.telefono}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin size={15} />
                    {hogar.localidad}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    {(hogar.tipoAnimal === "PERRO" ||
                      hogar.tipoAnimal === "AMBOS") && (
                      <span
                        title="Perros"
                        className="rounded-lg bg-gray-100 p-2"
                      >
                        <Dog size={17} />
                      </span>
                    )}

                    {(hogar.tipoAnimal === "GATO" ||
                      hogar.tipoAnimal === "AMBOS") && (
                      <span
                        title="Gatos"
                        className="rounded-lg bg-gray-100 p-2"
                      >
                        <Cat size={17} />
                      </span>
                    )}
                  </div>
                </td>

                <td className="w-40 px-5 py-4">
                  <CapacityBar
                    ocupacion={hogar.ocupacion}
                    capacidad={hogar.capacidad}
                  />
                </td>

                <td className="px-5 py-4">
                  <HogarStatusBadge estado={hogar.estado} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onVer(hogar)}
                      title="Ver hogar"
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEditar(hogar)}
                      title="Editar hogar"
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onRegistrarTransito(hogar)
                      }
                      disabled={
                        hogar.estado !== "DISPONIBLE" &&
                        hogar.ocupacion >= hogar.capacidad
                      }
                      title="Registrar tránsito"
                      className="rounded-lg p-2 text-green-600 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}