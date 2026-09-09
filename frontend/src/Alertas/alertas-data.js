// Datos de ejemplo — simulan registros de RegistroVacuna / RegistroDesparasitacion
// vinculados a un animal y su hogar de tránsito actual.

export const HOY = new Date("2026-06-15")

export const registrosIniciales = [
  { id: 1, animal: "Luna", especie: "Perro", emoji: "🐕", hogar: "Ana González", telefono: "221-555-1234", tipo: "vacuna", nombre: "Séxtuple", fechaAplicacion: "2025-06-12", fechaVencimiento: "2026-06-12" },
  { id: 2, animal: "Luna", especie: "Perro", emoji: "🐕", hogar: "Ana González", telefono: "221-555-1234", tipo: "vacuna", nombre: "Rabia", fechaAplicacion: "2025-06-10", fechaVencimiento: "2026-06-10" },
  { id: 3, animal: "Luna", especie: "Perro", emoji: "🐕", hogar: "Ana González", telefono: "221-555-1234", tipo: "desparasitacion", nombre: "Desparasitación interna", fechaAplicacion: "2026-05-01", fechaVencimiento: "2026-08-01" },
  { id: 4, animal: "Mochi", especie: "Gato", emoji: "🐈", hogar: "Laura Pérez", telefono: "221-555-7654", tipo: "vacuna", nombre: "Triple felina", fechaAplicacion: "2025-12-01", fechaVencimiento: "2026-12-01" },
  { id: 5, animal: "Mochi", especie: "Gato", emoji: "🐈", hogar: "Laura Pérez", telefono: "221-555-7654", tipo: "desparasitacion", nombre: "Desparasitación interna", fechaAplicacion: "2026-04-15", fechaVencimiento: "2026-07-15" },
  { id: 6, animal: "Tobi", especie: "Perro", emoji: "🐕", hogar: "Familia Romero", telefono: "221-555-3210", tipo: "vacuna", nombre: "Séxtuple", fechaAplicacion: "2025-07-01", fechaVencimiento: "2026-07-01" },
  { id: 7, animal: "Roque", especie: "Perro", emoji: "🐕", hogar: "Carlos Méndez", telefono: "221-555-9876", tipo: "desparasitacion", nombre: "Desparasitación interna", fechaAplicacion: "2026-03-23", fechaVencimiento: "2026-06-23" },
  { id: 8, animal: "Manchas", especie: "Gato", emoji: "🐈", hogar: "Laura Pérez", telefono: "221-555-7654", tipo: "vacuna", nombre: "Triple felina", fechaAplicacion: "2025-06-27", fechaVencimiento: "2026-06-27" },
  { id: 9, animal: "Roque", especie: "Perro", emoji: "🐕", hogar: "Carlos Méndez", telefono: "221-555-9876", tipo: "vacuna", nombre: "Rabia", fechaAplicacion: "2026-03-20", fechaVencimiento: "2027-03-20" },
]

export function diasHasta(fecha) {
  return Math.round((new Date(fecha) - HOY) / 86_400_000)
}

export function estadoAlerta(dias) {
  if (dias < 0) return "vencida"
  if (dias <= 30) return "proxima"
  return "al-dia"
}

const PROXIMA_DESPARASITACION_MESES = 3
const PROXIMA_VACUNA_ANIOS = 1

export function calcularProximaFecha(tipo, desde) {
  const d = new Date(desde)
  if (tipo === "desparasitacion") d.setMonth(d.getMonth() + PROXIMA_DESPARASITACION_MESES)
  else d.setFullYear(d.getFullYear() + PROXIMA_VACUNA_ANIOS)
  return d.toISOString().slice(0, 10)
}

export function conDias(registro) {
  const dias = diasHasta(registro.fechaVencimiento)
  return { ...registro, dias, estado: estadoAlerta(dias) }
}
