/**
 * mockAnimales.js
 * -----------------------------------------------------------------------
 * Datos de prueba para ListaAnimales / DetalleAnimal / CrearAnimal.
 *
 * La forma de cada objeto simula lo que devolvería un endpoint tipo
 * GET /api/animales (Animal + relaciones incluidas vía Prisma `include`).
 * Cuando el backend real esté listo, este archivo se reemplaza por
 * llamadas a fetch()/axios y el resto de los componentes no debería
 * necesitar cambios, porque consumen esta misma forma de datos.
 *
 * Supuesto de modelado: `especieanimal.nombre` se usa como "especie/raza"
 * combinada (ej: "Mestiza", "Golden Retriever", "Persa"), tal como se ve
 * en el diseño de referencia, ya que el schema no separa especie de raza.
 * -----------------------------------------------------------------------
 */

// ---- Catálogos (simulan tablas de referencia) --------------------------

export const ESPECIES = [
  { idespecie: 1, nombre: "Mestiza" },
  { idespecie: 2, nombre: "Persa" },
  { idespecie: 3, nombre: "Golden Retriever" },
  { idespecie: 4, nombre: "Pitbull" },
  { idespecie: 5, nombre: "Siamés" },
  { idespecie: 6, nombre: "Labrador" },
  { idespecie: 7, nombre: "Mestizo" },
];

export const VETERINARIAS = [
  { idresponsable: 101, nombre: "Veterinaria San Roque", direccion: "Av. Siempreviva 742" },
  { idresponsable: 102, nombre: "Clínica Huellitas", direccion: "Belgrano 1200" },
  { idresponsable: 103, nombre: "Veterinaria del Parque", direccion: "Rivadavia 55" },
];

// Personas que oficiaron de transitante o adoptante (Usuario + rol)
export const RESPONSABLES_HOGAR = [
  { idpersona: 201, nombre: "Ana González", tipo: "TRANSITANTE" },
  { idpersona: 202, nombre: "Laura Pérez", tipo: "TRANSITANTE" },
  { idpersona: 203, nombre: "Familia Romero", tipo: "ADOPTANTE" },
  { idpersona: 204, nombre: "Carlos Méndez", tipo: "TRANSITANTE" },
  { idpersona: 205, nombre: "Marcos Ibáñez", tipo: "ADOPTANTE" },
  { idpersona: 206, nombre: "Sofía Torres", tipo: "TRANSITANTE" },
];

export const ESTADOS_ANIMAL = [
  { value: "AVISTADO", label: "Avistado" },
  { value: "EN_TRANSITO", label: "En tránsito" },
  { value: "EN_ADOPCION", label: "En adopción" },
  { value: "ADOPTADO", label: "Adoptado" },
  { value: "RESCATADO", label: "Rescatado" },
  { value: "FALLECIDO", label: "Fallecido" },
];

// ---- Animales (Animal + relaciones) -------------------------------------
// costoTotal = suma de Gasto.monto asociados al animal
// alertasMedicas = derivado de RegistroVacuna/RegistroDesparasitacion/RegistroTratamiento
// enTratamiento = existe un RegistroTratamiento con fechafin >= hoy
// enSeguimiento = existe una SeguimientoAdopcion reciente sobre la Adopcion del animal

