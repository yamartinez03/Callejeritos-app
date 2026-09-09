import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";

const LIMITE_RESULTADOS = 8;
const MINIMO_CHARS = 3;
const DEBOUNCE_MS = 300;

const vistas = [
  { valor: "todos", etiqueta: "Todos los gastos", icon: "📋" },
  { valor: "porAnimal", etiqueta: "Gastos por animal", icon: "🐾" },
];

// TODO: reemplazar por fetch a GET /api/animales?nombre=<query>&limit=8
// cuando el endpoint esté disponible en animalController.js.
// El mock simula el mismo comportamiento: filtra por nombre y limita a 8.
const animalesMock = [
  { idanimal: 1, nombre: "Luna", especieanimal: { nombre: "Perro" }, sexo: "HEMBRA", edadestimada: 2, fotoUrl: null },
  { idanimal: 2, nombre: "Mochi", especieanimal: { nombre: "Gato" }, sexo: "HEMBRA", edadestimada: 1, fotoUrl: null },
  { idanimal: 3, nombre: "Tobi", especieanimal: { nombre: "Perro" }, sexo: "MACHO", edadestimada: 4, fotoUrl: null },
  { idanimal: 4, nombre: "Lola", especieanimal: { nombre: "Perro" }, sexo: "HEMBRA", edadestimada: 3, fotoUrl: null },
  { idanimal: 5, nombre: "Max", especieanimal: { nombre: "Perro" }, sexo: "MACHO", edadestimada: 5, fotoUrl: null },
  { idanimal: 6, nombre: "Micha", especieanimal: { nombre: "Gato" }, sexo: "HEMBRA", edadestimada: 2, fotoUrl: null },
  { idanimal: 7, nombre: "Rocky", especieanimal: { nombre: "Perro" }, sexo: "MACHO", edadestimada: 6, fotoUrl: null },
  { idanimal: 8, nombre: "Luca", especieanimal: { nombre: "Perro" }, sexo: "MACHO", edadestimada: 1, fotoUrl: null },
  { idanimal: 9, nombre: "Simba", especieanimal: { nombre: "Gato" }, sexo: "MACHO", edadestimada: 3, fotoUrl: null },
  { idanimal: 10, nombre: "Luna II", especieanimal: { nombre: "Gato" }, sexo: "HEMBRA", edadestimada: 2, fotoUrl: null },
];

async function buscarAnimales(query) {
  // Simula latencia de red con el mock
  await new Promise((resolve) => setTimeout(resolve, 150));

  // TODO: reemplazar por:
  // const res = await fetch(`/api/animales?nombre=${query}&limit=${LIMITE_RESULTADOS}`);
  // return await res.json();

  return animalesMock
    .filter((a) => a.nombre.toLowerCase().includes(query.toLowerCase()))
    .slice(0, LIMITE_RESULTADOS);
}

function fotoPlaceholder(especie) {
  return especie?.toLowerCase().includes("gato")
    ? "https://placekitten.com/40/40"
    : "https://placedog.net/40/40";
}

/**
 * BuscadorAnimal
 * Input con debounce, mínimo de caracteres, dropdown con foto + nombre,
 * límite de 8 resultados y mensaje si hay más.
 */
