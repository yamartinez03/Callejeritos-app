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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const estadoInicial = {
  nombre: "",
  tipo: "",
  stock: "",
  fechaVencimiento: "",
  descripcion: "",
  // campos de medicamento
  numerolote: "",
  concentracion: "",
  viaadministracion: "",
  // campos de alimento
  marca: "",
  tipoalimento: "",
  peso: "",
  idespecie: "", //se debe traer la tabla de especies desde el back
};

export default function DialogNuevoInsumo({ abierto, onCerrar }) {
  const [form, setForm] = useState(estadoInicial);

  const handleCambio = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleTipoCambio = (valor) => {
    // Al cambiar el tipo reseteamos los campos específicos
    setForm((prev) => ({
      ...estadoInicial,
      nombre: prev.nombre,
      stock: prev.stock,
      fechaVencimiento: prev.fechaVencimiento,
      descripcion: prev.descripcion,
      tipo: valor,
    }));
  };

  const handleGuardar = () => {
    if (!form.nombre || !form.tipo || !form.stock || !form.fechaVencimiento) {
      alert("Completá los campos obligatorios");
      return;
    }
    if (form.tipo === "medicamento") {
      if (!form.concentracion || !form.viaadministracion) {
        alert("Completá todos los campos del medicamento");
        return;
      }
    }
    if (form.tipo === "alimento") {
      if (!form.tipoalimento || !form.peso || !form.idespecie) {
        alert("Completá todos los campos del alimento");
        return;
      }
    }
    // Acá va la llamada al backend
    console.log(form);
    setForm(estadoInicial);
    onCerrar();
  };

  const handleCerrar = () => {
    setForm(estadoInicial);
    onCerrar();
  };

  return (
    <Dialog open={abierto} onOpenChange={handleCerrar}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-[90vw] lg:!max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo insumo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* Campos comunes */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Nombre *
            </label>
            <Input
              placeholder="Ej: Amoxicilina"
              value={form.nombre}
              onChange={(e) => handleCambio("nombre", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Descripción
            </label>
            <Input
              placeholder="Ej: Antibiótico de amplio espectro"
              value={form.descripcion}
              onChange={(e) => handleCambio("descripcion", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Tipo *
            </label>
            <Select onValueChange={handleTipoCambio}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Medicamento">Medicamento</SelectItem>
                <SelectItem value="Alimento">Alimento</SelectItem>
                <SelectItem value="Insumo">Insumo general</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Stock inicial *
              </label>
              <Input
                type="number"
                min="0"
                placeholder="Ej: 10"
                value={form.stock}
                onChange={(e) => handleCambio("stock", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Fecha de vencimiento *
            </label>
            <Input
              type="date"
              value={form.fechaVencimiento}
              onChange={(e) => handleCambio("fechaVencimiento", e.target.value)}
            />
          </div>

          {/* Campos específicos de medicamento */}
          {form.tipo === "Medicamento" && (
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
              <p className="text-sm font-semibold text-gray-700">
                Datos del medicamento
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Número de lote
                  </label>
                  <Input
                    placeholder="Ej: L-2024-001"
                    value={form.numerolote}
                    onChange={(e) => handleCambio("numerolote", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Concentración *
                  </label>
                  <Input
                    placeholder="Ej: 500mg"
                    value={form.concentracion}
                    onChange={(e) =>
                      handleCambio("concentracion", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Vía de administración *
                </label>
                <Select
                  onValueChange={(val) =>
                    handleCambio("viaadministracion", val)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná una vía" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ORAL">Oral</SelectItem>
                    <SelectItem value="INTRAVENOSA">Intravenosa</SelectItem>
                    <SelectItem value="CUTANEA">Cutánea</SelectItem>
                    <SelectItem value="SUBCUTANEA">Subcutánea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Campos específicos de alimento */}
          {form.tipo === "Alimento" && (
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
              <p className="text-sm font-semibold text-gray-700">
                Datos del alimento
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Marca
                  </label>
                  <Input
                    placeholder="Ej: Royal Canin"
                    value={form.marca}
                    onChange={(e) => handleCambio("marca", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Peso (kg) *
                  </label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Ej: 15"
                    value={form.peso}
                    onChange={(e) => handleCambio("peso", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Tipo de alimento *
                </label>
                <Select
                  onValueChange={(val) => handleCambio("tipoalimento", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SECO">Seco</SelectItem>
                    <SelectItem value="HUMEDO">Húmedo</SelectItem>
                    <SelectItem value="FRESCO">Fresco</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Especie destino
                </label>
                <Select onValueChange={(val) => handleCambio("idespecie", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná una especie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Perro</SelectItem>
                    <SelectItem value="2">Gato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCerrar}>
            Cancelar
          </Button>
          <Button onClick={handleGuardar}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
