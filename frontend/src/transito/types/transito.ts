
export type EstadoHogar =
  | "DISPONIBLE"
  | "OCUPADO"
  | "PAUSADO"
  | "NO_DISPONIBLE";

export type TipoAnimal =
  | "PERRO"
  | "GATO"
  | "AMBOS";

export type EstadoTransito =
  | "ACTIVO"
  | "FINALIZADO"
  | "CANCELADO";

export type MotivoEgreso =
  | "ADOPCION"
  | "DEVOLUCION"
  | "TRASPASO";

export type EstadoPostulacion =
  | "PENDIENTE"
  | "EN_EVALUACION"
  | "APROBADA"
  | "RECHAZADA";

export interface HogarTransito {
  id: string;

  nombreTransitante: string;
  apellidoTransitante: string;
  telefono: string;

  direccion: string;
  localidad: string;

  tipoVivienda: string;

  tipoAnimal: TipoAnimal;

  capacidad: number;
  ocupacion: number;

  estado: EstadoHogar;

  restricciones: string[];

  tieneOtrasMascotas: boolean;
}

export interface Transito {
  id: string;

  hogarId: string;
  animalId: string;

  nombreAnimal: string;

  fechaInicio: string;
  fechaFinEstimada?: string;
  fechaFinReal?: string;

  observaciones?: string;
  motivoCancelacion?: string;
  reportesSalud?: {
    fecha: string;
    detalle: string;
  }[];

  estado: EstadoTransito;

  motivoEgreso?: MotivoEgreso;
}

export interface PostulacionTransito {
  id: string;

  nombre: string;
  apellido: string;

  telefono: string;
  email: string;

  localidad: string;

  tipoVivienda: string;

  horariosAusencia: string;
  tienePatio: boolean;
  consentimientoFamiliar: boolean;
  tieneOtrasMascotas: boolean;
  detalleOtrasMascotas: string;

  experienciaPrevia: boolean;
  tipoAnimal: TipoAnimal;

  estado: EstadoPostulacion;

  fechaPostulacion: string;
}
