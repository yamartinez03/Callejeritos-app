import { useState } from "react";
import { Button } from "@/components/ui/button";
import TablaGastos from "./components/TablaGastos";
import FiltroEstado from "./components/FiltroEstado";
import DialogNuevoGasto from "./components/DialogNuevoGasto";

// Datos de prueba hasta conectar con el backend (GG_01/GG_03 en gastoController.js)
const gastosMock = [
  {
    id: 1,
    animalId: "luna",
    animalNombre: "Luna",
    fecha: "2026-06-12",
    monto: 8500,
    categoria: "CONSULTA_VETERINARIA",
    descripcion: "Consulta veterinaria urgente",
    proveedor: "Vet. Pellegrino",
    cargadoPor: "Ana González",
    estado: "APROBADO",
    comprobanteUrl: null,
  },
  {
    id: 2,
    animalId: "luna",
    animalNombre: "Luna",
    fecha: "2026-06-12",
    monto: 3200,
    categoria: "MEDICACION",
    descripcion: "Medicación post-consulta",
    proveedor: "Farmacia veterinaria",
    cargadoPor: "Ana González",
    estado: "PENDIENTE",
    comprobanteUrl: null,
  },
  {
    id: 3,
    animalId: "mochi",
    animalNombre: "Mochi",
    fecha: "2026-06-01",
    monto: 18500,
    categoria: "INTERNACION",
    descripcion: "Castración",
    proveedor: "Vet. Castillo",
    cargadoPor: "Organización",
    estado: "APROBADO",
    comprobanteUrl: null,
  },
  {
    id: 4,
    animalId: "roque",
    animalNombre: "Roque",
    fecha: "2026-05-01",
    monto: 4800,
    categoria: "ALIMENTO",
    descripcion: "Alimento (mes de mayo)",
    proveedor: "Carlos Méndez",
    cargadoPor: "Carlos Méndez",
    estado: "PENDIENTE",
    comprobanteUrl: null,
  },
];

export default function GastosPage() {
  const [gastos, setGastos] = useState(gastosMock);
  const [filtro, setFiltro] = useState("todos");
  const [abrirNuevoGasto, setAbrirNuevoGasto] = useState(false);

  const gastosFiltrados =
    filtro === "todos" ? gastos : gastos.filter((g) => g.estado === filtro);

  const totalAcumulado = gastos.reduce((sum, g) => sum + Number(g.monto), 0);
  const pendientes = gastos.filter((g) => g.estado === "PENDIENTE");
  const totalPendiente = pendientes.reduce((sum, g) => sum + Number(g.monto), 0);

  const handleGuardarGasto = (nuevoGasto) => {
    setGastos((prev) => [
      { id: Date.now(), estado: "PENDIENTE", ...nuevoGasto },
      ...prev,
    ]);
  };

  const handleAprobar = (gasto) => {
    setGastos((prev) =>
      prev.map((g) => (g.id === gasto.id ? { ...g, estado: "APROBADO" } : g))
    );
  };

  const handleRechazar = (gasto) => {
    setGastos((prev) =>
      prev.map((g) => (g.id === gasto.id ? { ...g, estado: "RECHAZADO" } : g))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-black">Gastos</h1>
          <p className="text-sm text-gray-500">
            Gastos imputados por animal y rendición de hogares de tránsito
          </p>
        </div>
        <Button onClick={() => setAbrirNuevoGasto(true)}>
          + Registrar gasto
        </Button>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Resumen */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Gasto total acumulado</p>
            <p className="text-2xl font-bold text-black">
              ${totalAcumulado.toLocaleString("es-AR")}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Pendiente de rendición</p>
            <p className="text-2xl font-bold text-yellow-500">
              ${totalPendiente.toLocaleString("es-AR")}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Comprobantes pendientes</p>
            <p className="text-2xl font-bold text-red-600">
              {pendientes.length}
            </p>
          </div>
        </div>

        {/* Filtro por estado */}
        <FiltroEstado filtroActivo={filtro} onCambiarFiltro={setFiltro} />

        {/* Tabla */}
        <TablaGastos
          gastos={gastosFiltrados}
          onAprobar={handleAprobar}
          onRechazar={handleRechazar}
        />
      </div>

      {/* Modales */}
      <DialogNuevoGasto
        abierto={abrirNuevoGasto}
        onCerrar={() => setAbrirNuevoGasto(false)}
        onGuardar={handleGuardarGasto}
      />
    </div>
  );
}
