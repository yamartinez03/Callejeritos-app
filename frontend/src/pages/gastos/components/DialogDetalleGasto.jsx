import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// aceptado: null = pendiente | true = aceptado | false = rechazado
function textoEstado(aceptado) {
  if (aceptado === null) return "Pendiente de revisión";
  return aceptado ? "Aceptado" : "Rechazado";
}

export default function DialogDetalleGasto({ abierto, gasto, onCerrar }) {
  if (!gasto) return null;

  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{gasto.descripcion}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Animal</span>
            <span className="font-medium text-black">{gasto.animal.nombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tipo de gasto</span>
            <span className="text-black">{gasto.tipogasto.nombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Monto</span>
            <span className="font-medium text-black">
              ${Number(gasto.monto).toLocaleString("es-AR")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Fecha</span>
            <span className="text-black">{gasto.fecha}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Comprobante</span>
            <span className="text-black">{gasto.comprobante}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Reintegrado</span>
            <span className="text-black">{gasto.reintegrado ? "Sí" : "No"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estado</span>
            <span className="font-medium text-black">
              {textoEstado(gasto.aceptado)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}