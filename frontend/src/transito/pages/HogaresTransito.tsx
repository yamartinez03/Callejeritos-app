
import { useMemo, useState } from "react";
import { Plus, Home, CheckCircle, Users, PauseCircle } from "lucide-react";
import { SectionHeader } from "../components/common/SectionHeader";
import { EmptyState } from "../components/common/EmptyState";
import { FiltrosHogares } from "../components/hogares/FiltrosHogares";
import { HogarTable } from "../components/hogares/HogarTable";

import { mockHogares } from "../mocks/Hogares";
import type { HogarTransito } from "../types/transito";

export function HogaresTransito() {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");

  const hogaresFiltrados = useMemo(() => {
    return mockHogares.filter((hogar) => {
      const nombreCompleto =
        `${hogar.nombreTransitante} ${hogar.apellidoTransitante}`.toLowerCase();

      const coincideBusqueda =
        nombreCompleto.includes(busqueda.toLowerCase());

      const coincideEstado =
        estado === "" || hogar.estado === estado;

      const coincideLocalidad =
        localidad === "" || hogar.localidad === localidad;

      const coincideAnimal =
        tipoAnimal === "" ||
        hogar.tipoAnimal === tipoAnimal;

      return (
        coincideBusqueda &&
        coincideEstado &&
        coincideLocalidad &&
        coincideAnimal
      );
    });
  }, [busqueda, estado, localidad, tipoAnimal]);

  const hogaresDisponibles = mockHogares.filter(
    (hogar) => hogar.estado === "DISPONIBLE",
  ).length;

  const hogaresOcupados = mockHogares.filter(
    (hogar) => hogar.estado === "OCUPADO",
  ).length;

  const hogaresPausados = mockHogares.filter(
    (hogar) => hogar.estado === "PAUSADO",
  ).length;

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstado("");
    setLocalidad("");
    setTipoAnimal("");
  };

  const handleVer = (hogar: HogarTransito) => {
    console.log("Ver hogar:", hogar);
  };

  const handleEditar = (hogar: HogarTransito) => {
    console.log("Editar hogar:", hogar);
  };

  const handleRegistrarTransito = (hogar: HogarTransito) => {
    console.log("Registrar tránsito:", hogar);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Hogares de Tránsito"
        description="Gestioná la disponibilidad, asignación y estado de los hogares de tránsito."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-700"
            onClick={() => console.log("Nuevo hogar")}
          >
            <Plus size={18} />
            Nuevo hogar
          </button>
        }
      />

      {/* Estadísticas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total de hogares
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-800">
                {mockHogares.length}
              </p>
            </div>

            <div className="rounded-lg bg-gray-100 p-3">
              <Home size={22} className="text-gray-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Disponibles
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {hogaresDisponibles}
              </p>
            </div>

            <div className="rounded-lg bg-green-100 p-3">
              <CheckCircle
                size={22}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Ocupados
              </p>

              <p className="mt-1 text-2xl font-bold text-yellow-600">
                {hogaresOcupados}
              </p>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3">
              <Users size={22} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Pausados
              </p>

              <p className="mt-1 text-2xl font-bold text-orange-600">
                {hogaresPausados}
              </p>
            </div>

            <div className="rounded-lg bg-orange-100 p-3">
              <PauseCircle
                size={22}
                className="text-orange-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosHogares
        busqueda={busqueda}
        estado={estado}
        localidad={localidad}
        tipoAnimal={tipoAnimal}
        onBusquedaChange={setBusqueda}
        onEstadoChange={setEstado}
        onLocalidadChange={setLocalidad}
        onTipoAnimalChange={setTipoAnimal}
        onLimpiar={limpiarFiltros}
      />

      {/* Tabla */}
      {hogaresFiltrados.length > 0 ? (
        <HogarTable
          hogares={hogaresFiltrados}
          onVer={handleVer}
          onEditar={handleEditar}
          onRegistrarTransito={handleRegistrarTransito}
        />
      ) : (
        <EmptyState
          title="No se encontraron hogares"
          description="No hay hogares que coincidan con los filtros seleccionados."
          action={
            <button
              type="button"
              onClick={limpiarFiltros}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Limpiar filtros
            </button>
          }
        />
      )}
    </div>
  );
}

