export interface Transito {
  id: string;

  hogarId: string;
  animalId: string;

  fechaInicio: string;
  fechaFinEstimada?: string;
  fechaFinReal?: string;

  observaciones?: string;

  estado: "ACTIVO" | "FINALIZADO";

  motivoEgreso?:
    | "ADOPCION"
    | "DEVOLUCION"
    | "TRASPASO";
}