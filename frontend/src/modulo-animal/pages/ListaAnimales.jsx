import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimalCard from "@/modulo-animal/components/AnimalCard";
import FiltrosAnimales from "@/modulo-animal/components/FiltrosAnimales";
import { FILTROS_INICIALES, generarPaginado } from "#lib/animalUtils.js";
import { ANIMALES } from "@/shared/data/mockAnimales";

const ITEMS_POR_PAGINA = 8;

// Tabs rápidos, calcados del diseño de referencia. Se basan en la misma
// lógica de "badge principal" que usan las cards (ver lib/animalUtils).
const TABS_RAPIDOS = [
  { key: "TODOS", label: "Todos" },
  { key: "EN_TRANSITO", label: "En tránsito" },
  { key: "TRATAMIENTO", label: "Tratamiento" },
  { key: "ADOPTADO", label: "Adoptado" },
];

function cumpleTabRapido(animal, tab) {
  if (tab === "TODOS") return true;
  if (tab === "TRATAMIENTO") return animal.enTratamiento;
  return animal.estado === tab;
}

function cumpleFiltrosAvanzados(animal, filtros) {
  if (
    filtros.especie !== "TODAS" &&
    String(animal.idespecie) !== filtros.especie
  )
    return false;
  if (filtros.sexo !== "TODOS" && animal.sexo !== filtros.sexo) return false;
  if (filtros.estado !== "TODOS" && animal.estado !== filtros.estado)
    return false;
  if (filtros.edadMin !== "" && animal.edadestimada < Number(filtros.edadMin))
    return false;
  if (filtros.edadMax !== "" && animal.edadestimada > Number(filtros.edadMax))
    return false;
  if (
    filtros.color &&
    !animal.colorpelaje.toLowerCase().includes(filtros.color.toLowerCase())
  )
    return false;
  if (
    filtros.veterinaria !== "TODAS" &&
    String(animal.veterinariaId) !== filtros.veterinaria
  )
    return false;
  if (
    filtros.responsable !== "TODOS" &&
    String(animal.responsable?.idpersona) !== filtros.responsable
  )
    return false;
  if (
    filtros.lugarOrigen &&
    !animal.lugarorigen
      .toLowerCase()
      .includes(filtros.lugarOrigen.toLowerCase())
  )
    return false;
  return true;
}

export default function ListaAnimales() {
  const [busqueda, setBusqueda] = useState("");
  const [tabActivo, setTabActivo] = useState("TODOS");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [pagina, setPagina] = useState(1);

  const animalesFiltrados = useMemo(() => {
    return ANIMALES.filter(
      (a) =>
        a.nombre
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            busqueda
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase(),
          ) &&
        cumpleTabRapido(a, tabActivo) &&
        cumpleFiltrosAvanzados(a, filtros),
    );
  }, [busqueda, tabActivo, filtros]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(animalesFiltrados.length / ITEMS_POR_PAGINA),
  );
  const paginaSegura = Math.min(pagina, totalPaginas);
  const animalesPagina = animalesFiltrados.slice(
    (paginaSegura - 1) * ITEMS_POR_PAGINA,
    paginaSegura * ITEMS_POR_PAGINA,
  );

  const contarPorTab = (tab) =>
    ANIMALES.filter((a) => cumpleTabRapido(a, tab)).length;

  function actualizarBusqueda(valor) {
    setBusqueda(valor);
    setPagina(1);
  }

  function actualizarTab(tab) {
    setTabActivo(tab);
    setPagina(1);
  }

  function actualizarFiltros(nuevos) {
    setFiltros(nuevos);
    setPagina(1);
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Header: búsqueda, tabs rápidos y acción principal */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre..."
                className="pl-9"
                value={busqueda}
                onChange={(e) => actualizarBusqueda(e.target.value)}
              />
            </div>

            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
              {TABS_RAPIDOS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => actualizarTab(tab.key)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    tabActivo === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {tab.label} ({contarPorTab(tab.key)})
                </button>
              ))}
            </div>
          </div>
          <Link to="/animales/nuevo">
            <Button asChild className="w-full gap-1.5 lg:w-auto">
              <Plus className="h-4 w-4" />
              Nuevo animal
            </Button>
          </Link>
        </div>

        {/* Toggle de filtros avanzados */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => setMostrarFiltros((v) => !v)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {mostrarFiltros ? "Ocultar filtros avanzados" : "Filtros avanzados"}
        </Button>

        {mostrarFiltros && (
          <FiltrosAnimales
            filtros={filtros}
            onChange={actualizarFiltros}
            onReset={() => actualizarFiltros(FILTROS_INICIALES)}
          />
        )}

        {/* Resultado */}
        {animalesPagina.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/40 py-16 text-center text-muted-foreground">
            No hay animales que coincidan con la búsqueda o los filtros
            aplicados.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {animalesPagina.map((animal) => (
              <AnimalCard key={animal.idanimal} animal={animal} />
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 sm:gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={paginaSegura === 1}
              onClick={() => setPagina(paginaSegura - 1)}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {generarPaginado(paginaSegura, totalPaginas).map((n, i) =>
              n === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-1 text-sm text-muted-foreground"
                >
                  …
                </span>
              ) : (
                <Button
                  key={n}
                  variant={n === paginaSegura ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPagina(n)}
                  aria-current={n === paginaSegura ? "page" : undefined}
                >
                  {n}
                </Button>
              ),
            )}

            <Button
              variant="outline"
              size="icon"
              disabled={paginaSegura === totalPaginas}
              onClick={() => setPagina(paginaSegura + 1)}
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
