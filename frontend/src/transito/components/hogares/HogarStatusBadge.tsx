
import { CheckCircle, PauseCircle, XCircle, Clock } from "lucide-react";

import type { EstadoHogar } from "../../types/transito";

interface HogarStatusBadgeProps {
  estado: EstadoHogar;
}

const CONFIG_ESTADO: Record<
  EstadoHogar,
  {
    label: string;
    className: string;
    icon: typeof CheckCircle;
  }
> = {
  DISPONIBLE: {
    label: "Disponible",
    className: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  OCUPADO: {
    label: "Ocupado",
    className: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  PAUSADO: {
    label: "Pausado",
    className: "bg-yellow-100 text-yellow-700",
    icon: PauseCircle,
  },
  NO_DISPONIBLE: {
    label: "No disponible",
    className: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

export function HogarStatusBadge({
  estado,
}: HogarStatusBadgeProps) {
  const config = CONFIG_ESTADO[estado];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
}

