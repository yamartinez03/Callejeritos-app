/**
 * historialUtils.js
 * -----------------------------------------------------------------------
 * Helpers de presentación para el módulo de Historial Clínico.
 * Mismo criterio de color que animalUtils.js: paleta fija de Tailwind
 * para distinguir tipos de atención, ya que el theme base es neutro.
 * -----------------------------------------------------------------------
 */

export const TIPO_STYLES = {
  ATENCION: { label: "Atención veterinaria", className: "bg-sky-600 text-white dark:bg-sky-500" },
  ESTUDIO: { label: "Estudio", className: "bg-violet-600 text-white dark:bg-violet-500" },
  VACUNA: { label: "Vacunación", className: "bg-emerald-700 text-white dark:bg-emerald-600" },
  DESPARASITACION: { label: "Desparasitación", className: "bg-amber-600 text-white dark:bg-amber-500" },
  TRATAMIENTO: { label: "Tratamiento", className: "bg-orange-600 text-white dark:bg-orange-500" },
};

export function getTipoStyle(tipo) {
  return TIPO_STYLES[tipo] ?? { label: tipo, className: "bg-muted text-muted-foreground" };
}

export function formatFecha(fechaISO) {
  if (!fechaISO) return "—";
  const d = new Date(fechaISO);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatFechaHora(fechaISO) {
  if (!fechaISO) return "—";
  const d = new Date(fechaISO);
  return d.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Texto a mostrar para el responsable de un registro (veterinaria, profesional u "otro"). */
export function formatResponsable(responsable) {
  if (!responsable) return "Sin especificar";
  if (responsable.tipo === "OTRO") return `${responsable.nombre} (otro)`;
  return responsable.nombre;
}

/** true si una fecha (yyyy-mm-dd) ya pasó respecto de hoy. */
export function estaVencida(fechaISO) {
  if (!fechaISO) return false;
  return new Date(fechaISO) < new Date(new Date().toDateString());
}
