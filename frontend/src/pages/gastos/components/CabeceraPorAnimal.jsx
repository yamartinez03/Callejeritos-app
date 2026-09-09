// TODO: reemplazar por gasto.animal.fotoUrl cuando el campo exista en schema.prisma
function fotoPlaceholder(especie) {
  const s = (especie ?? "").toLowerCase();
  if (s.includes("gato")) return "https://placekitten.com/80/80";
  return "https://placedog.net/80/80";
}

/**
 * CabeceraPorAnimal
 * Se muestra en la vista "Gastos por animal" cuando hay un animal seleccionado.
 * Muestra foto, datos del animal y total acumulado de sus gastos.
 *
 * @param {{ animal: object, totalGastos: number }} props
 */
export default function CabeceraPorAnimal({ animal, totalGastos }) {
  if (!animal) return null;

  const especie = animal.especieanimal?.nombre ?? "";
  const foto = animal.fotoUrl ?? fotoPlaceholder(especie);
  const sexo = animal.sexo === "MACHO" ? "Macho" : "Hembra";
  const edad = animal.edadestimada
    ? `${animal.edadestimada} año${animal.edadestimada !== 1 ? "s" : ""}`
    : null;

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 mb-4">
      <img
        src={foto}
        alt={animal.nombre}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <h2 className="text-lg font-bold text-foreground">{animal.nombre}</h2>
        <p className="text-sm text-muted-foreground">
          {[especie, sexo, edad].filter(Boolean).join(" · ")}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs text-muted-foreground">Total gastos</p>
        <p className="text-2xl font-bold text-foreground">
          ${Number(totalGastos).toLocaleString("es-AR")}
        </p>
      </div>
    </div>
  );
}