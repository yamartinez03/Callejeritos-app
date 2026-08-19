import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
            <span className="font-medium text-black">{gasto.animalNombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Categoría</span>
            <span className="capitalize text-black">
              {gasto.categoria.toLowerCase().replaceAll("_", " ")}
            </span>
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
            <span className="text-gray-500">Proveedor</span>
            <span className="text-black">{gasto.proveedor ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Cargado por</span>
            <span className="text-black">{gasto.cargadoPor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Comprobante</span>
            <span className="text-black">
              {gasto.comprobanteUrl ? "Adjunto" : "Sin adjuntar"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estado</span>
            <span className="font-medium text-black">{gasto.estado}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
