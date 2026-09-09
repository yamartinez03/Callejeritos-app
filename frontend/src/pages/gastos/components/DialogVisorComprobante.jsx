import { Receipt, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Estrategia C: el backend sirve el archivo con el Content-Type correcto.
 * El browser detecta automáticamente si es PDF o imagen y lo renderiza.
 *
 * TODO: reemplazar PLACEHOLDER_URL por la URL real del backend:
 *   Opción 1 (nombre de archivo): `/api/comprobantes/${comprobante}`
 *   Opción 2 (URL completa en BD):  `${comprobante}`
 *
 * PLACEHOLDER: la imagen vive en frontend/public/comprobante-ejemplo.png
 * Vite la sirve como archivo estático en /comprobante-ejemplo.png.
 * Para reemplazarla por el backend real, cambiar PLACEHOLDER_URL por
 * la función getUrlComprobante comentada abajo.
 */
const PLACEHOLDER_URL = "/comprobante-ejemplo.jpeg";

function getUrlComprobante(/* comprobante */) {
  // TODO: descomentar cuando el backend esté listo:
  // return `/api/comprobantes/${comprobante}`;
  return PLACEHOLDER_URL;
}

export default function DialogVisorComprobante({ abierto, comprobante, onCerrar }) {
  if (!comprobante) return null;

  const url = getUrlComprobante(comprobante);

  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Comprobante
          </DialogTitle>
        </DialogHeader>

        {/* Visor — el browser maneja PDF e imagen según Content-Type del backend */}
        <div className="rounded-lg overflow-hidden border border-border bg-muted h-[65vh]">
          {url ? (
            <iframe
              src={url}
              title="Comprobante"
              className="w-full h-full"
            />
          ) : (
            // Estado vacío mientras no hay URL configurada
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Receipt className="w-12 h-12 opacity-30" />
              <p className="text-sm">
                El visor estará disponible cuando el backend esté listo.
              </p>
            </div>
          )}
        </div>

        {/* Botón descargar */}
        <Button
          variant="outline"
          size="default"
          className="w-full"
          disabled={!url}
          onClick={() => url && window.open(url, "_blank")}
        >
          <Download className="w-4 h-4 mr-2" />
          Descargar comprobante
        </Button>
      </DialogContent>
    </Dialog>
  );
}