function BuscadorAnimal({ onSeleccionar, animalSeleccionado, onLimpiar, animalesPropios }) {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [hayMas, setHayMas] = useState(false);
  const debounceRef = useRef(null);
  const contenedorRef = useRef(null);

  // Cierra el dropdown al hacer click afuera
  useEffect(() => {
    function handleClickFuera(e) {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target)) {
        setAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  const handleChange = (e) => {
    const texto = e.target.value;
    setQuery(texto);

    // Limpia el animal seleccionado si el usuario borra el texto
    if (!texto) {
      onLimpiar();
      setResultados([]);
      setAbierto(false);
      return;
    }

    // Menos de 3 caracteres: no busca todavía
    if (texto.length < MINIMO_CHARS) {
      setResultados([]);
      setAbierto(false);
      setCargando(false);
      return;
    }

    // Debounce: espera 300ms antes de buscar
    setCargando(true);
    setAbierto(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      // Si hay animalesPropios (transitante), filtra sobre ellos localmente
      // Si no, usa la función buscarAnimales (operativo → API o mock)
      let encontrados;
      if (animalesPropios) {
        encontrados = animalesPropios
          .filter((a) => a.nombre.toLowerCase().includes(texto.toLowerCase()))
          .slice(0, LIMITE_RESULTADOS);
      } else {
        encontrados = await buscarAnimales(texto);
      }

      // Detecta si hay más resultados de los que mostramos
      const totalPosibles = animalesPropios
        ? animalesPropios.filter((a) =>
            a.nombre.toLowerCase().includes(texto.toLowerCase())
          ).length
        : encontrados.length; // con API real esto vendría en la respuesta

      setResultados(encontrados);
      setHayMas(totalPosibles > LIMITE_RESULTADOS);
      setCargando(false);
    }, DEBOUNCE_MS);
  };

  const handleSeleccionar = (animal) => {
    setQuery(animal.nombre);
    setResultados([]);
    setAbierto(false);
    onSeleccionar(animal);
  };

  const handleLimpiar = () => {
    setQuery("");
    setResultados([]);
    setAbierto(false);
    onLimpiar();
  };

  return (
    <div ref={contenedorRef} className="relative flex-1 min-w-[240px] max-w-sm">
      {/* Input */}
      <div className="relative">
        {cargando
          ? <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
          : <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        }
        <input
          type="text"
          placeholder={`Buscar animal (mín. ${MINIMO_CHARS} letras)...`}
          value={query}
          onChange={handleChange}
          onFocus={() => resultados.length > 0 && setAbierto(true)}
          className="w-full rounded-lg border border-input bg-background pl-9 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {query && (
          <button
            onClick={handleLimpiar}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hint: menos de 3 caracteres */}
      {query.length > 0 && query.length < MINIMO_CHARS && (
        <p className="absolute mt-1 text-xs text-muted-foreground pl-1">
          Escribí al menos {MINIMO_CHARS} letras para buscar.
        </p>
      )}

      {/* Dropdown de resultados */}
      {abierto && query.length >= MINIMO_CHARS && (
        <div className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          {cargando && (
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">
              Buscando...
            </div>
          )}

          {!cargando && resultados.length === 0 && (
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">
              No se encontraron animales.
            </div>
          )}

          {!cargando && resultados.map((animal) => {
            const especie = animal.especieanimal?.nombre ?? "";
            const foto = animal.fotoUrl ?? fotoPlaceholder(especie);
            const sexo = animal.sexo === "MACHO" ? "Macho" : "Hembra";

            return (
              <button
                key={animal.idanimal}
                onMouseDown={() => handleSeleccionar(animal)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted text-left transition-colors border-b border-border last:border-0"
              >
                <img
                  src={foto}
                  alt={animal.nombre}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => { e.currentTarget.src = ""; }}
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

          {/* Mensaje de límite */}
          {!cargando && hayMas && (
            <div className="px-4 py-2 text-xs text-muted-foreground text-center bg-muted border-t border-border">
              Mostrando {LIMITE_RESULTADOS} resultados · Refiná la búsqueda para ver más
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * FiltroVista
 * Botones de vista + BuscadorAnimal integrado en la misma línea.
 */
export default function FiltroVista({
  vistaActiva,
  onCambiarVista,
  animalSeleccionado,
  onSeleccionarAnimal,
  onLimpiarAnimal,
  animalesPropios,
}) {
  return (
    <div className="flex items-center gap-3 mb-6 flex-wrap">
      {vistas.map((v) => {
        const activa = vistaActiva === v.valor;
        return (
          <button
            key={v.valor}
            onClick={() => onCambiarVista(v.valor)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border font-medium text-sm transition-colors flex-shrink-0
              ${
                activa
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              }`}
          >
            <span>{v.icon}</span>
            {v.etiqueta}
          </button>
        );
      })}

      {/* Buscador — solo visible en vista "porAnimal" */}
      {vistaActiva === "porAnimal" && (
        <BuscadorAnimal
          animalSeleccionado={animalSeleccionado}
          onSeleccionar={onSeleccionarAnimal}
          onLimpiar={onLimpiarAnimal}
          animalesPropios={animalesPropios}
        />
      )}
    </div>
  );
}