import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { inventarioApi } from "@/services/inventarioService";
import TablaInsumos from "./components/TablaInsumos";
import FiltroTipo from "./components/FiltroTipo";
import DialogNuevoInsumo from "./components/DialogNuevoInsumo";

export default function InventarioPage() {
  const { user } = useAuth();
  const [filtro, setFiltro] = useState("todos");
  const [abrirNuevoInsumo, setAbrirNuevoInsumo] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [stats, setStats] = useState({ total: 0, stockBajo: 0, porVencer: 0 });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const esStaff =
    user?.role === "administrador" || user?.role === "nucleo_operativo";
  const esAdmin = user?.role === "administrador";

  const cargar = useCallback(async () => {
    try {
      setError(null);
      const [lista, estadisticas] = await Promise.all([
        inventarioApi.listar(),
        inventarioApi.estadisticas(),
      ]);
      setInsumos(lista);
      setStats(estadisticas);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await cargar();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const insumosFiltrados =
    filtro === "todos" ? insumos : insumos.filter((i) => i.tipo === filtro);

  const handleCrear = async (form) => {
    await inventarioApi.crear(form);
    await cargar();
  };

  // Mantiene tu firma (insumo, tipo, cantidad, motivo)
  const handleMovimiento = async (insumo, tipo, cantidad, motivo) => {
    try {
      await inventarioApi.registrarMovimiento({
        idinsumo: insumo.id,
        tipo,
        cantidad: Number(cantidad),
        motivo,
        idpersona: user?.idpersona ?? 1, // TEMPORAL: usar solo user.idpersona con el login real
      });
      await cargar();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleEliminar = async (insumo) => {
    try {
      await inventarioApi.darDeBaja(insumo.id);
      await cargar();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--muted)" }}>
      <div className="px-10 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-black">Inventario</h1>
            <p className="text-sm text-gray-500">
              Medicamentos, alimentos e insumos
            </p>
          </div>
          {esStaff && (
            <Button onClick={() => setAbrirNuevoInsumo(true)}>
              + Agregar insumo
            </Button>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            No se pudo cargar el inventario: {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total insumos</p>
            <p className="text-2xl font-bold text-black">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Stock bajo (menos de 5)</p>
            <p className="text-2xl font-bold text-red-600">{stats.stockBajo}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">
              Por vencer (próximos 60 días)
            </p>
            <p className="text-2xl font-bold text-yellow-500">
              {stats.porVencer}
            </p>
          </div>
        </div>

        <FiltroTipo filtroActivo={filtro} onCambiarFiltro={setFiltro} />

        {cargando ? (
          <p className="text-sm text-gray-500">Cargando inventario...</p>
        ) : (
          <TablaInsumos
            insumos={insumosFiltrados}
            onMovimiento={handleMovimiento}
            onEliminar={handleEliminar}
            esStaff={esStaff}
            esAdmin={esAdmin}
          />
        )}
      </div>

      {esStaff && (
        <DialogNuevoInsumo
          abierto={abrirNuevoInsumo}
          onCerrar={() => setAbrirNuevoInsumo(false)}
          onGuardar={handleCrear}
        />
      )}
    </div>
  );
}
