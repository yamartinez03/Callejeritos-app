// Datos de ejemplo — simulan Responsable + Veterinaria/ProfesionalVeterinario
// y el catálogo de ServicioOfrecido del schema.

export const catalogoServicios = [
  "Consulta general",
  "Vacunación",
  "Cirugía",
  "Internación",
  "Estudios por imágenes",
  "Urgencias",
]

export const veterinariasIniciales = [
  {
    id: 1,
    nombre: "Instituto Médico Veterinario City Bell",
    telefono: "221-364-1339",
    whatsapp: "221-601-1249",
    instagram: "https://www.instagram.com/imv.citybell/?hl=es",
    email: "imv.citybell@gmail.com",
    direccion: "471, C. 14 C esq, B1896QMG City Bell",
    servicios: ["Consulta general", "Vacunación", "Cirugía", "Urgencias"],
  },
  {
    id: 2,
    nombre: "Vet. Castillo",
    telefono: "221-455-2020",
    whatsapp: "",
    instagram: "",
    email: "info@vetcastillo.com",
    direccion: "Calle 13 n° 640, La Plata",
    servicios: ["Consulta general", "Vacunación", "Estudios por imágenes"],
  },
]

export const profesionalesIniciales = [
  {
    id: 1,
    nombre: "Dr. Ramírez",
    telefono: "221-666-1111",
    whatsapp: "",
    instagram: "",
    email: "ramirez.vet@gmail.com",
    especialidad: "Clínica general",
  },
  {
    id: 2,
    nombre: "Dra. Suárez",
    telefono: "221-666-2222",
    whatsapp: "",
    instagram: "",
    email: "suarez.vet@gmail.com",
    especialidad: "Cirugía",
  },
]

export function siguienteId(lista) {
  return lista.reduce((max, item) => Math.max(max, item.id), 0) + 1
}
