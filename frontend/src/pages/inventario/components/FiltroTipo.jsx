const filtros = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "medicamento", etiqueta: "Medicamentos" },
  { valor: "alimento", etiqueta: "Alimentos" },
  { valor: "insumo", etiqueta: "Insumos generales" },
];

export default function FiltroTipo({ filtroActivo, onCambiarFiltro }) {
  return (
    <div className="flex gap-2 mb-4">
      {filtros.map((f) => (
        <button
          key={f.valor}
          onClick={() => onCambiarFiltro(f.valor)}
          className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
          style={{
            backgroundColor:
              filtroActivo === f.valor ? "var(--primary)" : "transparent",
            color:
              filtroActivo === f.valor
                ? "var(--primary-foreground)"
                : "var(--foreground)",
            borderColor: "var(--border)",
          }}
        >
          {f.etiqueta}
        </button>
      ))}
    </div>
  );
}
