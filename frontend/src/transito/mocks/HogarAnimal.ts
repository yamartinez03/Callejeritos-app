export type EstadoHogar =
  | "DISPONIBLE"
  | "OCUPADO"
  | "PAUSADO"
  | "NO_DISPONIBLE";

export type TipoAnimal = "PERRO" | "GATO" | "AMBOS";

export interface HogarTransito {
  id: string;
  nombreTransitante: string;
  apellidoTransitante: string;
  telefono: string;
  direccion: string;
  localidad: string;

  tipoAnimal: TipoAnimal;
  capacidad: number;
  ocupacion: number;

  estado: EstadoHogar;

  restricciones: string[];

  mascotasActuales: number;
}