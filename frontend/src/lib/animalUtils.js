/**
 * animalUtils.js
 * -----------------------------------------------------------------------
 * Helpers de presentación para el módulo de animales.
 *
 * Nota sobre las "badges": el enum EstadoAnimal del schema sólo define
 * AVISTADO | EN_TRANSITO | EN_ADOPCION | ADOPTADO | RESCATADO | FALLECIDO.
 * El diseño de referencia además distingue visualmente si el animal está
 * "en tratamiento" o "en seguimiento", que en el modelo de datos no son
 * estados propios sino condiciones derivadas de otras tablas
 * (RegistroTratamiento activo / SeguimientoAdopcion reciente). Por eso
 * getBadgePrincipal() combina animal.estado con esos flags derivados
 * (enTratamiento, enSeguimiento) para decidir qué pastilla mostrar,
 * sin inventar valores nuevos de enum.
 * -----------------------------------------------------------------------
 */

export const ESTADO_STYLES = {
  AVISTADO: { label: "Avistado", className: "bg-slate-500 text-white" },
  EN_TRANSITO: { label: "En tránsito", className: "bg-sky-600 text-white" },
  EN_ADOPCION: { label: "En adopción", className: "bg-amber-600 text-white" },
  ADOPTADO: { label: "Adoptado", className: "bg-emerald-800 text-white" },
  RESCATADO: { label: "Rescatado", className: "bg-teal-600 text-white" },
  FALLECIDO: { label: "Fallecido", className: "bg-neutral-700 text-white" },
};

/**
 * Devuelve la pastilla principal a mostrar en la card, priorizando
 * condiciones clínicas activas sobre el estado "de base" del animal,
 * tal como se ve en el diseño de referencia (Mochi: TRATAMIENTO en vez
 * de EN_ADOPCION; Roque: SEGUIMIENTO conviviendo con ADOPTADO).
 */
export function getBadgePrincipal(animal) {
  if (animal.enTratamiento) {
    return { label: "Tratamiento", className: "bg-orange-500 text-white" };
  }
  return ESTADO_STYLES[animal.estado] ?? { label: animal.estado, className: "bg-neutral-500 text-white" };
}

/** Pastilla secundaria opcional (sólo "Seguimiento" por ahora). */
export function getBadgeSecundaria(animal) {
  if (animal.enSeguimiento) {
    return { label: "Seguimiento", className: "bg-orange-400 text-white" };
  }
  return null;
}

export function formatMoneda(valor) {
  if (valor == null) return "—";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function formatFecha(fechaISO) {
  if (!fechaISO) return "—";
  const d = new Date(fechaISO);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatSexo(sexo) {
  return sexo === "MACHO" ? "Macho" : "Hembra";
}

export function formatEdad(edad) {
  return `${edad} ${edad === 1 ? "año" : "años"}`;
}

/** Paleta rotativa para el fondo ilustrado de cada card (puramente decorativa). */
const FONDOS_CARD = [
  "from-orange-100 to-orange-50",
  "from-emerald-100 to-emerald-50",
  "from-sky-100 to-sky-50",
  "from-amber-100 to-amber-50",
];

export function getFondoCard(idanimal) {
  return FONDOS_CARD[idanimal % FONDOS_CARD.length];
}

export const FILTROS_INICIALES = {
  especie: "TODAS",
  sexo: "TODOS",
  edadMin: "",
  edadMax: "",
  color: "",
  estado: "TODOS",
  veterinaria: "TODAS",
  responsable: "TODOS",
  lugarOrigen: "",
};

export function generarPaginado(actual, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
 
  const paginas = new Set([1, total, actual, actual - 1, actual + 1]);
  const ordenadas = [...paginas].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
 
  const resultado = [];
  ordenadas.forEach((p, i) => {
    if (i > 0 && p - ordenadas[i - 1] > 1) resultado.push("...");
    resultado.push(p);
  });
  return resultado;
}

// Estado "vacío" del formulario, calcado 1 a 1 con los campos del modelo Animal.
export const FORM_INICIAL = {
  idespecie: "",
  nombre: "",
  sexo: "MACHO",
  edadestimada: "",
  colorpelaje: "",
  peso: "",
  castrado: false,
  lactante: false,
  lugarorigen: "",
  estado: "AVISTADO",
  fechaingreso: new Date().toISOString().slice(0, 10),
  // Campos fuera del modelo Animal (ver nota en README): simulan el alta/edición
  // de la relación con Transito/Adopcion + Veterinaria desde el mismo formulario.
  veterinariaId: "",
  responsableId: "",
};

/** Convierte un animal (tal como viene de mockAnimales) en valores de formulario, para precargar la edición. */
export function animalAFormulario(animal) {
  if (!animal) return FORM_INICIAL;
  return {
    idespecie: animal.idespecie != null ? String(animal.idespecie) : "",
    nombre: animal.nombre ?? "",
    sexo: animal.sexo ?? "MACHO",
    edadestimada: animal.edadestimada ?? "",
    colorpelaje: animal.colorpelaje ?? "",
    peso: animal.peso ?? "",
    castrado: !!animal.castrado,
    lactante: !!animal.lactante,
    lugarorigen: animal.lugarorigen ?? "",
    estado: animal.estado ?? "AVISTADO",
    fechaingreso: animal.fechaingreso ?? new Date().toISOString().slice(0, 10),
    veterinariaId: animal.veterinariaId ? String(animal.veterinariaId) : "",
    responsableId: animal.responsable ? String(animal.responsable.idpersona) : "",
  };
}