// aceptado: null = pendiente de aprobar | true = aprobado | false = rechazado
// reintegrado: false = pendiente de reintegro | true = reintegrado
const filtros = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "pendienteAprobar", etiqueta: "Pendiente de aprobar" },
  { valor: "aprobados", etiqueta: "Aprobados" },
  { valor: "rechazados", etiqueta: "Rechazados" },
  { valor: "reintegrados", etiqueta: "Reintegrados" },
  { valor: "pendienteReintegro", etiqueta: "Pendiente de reintegro" },
];

export default function FiltroEstado({ filtroActivo, onCambiarFiltro }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filtros.map((f) => {
        const activo = filtroActivo === f.valor;
        return (
          <button
            key={f.valor}
            onClick={() => onCambiarFiltro(f.valor)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
              ${
                activo
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              }`}
          >
            {f.etiqueta}
          </button>
        );
      })}
    </div>
  );
}