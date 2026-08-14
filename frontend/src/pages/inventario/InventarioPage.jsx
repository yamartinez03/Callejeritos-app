import { useState } from "react";
import { Button } from "@/components/ui/button";
import TablaInsumos from "./components/TablaInsumos";
import FiltroTipo from "./components/FiltroTipo";
import DialogNuevoInsumo from "./components/DialogNuevoInsumo";
import DialogMovimiento from "./components/DialogMovimiento";

//cosas que me faltan revisar: el input de agregar insumo por tipo (alimento, medicamneto)
// y como manejo los movimientos de entrada y salida
// Datos de prueba hasta conectar con el backend
const insumosMock = [
  {
    id: 1,
    nombre: "Amoxicilina",
    descripcion: "Antibiótico para mascotas",
    tipo: "medicamento",
    stock: 5,
    fechaVencimiento: "2026-12-01",
    // atributos de medicamento
    numerolote: "L-2024-001",
    concentracion: "500mg",
    viaadministracion: "Oral",
  },
  {
    id: 2,
    nombre: "Royal Canin adulto",
    descripcion: "Alimento para perros adultos",
    tipo: "alimento",
    stock: 20,
    fechaVencimiento: "2027-03-15",
    // atributos de alimento
    marca: "Royal Canin",
    tipoalimento: "seco",
    peso: "10kg",
    especieDestino: "Perros adultos",
  },
  {
    id: 3,
    nombre: "Shampoo antipulgas",
    descripcion: "Shampoo para el control de pulgas",
    tipo: "insumo",
    stock: 3,
    fechaVencimiento: null,
  },
  {
    id: 4,
    nombre: "Ivermectina",
    descripcion: "Antiparasitario para mascotas",
    tipo: "medicamento",
    stock: 15,
    fechaVencimiento: "2026-09-20",
    numerolote: "L-2024-002",
    concentracion: "1%",
    viaadministracion: "Subcutánea",
  },
  {
    id: 5,
    nombre: "Purina cachorro",
    descripcion: "Alimento para perros cachorros",
    tipo: "alimento",
    stock: 8,
    fechaVencimiento: "2027-01-10",
    marca: "Purina",
    tipoalimento: "seco",
    peso: 8,
  },
];

export default function InventarioPage() {
  const [filtro, setFiltro] = useState("todos");
  const [abrirNuevoInsumo, setAbrirNuevoInsumo] = useState(false);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);
  const [tipoMovimiento, setTipoMovimiento] = useState(null);

  const insumosFiltrados =
    filtro === "todos"
      ? insumosMock
      : insumosMock.filter((i) => i.tipo === filtro);

  const handleMovimiento = (insumo, tipo) => {
    setInsumoSeleccionado(insumo);
    setTipoMovimiento(tipo);
  };

  const cerrarMovimiento = () => {
    setInsumoSeleccionado(null);
    setTipoMovimiento(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-black">Inventario</h1>
          <p className="text-sm text-gray-500">
            Medicamentos, alimentos e insumos
          </p>
        </div>
        <Button onClick={() => setAbrirNuevoInsumo(true)}>
          + Agregar insumo
        </Button>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Resumen de stock */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total insumos</p>
            <p className="text-2xl font-bold text-black">
              {insumosMock.length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Stock bajo (menos de 5)</p>
            <p className="text-2xl font-bold text-red-600">
              {insumosMock.filter((i) => i.stock < 5).length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">
              Por vencer (proximos 60 días)
            </p>
            <p className="text-2xl font-bold text-yellow-500">
              {
                insumosMock.filter((i) => {
                  if (!i.fechaVencimiento) return false;
                  const diff = new Date(i.fechaVencimiento) - new Date();
                  return diff < 1000 * 60 * 60 * 24 * 60;
                }).length
              }
            </p>
          </div>
        </div>

        {/* Filtro por tipo */}
        <FiltroTipo filtroActivo={filtro} onCambiarFiltro={setFiltro} />

        {/* Tabla */}
        <TablaInsumos
          insumos={insumosFiltrados}
          onEntrada={(insumo) => handleMovimiento(insumo, "entrada")}
          onSalida={(insumo) => handleMovimiento(insumo, "salida")}
        />
      </div>

      {/* Modales */}
      <DialogNuevoInsumo
        abierto={abrirNuevoInsumo}
        onCerrar={() => setAbrirNuevoInsumo(false)}
      />

      <DialogMovimiento
        abierto={!!insumoSeleccionado}
        insumo={insumoSeleccionado}
        tipo={tipoMovimiento}
        onCerrar={cerrarMovimiento}
      />
    </div>
  );
}
