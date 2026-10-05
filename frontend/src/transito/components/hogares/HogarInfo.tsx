import {
  MapPin,
  Phone,
  Home,
  Users,
  Dog,
  Cat,
} from "lucide-react";

import type { HogarTransito } from "../../types/transito";
import { HogarStatusBadge } from "./HogarStatusBadge";
import { CapacityBar } from "./CapacityBar";

interface HogarInfoProps {
  hogar: HogarTransito;
}

export function HogarInfo({ hogar }: HogarInfoProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {hogar.nombreTransitante}{" "}
              {hogar.apellidoTransitante}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Hogar de Tránsito #{hogar.id}
            </p>
          </div>

          <HogarStatusBadge estado={hogar.estado} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-4 font-semibold text-gray-800">
            Datos de contacto
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-3">
              <Phone size={18} />
              {hogar.telefono}
            </div>

            <div className="flex gap-3">
              <MapPin size={18} />
              {hogar.direccion}, {hogar.localidad}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-4 font-semibold text-gray-800">
            Características
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-3">
              <Home size={18} />
              Hogar registrado
            </div>

            <div className="flex gap-3">
              <Users size={18} />
              Capacidad: {hogar.capacidad} animales
            </div>

            <div className="flex items-center gap-3">
              {hogar.tipoAnimal === "PERRO" && (
                <>
                  <Dog size={18} />
                  Acepta perros
                </>
              )}

              {hogar.tipoAnimal === "GATO" && (
                <>
                  <Cat size={18} />
                  Acepta gatos
                </>
              )}

              {hogar.tipoAnimal === "AMBOS" && (
                <>
                  <Dog size={18} />
                  <Cat size={18} />
                  Acepta perros y gatos
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="mb-4 font-semibold text-gray-800">
          Ocupación actual
        </h3>

        <CapacityBar
          ocupacion={hogar.ocupacion}
          capacidad={hogar.capacidad}
        />
      </div>
    </div>
  );
}