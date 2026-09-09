import { useState } from "react";
import { Input } from "@/components/ui/input";

// TODO: reemplazar animalesMock por fetch a GET /api/animales cuando GCA_05 esté disponible.
// En la vista operativo: todos los animales.
// En la vista transitante: solo los animales asociados al usuario logueado.
const animalesMock = [
  {
    idanimal: 1,
    nombre: "Luna",
    especieanimal: { nombre: "Perro" },
    sexo: "HEMBRA",
    edadestimada: 2,
    fotoUrl: null,
  },
  {
    idanimal: 2,
    nombre: "Mochi",
    especieanimal: { nombre: "Gato" },
    sexo: "HEMBRA",
    edadestimada: 1,
    fotoUrl: null,
  },
  {
    idanimal: 3,
    nombre: "Tobi",
    especieanimal: { nombre: "Perro" },
    sexo: "MACHO",
    edadestimada: 4,
    fotoUrl: null,
  },
];

function fotoPlaceholder(especie) {
  const s = (especie ?? "").toLowerCase();
  if (s.includes("gato")) return "https://placekitten.com/64/64";
  return "https://placedog.net/64/64";
}

/**
 * SelectorAnimal
 * Combobox con búsqueda por texto que muestra foto + nombre + especie.
 * @param {{ animalSeleccionado: object|null, onSeleccionar: (animal) => void, animales?: array }} props
 */
export default function SelectorAnimal({ animalSeleccionado, onSeleccionar, animales = animalesMock }) {
  const [query, setQuery] = useState("");
  const [abierto, setAbierto] = useState(false);

  const filtrados = animales.filter((a) =>
    a.nombre.toLowerCase().includes(query.toLowerCase())
  );

  const handleSeleccionar = (animal) => {
    onSeleccionar(animal);
    setQuery(animal.nombre);
    setAbierto(false);
  };

  return (
    <div className="relative w-72">
      <Input
        placeholder="Buscar animal..."
        value={animalSeleccionado && !abierto ? animalSeleccionado.nombre : query}
        onFocus={() => {
          setAbierto(true);
          setQuery("");
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setAbierto(true);
        }}
        onBlur={() => setTimeout(() => setAbierto(false), 150)}
      />
      {abierto && filtrados.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          {filtrados.map((animal) => {
            const especie = animal.especieanimal?.nombre ?? "";
            const foto = animal.fotoUrl ?? fotoPlaceholder(especie);
            const sexo = animal.sexo === "MACHO" ? "Macho" : "Hembra";
            return (
              <button
                key={animal.idanimal}
                onMouseDown={() => handleSeleccionar(animal)}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted text-left transition-colors"
              >
                <img
                  src={foto}
                  alt={animal.nombre}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {animal.nombre}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {[especie, sexo, animal.edadestimada && `${animal.edadestimada} años`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
      {abierto && filtrados.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-lg shadow-lg px-3 py-4 text-sm text-muted-foreground text-center">
          No se encontraron animales.
        </div>
      )}
    </div>
  );
}