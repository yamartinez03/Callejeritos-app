interface CapacityBarProps {
  ocupacion: number;
  capacidad: number;
}

export function CapacityBar({ ocupacion, capacidad }: CapacityBarProps) {
  const porcentaje = capacidad > 0 ? Math.min(Math.round((ocupacion / capacidad) * 100), 100) : 0;

  let barColor = "bg-green-500";
  if (porcentaje >= 100) {
    barColor = "bg-red-500";
  } else if (porcentaje >= 75) {
    barColor = "bg-yellow-500";
  }

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-xs font-medium text-gray-600">
        <span>{ocupacion} de {capacidad}</span>
        <span>{porcentaje}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}

