import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DialogMovimiento({ abierto, insumo, tipo, onCerrar }) {
  const [cantidad, setCantidad] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleConfirmar = () => {
    if (!cantidad || isNaN(cantidad) || Number(cantidad) <= 0) {
      alert("Ingresá una cantidad válida");
      return;
    }
    // Acá va la llamada al backend
    console.log({
      insumo: insumo?.id,
      tipo,
      cantidad: Number(cantidad),
      motivo,
    });
    setCantidad("");
    setMotivo("");
    onCerrar();
  };

  const handleCerrar = () => {
    setCantidad("");
    setMotivo("");
    onCerrar();
  };

  return (
    <Dialog open={abierto} onOpenChange={handleCerrar}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {tipo === "entrada" ? "Registrar entrada" : "Registrar salida"} —{" "}
            {insumo?.nombre}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Cantidad *
            </label>
            <Input
              type="number"
              min="1"
              placeholder="Ej: 5"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Motivo
            </label>
            <Input
              type="text"
              placeholder={
                tipo === "entrada"
                  ? "Ej: Compra, donación"
                  : "Ej: Entrega a transitante"
              }
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCerrar}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmar}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
