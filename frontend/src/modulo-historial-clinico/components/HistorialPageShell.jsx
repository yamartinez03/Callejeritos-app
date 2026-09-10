import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/*
Encabezado común a todas las pantallas de Gestionar historial clínico
 */
export default function HistorialPageShell({
  animal,
  titulo,
  subtitulo,
  children,
}) {
  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-5">
        <Link to={`/animales/${animal.idanimal}/historial`}>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a historial clínico de {animal.nombre}
          </Button>
        </Link>

        <div>
          <h1 className="text-xl font-semibold text-foreground">{titulo}</h1>
          {subtitulo && (
            <p className="text-sm text-muted-foreground">{subtitulo}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
