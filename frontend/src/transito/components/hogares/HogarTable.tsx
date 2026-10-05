import {
  Eye,
  Pencil,
  Plus,
  MapPin,
  Dog,
  Cat,
  Trash2,
} from "lucide-react";
import type { HogarTransito, Transito } from "../../types/transito";
import { HogarStatusBadge } from "./HogarStatusBadge";
import { CapacityBar } from "./CapacityBar";


interface HogarTableProps {
  hogares: HogarTransito[];

  onVer: (hogar: HogarTransito) => void;
  onEditar: (hogar: HogarTransito) => void;
  onRegistrarTransito: (hogar: HogarTransito) => void;
  onEliminarTransito: (hogar: HogarTransito) => void;
  transitos: Transito[];
}

export function HogarTable({
  hogares,
  onVer,
  onEditar,
  onRegistrarTransito,
  onEliminarTransito,
  transitos,
}: HogarTableProps) {
  if (hogares.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center text-card-foreground">
        <p className="font-medium text-foreground">
          No se encontraron hogares
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Probá modificando los filtros de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-5 py-4 font-semibold text-foreground">
                Transitario
              </th>

              <th className="px-5 py-4 font-semibold text-foreground">
                Zona
              </th>

              <th className="px-5 py-4 font-semibold text-foreground">
                Acepta
              </th>

              <th className="px-5 py-4 font-semibold text-foreground">
                Capacidad
              </th>

              <th className="px-5 py-4 font-semibold text-foreground">
                Estado
              </th>

              <th className="px-5 py-4 text-right font-semibold text-foreground">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {hogares.map((hogar) => (
              <tr
                key={hogar.id}
                className="transition hover:bg-muted/70"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {hogar.nombreTransitante}{" "}
                      {hogar.apellidoTransitante}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {hogar.telefono}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
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
                        className="rounded-lg bg-muted p-2 text-muted-foreground"
                      >
                        <Dog size={17} />
                      </span>
                    )}

                    {(hogar.tipoAnimal === "GATO" ||
                      hogar.tipoAnimal === "AMBOS") && (
                      <span
                        title="Gatos"
                        className="rounded-lg bg-muted p-2 text-muted-foreground"
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
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEditar(hogar)}
                      title="Editar hogar"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onRegistrarTransito(hogar)
                      }
                      disabled={
                        hogar.estado === "PAUSADO" ||
                        hogar.estado === "NO_DISPONIBLE" ||
                        hogar.ocupacion >= hogar.capacidad
                      }
                      title="Registrar tránsito"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={18} />
                    </button>

                    {transitos.some(
                      (transito) =>
                        transito.hogarId === hogar.id &&
                        transito.estado === "ACTIVO",
                    ) && (
                      <button
                        type="button"
                        onClick={() => onEliminarTransito(hogar)}
                        title="Eliminar tránsito activo"
                        aria-label={`Eliminar tránsito activo del hogar de ${hogar.nombreTransitante} ${hogar.apellidoTransitante}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-destructive/40 text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 size={17} />
                      </button>
                    )}
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