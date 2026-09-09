function fotoPlaceholder(especie) {
  return especie?.toLowerCase().includes("gato")
    ? "https://placekitten.com/80/80"
    : "https://placedog.net/80/80";
}

export default function CabeceraPorAnimal({ animal, totalGastos }) {
  if (!animal) return null;

  const especie = animal.especieanimal?.nombre ?? "";
  const foto = animal.fotoUrl ?? fotoPlaceholder(especie);
  const sexo = animal.sexo === "MACHO" ? "Macho" : "Hembra";
  const edad = animal.edadestimada
    ? `${animal.edadestimada} año${animal.edadestimada !== 1 ? "s" : ""}`
    : null;

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 mb-4 sm:gap-4">
      {/* Foto: más chica en mobile */}
      <img
        src={foto}
        alt={animal.nombre}
        className="w-14 h-14 rounded-xl object-cover flex-shrink-0 sm:w-20 sm:h-20"
      />
      <div className="flex-1 min-w-0">
        <h2 className="text-base font-bold text-foreground sm:text-lg">
          {animal.nombre}
        </h2>
        <p className="text-xs text-muted-foreground sm:text-sm">
          {[especie, sexo, edad].filter(Boolean).join(" · ")}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs text-muted-foreground">Total gastos</p>
        <p className="text-xl font-bold text-foreground sm:text-2xl">
          ${Number(totalGastos).toLocaleString("es-AR")}
        </p>
      </div>
    </div>
  );
}