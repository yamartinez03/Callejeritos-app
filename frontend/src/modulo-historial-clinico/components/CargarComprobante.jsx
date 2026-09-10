import { useRef } from "react";
import { Paperclip, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

/*
 <<extend>> Cargar Comprobante.
 Control de subida de un único archivo (comprobante/estudio/receta).
 En este mock no hay backend de almacenamiento: sólo se conserva el
 nombre del archivo elegido, tal como lo persistiría el campo
 archivo/comprobante (String) de los modelos RegistroEstudio,
 RegistroTratamiento y Gasto.
 Props:
 - value: string (nombre de archivo ya cargado) | null.
 - onChange: (nombreArchivo | null) => void.
 - accept: extensiones aceptadas, por defecto las definidas en el caso de uso.
 - label / opcional: textos del control.
 */
export default function CargarComprobante({
  value,
  onChange,
  accept = ".pdf,.csv,.png,.jpg,.jpeg",
  label = "Comprobante",
  opcional = true,
}) {
  const inputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    onChange(file ? file.name : null);
    e.target.value = "";
  }

  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-foreground">
        {label} {opcional && <span className="font-normal text-muted-foreground">(opcional)</span>}
      </p>

      {value ? (
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
          <span className="flex min-w-0 items-center gap-2 text-sm text-foreground">
            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{value}</span>
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => onChange(null)}
            aria-label="Quitar archivo"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <Paperclip className="h-4 w-4" />
          Seleccionar archivo ({accept.replaceAll(".", "").replaceAll(",", ", ")})
        </button>
      )}

      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
    </div>
  );
}