import { Wallet, BadgeCheck, Hourglass, ClipboardList } from "lucide-react";

const kpiConfig = [
  {
    key: "totalAcumulado",
    label: "Gasto total acumulado",
    Icon: Wallet,
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-500",
    formato: "moneda",
  },
  {
    key: "reintegrado",
    label: "Reintegrado",
    Icon: BadgeCheck,
    iconBg: "bg-success/15",
    iconColor: "text-success",
    formato: "moneda",
  },
  {
    key: "pendienteReintegro",
    label: "Pendiente de reintegro",
    Icon: Hourglass,
    iconBg: "bg-warning/15",
    iconColor: "text-warning",
    formato: "moneda",
  },
  {
    key: "pendienteAprobar",
    label: "Pendientes de aprobar",
    Icon: ClipboardList,
    iconBg: "bg-info/15",
    iconColor: "text-info",
    formato: "numero",
  },
];

export default function KpisGastos({
  totalAcumulado,
  reintegrado,
  pendienteReintegro,
  pendienteAprobar,
}) {
  const valores = { totalAcumulado, reintegrado, pendienteReintegro, pendienteAprobar };

  return (
    // Mobile: 1 col | sm: 2 cols | lg: 4 cols
    <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 lg:grid-cols-4">
      {kpiConfig.map(({ key, label, Icon, iconBg, iconColor, formato }) => (
        <div
          key={key}
          className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
        >
          <div className={`${iconBg} rounded-lg p-2.5 flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground leading-tight">
              {formato === "moneda"
                ? `$${Number(valores[key]).toLocaleString("es-AR")}`
                : valores[key]}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}