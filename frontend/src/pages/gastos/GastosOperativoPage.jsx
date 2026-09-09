import { useState } from "react";
import { Button } from "@/components/ui/button";
import KpisGastos from "./components/KpisGastos";
import FiltroVista from "./components/FiltroVista";
import FiltroEstado from "./components/FiltroEstado";
import ListaGastos from "./components/ListaGastos";
import ListaGastosAnimal from "./components/ListaGastosAnimal";
import CabeceraPorAnimal from "./components/CabeceraPorAnimal";
import DialogDetalleGasto from "./components/DialogDetalleGasto";
import DialogNuevoGasto from "./components/DialogNuevoGasto";

// TODO: reemplazar por fetch a GET /api/animales
const animalesMock = [
  { idanimal: 1, nombre: "Luna", especieanimal: { nombre: "Perro" }, sexo: "HEMBRA", edadestimada: 2, fotoUrl: null },
  { idanimal: 2, nombre: "Mochi", especieanimal: { nombre: "Gato" }, sexo: "HEMBRA", edadestimada: 1, fotoUrl: null },
  { idanimal: 3, nombre: "Tobi", especieanimal: { nombre: "Perro" }, sexo: "MACHO", edadestimada: 4, fotoUrl: null },
];

// TODO: reemplazar por fetch a GET /api/gastos
const gastosMock = [
  {
    idgasto: 1,
    animal: { idanimal: 1, nombre: "Luna", especieanimal: { nombre: "Perro" }, sexo: "HEMBRA", edadestimada: 2, fotoUrl: null },
    tipogasto: { idtipogasto: 1, nombre: "Consulta veterinaria" },
    descripcion: "Consulta veterinaria urgente",
    monto: 8500, fecha: "2026-06-12", comprobante: "comprobante_luna_01.jpg",
    reintegrado: true, aceptado: true,
  },
  {
    idgasto: 2,
    animal: { idanimal: 1, nombre: "Luna", especieanimal: { nombre: "Perro" }, sexo: "HEMBRA", edadestimada: 2, fotoUrl: null },
    tipogasto: { idtipogasto: 3, nombre: "Medicación" },
    descripcion: "Medicación post-consulta",
    monto: 3200, fecha: "2026-06-12", comprobante: "comprobante_luna_02.jpg",
    reintegrado: false, aceptado: null,
  },
  {
    idgasto: 3,
    animal: { idanimal: 2, nombre: "Mochi", especieanimal: { nombre: "Gato" }, sexo: "HEMBRA", edadestimada: 1, fotoUrl: null },
    tipogasto: { idtipogasto: 2, nombre: "Internación" },
    descripcion: "Castración",
    monto: 18500, fecha: "2026-06-01", comprobante: "comprobante_mochi_01.jpg",
    reintegrado: true, aceptado: true,
  },
  {
    idgasto: 4,
    animal: { idanimal: 3, nombre: "Tobi", especieanimal: { nombre: "Perro" }, sexo: "MACHO", edadestimada: 4, fotoUrl: null },
    tipogasto: { idtipogasto: 4, nombre: "Alimento" },
    descripcion: "Alimento (mes de mayo)",
    monto: 4800, fecha: "2026-05-01", comprobante: "comprobante_tobi_01.jpg",
    reintegrado: false, aceptado: false,
  },
];

let siguienteId = gastosMock.length + 1;

function aplicarFiltroEstado(gastos, filtro) {
  switch (filtro) {
    case "pendienteAprobar":   return gastos.filter((g) => g.aceptado === null);
    case "aprobados":          return gastos.filter((g) => g.aceptado === true);
    case "rechazados":         return gastos.filter((g) => g.aceptado === false);
    case "reintegrados":       return gastos.filter((g) => g.reintegrado === true);
    case "pendienteReintegro": return gastos.filter((g) => g.aceptado === true && g.reintegrado === false);
    default:                   return gastos;
  }
}



export default function GastosOperativoPage() {
  const [gastos, setGastos]               = useState(gastosMock);
  const [vista, setVista]                 = useState("todos");
  const [filtroEstado, setFiltroEstado]   = useState("todos");
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [gastoDetalle, setGastoDetalle]   = useState(null);
  const [abrirNuevoGasto, setAbrirNuevoGasto] = useState(false);

  // KPIs globales
  const totalAcumulado     = gastos.reduce((s, g) => s + Number(g.monto), 0);
  const reintegrado        = gastos.filter((g) => g.reintegrado).reduce((s, g) => s + Number(g.monto), 0);
  const pendienteReintegro = gastos.filter((g) => !g.reintegrado).reduce((s, g) => s + Number(g.monto), 0);
  const pendienteAprobar   = gastos.filter((g) => g.aceptado === null).length;

  // --- Lógica de filtrado ---

  // Vista "todos": solo filtro de estado
  const gastosParaTodos = aplicarFiltroEstado(gastos, filtroEstado);

  // Gastos de la vista "por animal": filtro de animal + filtro de estado
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

  // --- Handlers ---

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

  const handleReintegrar = (gasto) => {
    setGastos((prev) =>
      prev.map((g) =>
        g.idgasto === gasto.idgasto ? { ...g, reintegrado: true } : g
      )
    );
  };

  const handleAceptar = (gasto) => {
    setGastos((prev) =>
      prev.map((g) => (g.idgasto === gasto.idgasto ? { ...g, aceptado: true } : g))
    );
  };

  const handleRechazar = (gasto) => {
    setGastos((prev) =>
      prev.map((g) => (g.idgasto === gasto.idgasto ? { ...g, aceptado: false } : g))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Control de Gastos</h1>
          <p className="text-sm text-muted-foreground">
            Gastos imputados por animal · Validación del núcleo operativo
          </p>
        </div>
        <Button size="lg" onClick={() => setAbrirNuevoGasto(true)}>
          + Nuevo gasto
        </Button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
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
          // animalesPropios no se pasa: el operativo usa la búsqueda global (mock/API)
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
              onAceptar={handleAceptar}
              onRechazar={handleRechazar}
              onReintegrar={handleReintegrar}
              puedeModerar={true}
              puedeReintegrar={true}
            />
          </>
        )}

        {/* ── VISTA: GASTOS POR ANIMAL ── */}
        {vista === "porAnimal" && (
          <>
            {animalSeleccionado ? (
              <>
                <CabeceraPorAnimal animal={animalSeleccionado} totalGastos={totalAnimal} />
                <FiltroEstado filtroActivo={filtroEstado} onCambiarFiltro={setFiltroEstado} />
                <ListaGastosAnimal
                  gastos={gastosPorAnimal}
                  onAceptar={handleAceptar}
                  onRechazar={handleRechazar}
                  onReintegrar={handleReintegrar}
                  puedeModerar={true}
                  puedeReintegrar={true}
                />
              </>
            ) : (
              <div className="bg-card border border-border rounded-xl p-10 text-center text-muted-foreground">
                <p className="text-4xl mb-2 opacity-40">🔍</p>
                <p className="text-sm">Buscá un animal para ver sus gastos.</p>
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
        animales={animalesMock}
      />
    </div>
  );
}