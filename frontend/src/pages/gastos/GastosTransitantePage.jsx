import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import KpisGastos from "./components/KpisGastos";
import FiltroVista from "./components/FiltroVista";
import FiltroEstado from "./components/FiltroEstado";
import ListaGastos from "./components/ListaGastos";
import ListaGastosAnimal from "./components/ListaGastosAnimal";
import CabeceraPorAnimal from "./components/CabeceraPorAnimal";
import DialogDetalleGasto from "./components/DialogDetalleGasto";
import DialogNuevoGasto from "./components/DialogNuevoGasto";

// TODO: reemplazar por fetch a GET /api/animales/mis-animales
const animalesTransitanteMock = [
  { idanimal: 1, nombre: "Luna", especieanimal: { nombre: "Perro" }, sexo: "HEMBRA", edadestimada: 2, fotoUrl: null },
];

// TODO: reemplazar por fetch a GET /api/gastos/mis-gastos
const gastosMockTransitante = [
  {
    idgasto: 2,
    animal: { idanimal: 1, nombre: "Luna", especieanimal: { nombre: "Perro" }, sexo: "HEMBRA", edadestimada: 2, fotoUrl: null },
    tipogasto: { idtipogasto: 3, nombre: "Medicación" },
    descripcion: "Medicación post-consulta",
    monto: 3200, fecha: "2026-06-12", comprobante: "comprobante_luna_02.jpg",
    reintegrado: false, aceptado: null,
  },
  {
    idgasto: 5,
    animal: { idanimal: 1, nombre: "Luna", especieanimal: { nombre: "Perro" }, sexo: "HEMBRA", edadestimada: 2, fotoUrl: null },
    tipogasto: { idtipogasto: 1, nombre: "Consulta veterinaria" },
    descripcion: "Control mensual",
    monto: 5500, fecha: "2026-07-01", comprobante: "comprobante_luna_03.jpg",
    reintegrado: false, aceptado: true,
  },
];

let siguienteId = 100;

function aplicarFiltroEstado(gastos, filtro) {
  switch (filtro) {
    case "pendienteAprobar":   return gastos.filter((g) => g.aceptado === null  && g.reintegrado === false);
    case "aprobados":          return gastos.filter((g) => g.aceptado === true);
    case "rechazados":         return gastos.filter((g) => g.aceptado === false && g.reintegrado === false);
    case "reintegrados":       return gastos.filter((g) => g.aceptado === true  && g.reintegrado === true);
    case "pendienteReintegro": return gastos.filter((g) => g.aceptado === true  && g.reintegrado === false);
    default:                   return gastos;
  }
}



export default function GastosTransitantePage() {
  const [gastos, setGastos]               = useState(gastosMockTransitante);
  const [vista, setVista]                 = useState("todos");
  const [filtroEstado, setFiltroEstado]   = useState("todos");
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [gastoDetalle, setGastoDetalle]   = useState(null);
  const [abrirNuevoGasto, setAbrirNuevoGasto] = useState(false);

  // KPIs del transitante
  const totalAcumulado     = gastos.reduce((s, g) => s + Number(g.monto), 0);
  const reintegrado        = gastos.filter((g) => g.reintegrado).reduce((s, g) => s + Number(g.monto), 0);
  const pendienteReintegro = gastos.filter((g) => !g.reintegrado).reduce((s, g) => s + Number(g.monto), 0);
  const pendienteAprobar   = gastos.filter((g) => g.aceptado === null).length;

  const gastosParaTodos = aplicarFiltroEstado(gastos, filtroEstado);

  const gastosPorAnimal = animalSeleccionado
    ? aplicarFiltroEstado(
        gastos.filter((g) => g.animal.idanimal === animalSeleccionado.idanimal),
        filtroEstado
      )
    : [];

  const totalAnimal = animalSeleccionado
    ? gastos
        .filter((g) => g.animal.idanimal === animalSeleccionado.idanimal)
        .reduce((s, g) => s + Number(g.monto), 0)
    : 0;

  const handleCambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setFiltroEstado("todos");
    if (nuevaVista === "todos") setAnimalSeleccionado(null);
  };

  const handleSeleccionarAnimal = (animal) => {
    setAnimalSeleccionado(animal);
    setFiltroEstado("todos");
  };

  const handleGuardar = (nuevoGasto) => {
    setGastos((prev) => [{ idgasto: siguienteId++, ...nuevoGasto }, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 flex items-center justify-between sm:px-6">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">Mis Gastos</h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Gastos de tus animales en tránsito
          </p>
        </div>
        <Button size="lg" onClick={() => setAbrirNuevoGasto(true)}>
          + Nuevo gasto
        </Button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5 sm:px-6 sm:py-8">
        {/* KPIs */}
        <KpisGastos
          totalAcumulado={totalAcumulado}
          reintegrado={reintegrado}
          pendienteReintegro={pendienteReintegro}
          pendienteAprobar={pendienteAprobar}
        />

        {/* Selector de vista + buscador de animal inline */}
        <FiltroVista
          vistaActiva={vista}
          onCambiarVista={handleCambiarVista}
          animalSeleccionado={animalSeleccionado}
          onSeleccionarAnimal={handleSeleccionarAnimal}
          onLimpiarAnimal={() => {
            setAnimalSeleccionado(null);
            setFiltroEstado("todos");
          }}
          // animalesPropios: el transitante solo ve sus propios animales
          animalesPropios={animalesTransitanteMock}
        />

        {/* ── VISTA: TODOS LOS GASTOS ── */}
        {vista === "todos" && (
          <>
            <FiltroEstado
              filtroActivo={filtroEstado}
              onCambiarFiltro={setFiltroEstado}
            />
            <ListaGastos
              gastos={gastosParaTodos}
              onVerMas={setGastoDetalle}
              onAceptar={() => {}}
              onRechazar={() => {}}
              puedeModerar={false}
            />
          </>
        )}

        {/* ── VISTA: GASTOS POR ANIMAL ── */}
        {vista === "porAnimal" && (
          <>
            {animalSeleccionado ? (
              <>
                <FiltroEstado filtroActivo={filtroEstado} onCambiarFiltro={setFiltroEstado} />
                <CabeceraPorAnimal animal={animalSeleccionado} totalGastos={totalAnimal} />
                <ListaGastosAnimal
                  gastos={gastosPorAnimal}
                  onAceptar={() => {}}
                  onRechazar={() => {}}
                  puedeModerar={false}
                />
              </>
            ) : (
              <div className="bg-card border border-border rounded-xl p-10 text-center text-muted-foreground">
                <Search className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Buscá uno de tus animales para ver sus gastos.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modales */}
      <DialogDetalleGasto
        abierto={!!gastoDetalle}
        gasto={gastoDetalle}
        onCerrar={() => setGastoDetalle(null)}
      />
      <DialogNuevoGasto
        abierto={abrirNuevoGasto}
        onCerrar={() => setAbrirNuevoGasto(false)}
        onGuardar={handleGuardar}
        animales={animalesTransitanteMock}
      />
    </div>
  );
}