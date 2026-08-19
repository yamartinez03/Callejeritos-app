const filtros = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "PENDIENTE", etiqueta: "Pendientes" },
  { valor: "APROBADO", etiqueta: "Aprobados" },
  { valor: "RECHAZADO", etiqueta: "Rechazados" },
];

export default function FiltroEstado({ filtroActivo, onCambiarFiltro }) {
  return (
    <div className="flex gap-2 mb-4">
      {filtros.map((f) => (
        <button
          key={f.valor}
          onClick={() => onCambiarFiltro(f.valor)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
            ${
              filtroActivo === f.valor
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
        >
          {f.etiqueta}
        </button>
      ))}
    </div>
  );
}
