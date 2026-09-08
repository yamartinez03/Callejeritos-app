import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function DetallesMedicamento({ insumo }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Número de lote</p>
          <p className="text-sm font-medium text-black">
            {insumo.numerolote ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Concentración</p>
          <p className="text-sm font-medium text-black">
            {insumo.concentracion ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Vía de administración</p>
          <p className="text-sm font-medium text-black">
            {insumo.viaadministracion ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

function DetallesAlimento({ insumo }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Marca</p>
          <p className="text-sm font-medium text-black">
            {insumo.marca ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Tipo de alimento</p>
          <p className="text-sm font-medium text-black capitalize">
            {insumo.tipoalimento ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Peso (kg)</p>
          <p className="text-sm font-medium text-black">
            {insumo.peso ? `${insumo.peso} kg` : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Especie destino</p>
          <p className="text-sm font-medium text-black">
            {insumo.especieDestino ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

function DetallesInsumo({ insumo }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Descripción</p>
          <p className="text-sm font-medium text-black">
            {insumo.descripcion ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PopoverDetalleInsumo({ insumo }) {
  if (!insumo) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Ver más
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{insumo.nombre}</h4>
            <Badge className="capitalize">{insumo.tipo}</Badge>
          </div>
          <p className="text-sm text-gray-600">{insumo.descripcion}</p>
          
          {/* Info común */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-1">Stock actual</p>
              <p className="text-sm font-medium text-black">{insumo.stock}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Fecha de vencimiento</p>
              <p className="text-sm font-medium text-black">
                {insumo.fechaVencimiento ?? "—"}
              </p>
            </div>
          </div>

          {/* Info específica según tipo */}
          {insumo.tipo === "medicamento" && (
            <DetallesMedicamento insumo={insumo} />
          )}
          {insumo.tipo === "alimento" && <DetallesAlimento insumo={insumo} />}
          {insumo.tipo === "insumo" && <DetallesInsumo insumo={insumo} />}
        </div>
      </PopoverContent>
    </Popover>
  );
}
