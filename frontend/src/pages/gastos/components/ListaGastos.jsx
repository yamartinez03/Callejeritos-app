import TarjetaGasto from "./TarjetaGasto";

/**
 * ListaGastos
 * Usada en la vista "Todos los gastos".
 * Pasa puedeReintegrar y onReintegrar a cada TarjetaGasto.
 */
export default function ListaGastos({
  gastos,
  onVerMas,
  onAceptar,
  onRechazar,
  onReintegrar,
  puedeModerar,
  puedeReintegrar,
}) {
  if (gastos.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-10 text-center text-muted-foreground">
        <p className="text-4xl mb-2 opacity-40">🐾</p>
        <p className="text-sm">No hay gastos para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {gastos.map((gasto) => (
        <TarjetaGasto
          key={gasto.idgasto}
          gasto={gasto}
          onVerMas={onVerMas}
          onAceptar={onAceptar}
          onRechazar={onRechazar}
          onReintegrar={onReintegrar}
          puedeModerar={puedeModerar}
          puedeReintegrar={puedeReintegrar}
        />
      ))}
    </div>
  );
}