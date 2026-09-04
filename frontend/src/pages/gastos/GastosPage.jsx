import { useState } from "react";
import { Button } from "@/components/ui/button";
import TablaGastos from "./components/TablaGastos";
import FiltroEstado from "./components/FiltroEstado";
import DialogNuevoGasto from "./components/DialogNuevoGasto";

// Datos de prueba hasta conectar con GET /api/gastos.
// aceptado: null = pendiente | true = aceptado | false = rechazado
const gastosMock = [
  {
    idgasto: 1,
    animal: { idanimal: 1, nombre: "Luna" },
    tipogasto: { idtipogasto: 1, nombre: "Consulta veterinaria" },
    descripcion: "Consulta veterinaria urgente",
    monto: 8500,
    fecha: "2026-06-12",
    comprobante: "comprobante_luna_01.jpg",
    reintegrado: true,
    aceptado: true,
  },
  {
    idgasto: 2,
    animal: { idanimal: 1, nombre: "Luna" },
    tipogasto: { idtipogasto: 3, nombre: "Medicación" },
    descripcion: "Medicación post-consulta",
    monto: 3200,
    fecha: "2026-06-12",
    comprobante: "comprobante_luna_02.jpg",
    reintegrado: false,
    aceptado: null,
  },
  {
    idgasto: 3,
    animal: { idanimal: 2, nombre: "Mochi" },
    tipogasto: { idtipogasto: 2, nombre: "Internación" },
    descripcion: "Castración",
    monto: 18500,
    fecha: "2026-06-01",
    comprobante: "comprobante_mochi_01.jpg",
    reintegrado: true,
    aceptado: true,
  },
  {
    idgasto: 4,
    animal: { idanimal: 3, nombre: "Tobi" },
    tipogasto: { idtipogasto: 4, nombre: "Alimento" },
    descripcion: "Alimento (mes de mayo)",
    monto: 4800,
    fecha: "2026-05-01",
    comprobante: "comprobante_tobi_01.jpg",
    reintegrado: false,
    aceptado: false,
  },
];

let siguienteId = gastosMock.length + 1;

export default function GastosPage() {
  const [gastos, setGastos] = useState(gastosMock);
  const [filtro, setFiltro] = useState("todos");
  const [abrirNuevoGasto, setAbrirNuevoGasto] = useState(false);

  const gastosFiltrados = gastos.filter((g) => {
    if (filtro === "pendientes") return g.aceptado === null;
    if (filtro === "aceptados") return g.aceptado === true;
    if (filtro === "rechazados") return g.aceptado === false;
    return true; // "todos"
  });

  const totalAcumulado = gastos.reduce((sum, g) => sum + Number(g.monto), 0);
  const pendientes = gastos.filter((g) => g.aceptado === null);

  const handleGuardarGasto = (nuevoGasto) => {
    setGastos((prev) => [{ idgasto: siguienteId++, ...nuevoGasto }, ...prev]);
  };

  const handleAceptar = (gasto) => {
    setGastos((prev) =>
      prev.map((g) => (g.idgasto === gasto.idgasto ? { ...g, aceptado: true } : g))
    );
  };

  const handleRechazar = (gasto) => {
    setGastos((prev) =>
      prev.map((g) =>
        g.idgasto === gasto.idgasto ? { ...g, aceptado: false } : g
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-black">Gastos</h1>
          <p className="text-sm text-gray-500">
            Gastos imputados por animal y validación del núcleo operativo
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
            <p className="text-sm text-gray-500">Pendientes de revisión</p>
            <p className="text-2xl font-bold text-yellow-500">
              {pendientes.length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Sin reintegrar</p>
            <p className="text-2xl font-bold text-red-600">
              {gastos.filter((g) => !g.reintegrado).length}
            </p>
          </div>
        </div>

        {/* Filtro por estado de revisión */}
        <FiltroEstado filtroActivo={filtro} onCambiarFiltro={setFiltro} />

        {/* Tabla */}
        <TablaGastos
          gastos={gastosFiltrados}
          onAceptar={handleAceptar}
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