import { Calendar, Home, Dog, Clock, CheckCircle2 } from "lucide-react";

export interface TransitoItem {
  id: string;
  hogarNombre?: string;
  animalNombre?: string;
  tipoAnimal?: "PERRO" | "GATO";
  fechaInicio: string;
  fechaFinEstimada?: string;
  fechaFinReal?: string;
  observaciones?: string;
  estado: "ACTIVO" | "FINALIZADO";
  motivoEgreso?: "ADOPCION" | "DEVOLUCION" | "TRASPASO";
}

interface TransitoCardProps {
  transito: TransitoItem;
  onFinalizar?: (transito: TransitoItem) => void;
  onVerDetalles?: (transito: TransitoItem) => void;
}

export function TransitoCard({
  transito,
  onFinalizar,
  onVerDetalles,
}: TransitoCardProps) {
  const isActivo = transito.estado === "ACTIVO";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-green-100 p-2.5 text-green-700">
            <Dog size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {transito.animalNombre || `Tránsito #${transito.id}`}
            </h3>
            {transito.hogarNombre && (
              <p className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                <Home size={14} />
                {transito.hogarNombre}
              </p>
            )}
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isActivo
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isActivo ? (
            <>
              <Clock size={12} /> Activo
            </>
          ) : (
            <>
              <CheckCircle2 size={12} /> Finalizado
            </>
          )}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-xs text-gray-600 border-t pt-3">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-400" />
          <span>Inicio: {transito.fechaInicio}</span>
        </div>
        {transito.fechaFinEstimada && (
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            <span>Fin estimado: {transito.fechaFinEstimada}</span>
          </div>
        )}
        {transito.observaciones && (
          <p className="mt-2 text-gray-500 italic text-xs">
            "{transito.observaciones}"
          </p>
        )}
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t pt-3">
        {onVerDetalles && (
          <button
            type="button"
            onClick={() => onVerDetalles(transito)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            Ver detalles
          </button>
        )}
        {isActivo && onFinalizar && (
          <button
            type="button"
            onClick={() => onFinalizar(transito)}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
          >
            Finalizar tránsito
          </button>
        )}
      </div>
    </div>
  );
}