export const ANIMALES = [
  {
    idanimal: 1,
    idespecie: 1,
    nombre: "Luna",
    sexo: "HEMBRA",
    edadestimada: 3,
    colorpelaje: "Blanco y marrón",
    peso: 8.5,
    castrado: true,
    lugarorigen: "Av. Rivadavia 4500, CABA",
    estado: "EN_TRANSITO",
    fechaingreso: "2025-11-02",
    lactante: false,
    costoTotal: 48200,
    veterinariaId: 101,
    responsable: { idpersona: 201, nombre: "Ana González", tipo: "TRANSITANTE" },
    alertasMedicas: [
      { label: "Sobre quíntuple vencida", vencida: true },
      { label: "Rabia vencida", vencida: true },
    ],
    enTratamiento: false,
    enSeguimiento: false,
  },
  {
    idanimal: 2,
    idespecie: 2,
    nombre: "Mochi",
    sexo: "MACHO",
    edadestimada: 2,
    colorpelaje: "Gris perla",
    peso: 4.2,
    castrado: true,
    lugarorigen: "Parque Centenario, CABA",
    estado: "EN_ADOPCION",
    fechaingreso: "2026-01-15",
    lactante: false,
    costoTotal: 31500,
    veterinariaId: 102,
    responsable: { idpersona: 202, nombre: "Laura Pérez", tipo: "TRANSITANTE" },
    alertasMedicas: [
      { label: "Desparasitación interna en 30d", vencida: false },
      { label: "En tratamiento", vencida: false },
    ],
    enTratamiento: true,
    enSeguimiento: false,
  },
  {
    idanimal: 3,
    idespecie: 3,
    nombre: "Tobi",
    sexo: "MACHO",
    edadestimada: 4,
    colorpelaje: "Dorado",
    peso: 28,
    castrado: true,
    lugarorigen: "Ruta 8 km 45, Pilar",
    estado: "ADOPTADO",
    fechaingreso: "2025-04-10",
    lactante: false,
    costoTotal: 62400,
    veterinariaId: 101,
    responsable: { idpersona: 203, nombre: "Familia Romero (adoptante)", tipo: "ADOPTANTE" },
    alertasMedicas: [{ label: "Sobre vigente en 14d", vencida: false }],
    enTratamiento: false,
    enSeguimiento: false,
  },
  {
    idanimal: 4,
    idespecie: 4,
    nombre: "Roque",
    sexo: "MACHO",
    edadestimada: 5,
    colorpelaje: "Atigrado",
    peso: 22,
    castrado: false,
    lugarorigen: "Barrio La Cava, San Isidro",
    estado: "ADOPTADO",
    fechaingreso: "2024-08-20",
    lactante: false,
    costoTotal: 19800,
    veterinariaId: 103,
    responsable: { idpersona: 204, nombre: "Carlos Méndez", tipo: "TRANSITANTE" },
    alertasMedicas: [{ label: "Desparasitación interna en 8d", vencida: false }],
    enTratamiento: false,
    enSeguimiento: true,
  },
  {
    idanimal: 5,
    idespecie: 5,
    nombre: "Kiara",
    sexo: "HEMBRA",
    edadestimada: 1,
    colorpelaje: "Crema y marrón",
    peso: 3.1,
    castrado: false,
    lugarorigen: "Av. Cabildo 3200, CABA",
    estado: "AVISTADO",
    fechaingreso: "2026-02-01",
    lactante: true,
    costoTotal: 4200,
    veterinariaId: null,
    responsable: null,
    alertasMedicas: [{ label: "Sin controles registrados", vencida: true }],
    enTratamiento: false,
    enSeguimiento: false,
  },
  {
    idanimal: 6,
    idespecie: 6,
    nombre: "Nala",
    sexo: "HEMBRA",
    edadestimada: 6,
    colorpelaje: "Negro",
    peso: 26,
    castrado: true,
    lugarorigen: "Ruta 2 km 88, La Plata",
    estado: "RESCATADO",
    fechaingreso: "2026-06-18",
    lactante: false,
    costoTotal: 15300,
    veterinariaId: 102,
    responsable: null,
    alertasMedicas: [{ label: "Vacuna quíntuple aplicada", vencida: false }],
    enTratamiento: false,
    enSeguimiento: false,
  },
  {
    idanimal: 7,
    idespecie: 7,
    nombre: "Simón",
    sexo: "MACHO",
    edadestimada: 2,
    colorpelaje: "Blanco",
    peso: 9.8,
    castrado: true,
    lugarorigen: "Villa Devoto, CABA",
    estado: "EN_TRANSITO",
    fechaingreso: "2026-03-05",
    lactante: false,
    costoTotal: 27600,
    veterinariaId: 101,
    responsable: { idpersona: 206, nombre: "Sofía Torres", tipo: "TRANSITANTE" },
    alertasMedicas: [{ label: "En tratamiento", vencida: false }],
    enTratamiento: true,
    enSeguimiento: false,
  },
  {
    idanimal: 8,
    idespecie: 1,
    nombre: "Coco",
    sexo: "MACHO",
    edadestimada: 7,
    colorpelaje: "Marrón",
    peso: 12.4,
    castrado: true,
    lugarorigen: "Moreno, Buenos Aires",
    estado: "ADOPTADO",
    fechaingreso: "2023-12-01",
    lactante: false,
    costoTotal: 9700,
    veterinariaId: 103,
    responsable: { idpersona: 205, nombre: "Marcos Ibáñez", tipo: "ADOPTANTE" },
    alertasMedicas: [],
    enTratamiento: false,
    enSeguimiento: false,
  },
  {
    idanimal: 9,
    idespecie: 2,
    nombre: "Michi",
    sexo: "HEMBRA",
    edadestimada: 3,
    colorpelaje: "Naranja",
    peso: 3.9,
    castrado: true,
    lugarorigen: "Quilmes, Buenos Aires",
    estado: "EN_ADOPCION",
    fechaingreso: "2026-05-22",
    lactante: false,
    costoTotal: 21100,
    veterinariaId: 102,
    responsable: { idpersona: 202, nombre: "Laura Pérez", tipo: "TRANSITANTE" },
    alertasMedicas: [{ label: "Rabia en 5d", vencida: false }],
    enTratamiento: false,
    enSeguimiento: false,
  },
  {
    idanimal: 10,
    idespecie: 4,
    nombre: "Thor",
    sexo: "MACHO",
    edadestimada: 4,
    colorpelaje: "Negro y blanco",
    peso: 24,
    castrado: false,
    lugarorigen: "Tigre, Buenos Aires",
    estado: "EN_TRANSITO",
    fechaingreso: "2026-04-11",
    lactante: false,
    costoTotal: 33900,
    veterinariaId: 101,
    responsable: { idpersona: 201, nombre: "Ana González", tipo: "TRANSITANTE" },
    alertasMedicas: [{ label: "Sobre quíntuple vencida", vencida: true }],
    enTratamiento: false,
    enSeguimiento: false,
  },
  {
    idanimal: 11,
    idespecie: 3,
    nombre: "Bella",
    sexo: "HEMBRA",
    edadestimada: 1,
    colorpelaje: "Dorado claro",
    peso: 15,
    castrado: false,
    lugarorigen: "San Justo, Buenos Aires",
    estado: "AVISTADO",
    fechaingreso: "2026-07-30",
    lactante: false,
    costoTotal: 2100,
    veterinariaId: null,
    responsable: null,
    alertasMedicas: [{ label: "Sin controles registrados", vencida: true }],
    enTratamiento: false,
    enSeguimiento: false,
  },
  {
    idanimal: 12,
    idespecie: 7,
    nombre: "Pancho",
    sexo: "MACHO",
    edadestimada: 8,
    colorpelaje: "Marrón y blanco",
    peso: 18,
    castrado: true,
    lugarorigen: "Morón, Buenos Aires",
    estado: "ADOPTADO",
    fechaingreso: "2022-02-14",
    lactante: false,
    costoTotal: 5400,
    veterinariaId: 103,
    responsable: { idpersona: 203, nombre: "Familia Romero (adoptante)", tipo: "ADOPTANTE" },
    alertasMedicas: [],
    enTratamiento: false,
    enSeguimiento: true,
  },
  {
    idanimal: 13,
    idespecie: 5,
    nombre: "Salem",
    sexo: "MACHO",
    edadestimada: 2,
    colorpelaje: "Negro",
    peso: 4.5,
    castrado: true,
    lugarorigen: "Vicente López, Buenos Aires",
    estado: "EN_ADOPCION",
    fechaingreso: "2026-06-02",
    lactante: false,
    costoTotal: 17800,
    veterinariaId: 102,
    responsable: { idpersona: 206, nombre: "Sofía Torres", tipo: "TRANSITANTE" },
    alertasMedicas: [{ label: "En tratamiento", vencida: false }],
    enTratamiento: true,
    enSeguimiento: false,
  },
  {
    idanimal: 14,
    idespecie: 6,
    nombre: "Maggie",
    sexo: "HEMBRA",
    edadestimada: 5,
    colorpelaje: "Dorado",
    peso: 27,
    castrado: true,
    lugarorigen: "Escobar, Buenos Aires",
    estado: "FALLECIDO",
    fechaingreso: "2021-09-09",
    lactante: false,
    costoTotal: 41200,
    veterinariaId: 101,
    responsable: null,
    alertasMedicas: [],
    enTratamiento: false,
    enSeguimiento: false,
  },
];

