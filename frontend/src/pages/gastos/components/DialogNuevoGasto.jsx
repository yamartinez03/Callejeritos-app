import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SelectorAnimal from "./SelectorAnimal";

// TODO: reemplazar por fetch a GET /api/tipos-gasto cuando el endpoint exista.
const tiposGastoMock = [
  { idtipogasto: 1, nombre: "Consulta veterinaria" },
  { idtipogasto: 2, nombre: "Internación" },
  { idtipogasto: 3, nombre: "Medicación" },
  { idtipogasto: 4, nombre: "Alimento" },
  { idtipogasto: 5, nombre: "Traslado" },
];

const formVacio = {
  idanimal: "",
  idtipogasto: "",
  monto: "",
  fecha: "",
  descripcion: "",
};

/**
 * DialogNuevoGasto
 * Usamos un <select> nativo para el tipo de gasto para evitar el bug
 * de shadcn Select que muestra el value (id) en vez del label (nombre)
 * cuando el valor inicial no matchea ningún item al renderizar.
 *
 * @param {{ abierto, onCerrar, onGuardar, animales? }} props
 */
export default function DialogNuevoGasto({ abierto, onCerrar, onGuardar, animales }) {
  const [form, setForm] = useState(formVacio);
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [comprobante, setComprobante] = useState(null);

  const setCampo = (campo, valor) =>
    setForm((prev) => ({ ...prev, [campo]: valor }));

  const handleSeleccionarAnimal = (animal) => {
    setAnimalSeleccionado(animal);
    setCampo("idanimal", animal.idanimal);
  };

  const handleGuardar = () => {
    if (
      !form.idanimal ||
      !form.idtipogasto ||
      !form.monto ||
      !form.fecha ||
      !form.descripcion ||
      !comprobante
    ) {
      alert("Completá todos los campos obligatorios, incluido el comprobante.");
      return;
    }

    const tipogasto = tiposGastoMock.find(
      (t) => t.idtipogasto === Number(form.idtipogasto)
    );

    onGuardar({
      idanimal: Number(form.idanimal),
      idtipogasto: Number(form.idtipogasto),
      monto: Number(form.monto),
      fecha: form.fecha,
      descripcion: form.descripcion,
      comprobante: comprobante.name,
      reintegrado: false,
      aceptado: null,
      animal: animalSeleccionado,
      tipogasto,
    });

    setForm(formVacio);
    setAnimalSeleccionado(null);
    setComprobante(null);
    onCerrar();
  };

  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      {/* max-w-xl hace el modal más ancho */}
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Registrar gasto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Animal */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Animal *
            </label>
            <SelectorAnimal
              animalSeleccionado={animalSeleccionado}
              onSeleccionar={handleSeleccionarAnimal}
              animales={animales}
            />
          </div>

          {/* Tipo de gasto — select nativo para evitar el bug del id */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Tipo de gasto *
            </label>
            <select
              value={form.idtipogasto}
              onChange={(e) => setCampo("idtipogasto", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="" disabled>
                Seleccionar tipo…
              </option>
              {tiposGastoMock.map((t) => (
                <option key={t.idtipogasto} value={t.idtipogasto}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Monto y Fecha en dos columnas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Monto ($) *
              </label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={form.monto}
                onChange={(e) => setCampo("monto", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Fecha *
              </label>
              <Input
                type="date"
                value={form.fecha}
                onChange={(e) => setCampo("fecha", e.target.value)}
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Descripción *
            </label>
            <Input
              value={form.descripcion}
              onChange={(e) => setCampo("descripcion", e.target.value)}
              placeholder="Ej: Consulta por vómitos, antibiótico..."
            />
          </div>

          {/* Comprobante */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Comprobante * (imagen o PDF)
            </label>
            <Input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setComprobante(e.target.files?.[0] ?? null)}
            />
          </div>

          <Button onClick={handleGuardar} className="w-full" size="lg">
            Guardar gasto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}