// ---- Detalle extendido (para DetalleAnimal.jsx) --------------------------
// Simula lo que traería un GET /api/animales/:id con más relaciones anidadas.

export const HISTORIAL_CLINICO_MOCK = {
  1: [
    {
      idhistorial: 1001,
      fecha: "2026-08-10T10:00:00",
      descripcion: "Control general de rutina, buen estado nutricional.",
      tipo: "ESTUDIO",
      responsable: "Veterinaria San Roque",
    },
    {
      idhistorial: 1002,
      fecha: "2026-05-02T09:30:00",
      descripcion: "Aplicación de vacuna quíntuple, primera dosis.",
      tipo: "VACUNA",
      responsable: "Veterinaria San Roque",
    },
  ],
  2: [
    {
      idhistorial: 2001,
      fecha: "2026-08-20T14:00:00",
      descripcion: "Inicio de tratamiento por otitis, medicación oral 10 días.",
      tipo: "TRATAMIENTO",
      responsable: "Clínica Huellitas",
    },
  ],
  3: [
    {
      idhistorial: 3001,
      fecha: "2026-03-01T11:00:00",
      descripcion: "Desparasitación interna y externa.",
      tipo: "DESPARASITACION",
      responsable: "Veterinaria San Roque",
    },
  ],
  4: [
    {
      idhistorial: 4001,
      fecha: "2026-07-15T16:00:00",
      descripcion: "Seguimiento post adopción, adaptación favorable.",
      tipo: "ESTUDIO",
      responsable: "Veterinaria del Parque",
    },
  ],
};

export const GASTOS_MOCK = {
  1: [
    { idgasto: 1, descripcion: "Vacuna quíntuple", monto: 12000, fecha: "2026-05-02", tipo: "Sanidad" },
    { idgasto: 2, descripcion: "Alimento balanceado 15kg", monto: 26200, fecha: "2026-06-01", tipo: "Alimentación" },
    { idgasto: 3, descripcion: "Consulta de control", monto: 10000, fecha: "2026-08-10", tipo: "Sanidad" },
  ],
  2: [
    { idgasto: 4, descripcion: "Tratamiento otitis", monto: 18500, fecha: "2026-08-20", tipo: "Sanidad" },
    { idgasto: 5, descripcion: "Alimento húmedo x12", monto: 13000, fecha: "2026-08-01", tipo: "Alimentación" },
  ],
  3: [{ idgasto: 6, descripcion: "Castración", monto: 62400, fecha: "2025-04-15", tipo: "Sanidad" }],
  4: [{ idgasto: 7, descripcion: "Desparasitación", monto: 19800, fecha: "2024-08-25", tipo: "Sanidad" }],
};

export function getAnimalPorId(id) {
  return ANIMALES.find((a) => String(a.idanimal) === String(id)) || null;
}

// ---- Mutaciones (simulan POST /PUT /DELETE /api/animales) ----------------
// Centralizadas acá para que CrearAnimal.jsx y EditarAnimal.jsx compartan la
// misma transformación "formulario -> payload del modelo Animal", y para
// que el día de mañana alcance con reemplazar el cuerpo de estas tres
// funciones por llamadas fetch/axios reales sin tocar los componentes.
 
/** Convierte los valores planos del formulario en el shape que espera el modelo Animal. */
function construirDatosAnimal(form) {
  return {
    idespecie: Number(form.idespecie),
    nombre: form.nombre.trim(),
    sexo: form.sexo,
    edadestimada: Number(form.edadestimada),
    colorpelaje: form.colorpelaje.trim(),
    peso: Number(form.peso),
    castrado: form.castrado,
    lugarorigen: form.lugarorigen.trim(),
    estado: form.estado,
    fechaingreso: form.fechaingreso,
    lactante: form.lactante,
    veterinariaId: form.veterinariaId ? Number(form.veterinariaId) : null,
    responsable: form.responsableId
      ? RESPONSABLES_HOGAR.find((r) => String(r.idpersona) === form.responsableId) ?? null
      : null,
  };
}
 
/** Simula POST /api/animales. Devuelve el animal creado. */
export function crearAnimal(form) {
  const nuevo = {
    idanimal: ANIMALES.length ? Math.max(...ANIMALES.map((a) => a.idanimal)) + 1 : 1,
    ...construirDatosAnimal(form),
    costoTotal: 0,
    alertasMedicas: [],
    enTratamiento: false,
    enSeguimiento: false,
  };
  ANIMALES.push(nuevo);
  return nuevo;
}
 
/** Simula PUT /api/animales/:id. Devuelve el animal actualizado, o null si no existe. */
export function editarAnimal(id, form) {
  const idx = ANIMALES.findIndex((a) => String(a.idanimal) === String(id));
  if (idx === -1) return null;
  ANIMALES[idx] = { ...ANIMALES[idx], ...construirDatosAnimal(form) };
  return ANIMALES[idx];
}
 
/** Simula DELETE /api/animales/:id. Devuelve true si se eliminó, false si no existía. */
export function eliminarAnimal(id) {
  const idx = ANIMALES.findIndex((a) => String(a.idanimal) === String(id));
  if (idx === -1) return false;
  ANIMALES.splice(idx, 1);
  return true;
}
 