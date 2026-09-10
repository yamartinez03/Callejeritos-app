import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnimalNoEncontrado() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4 text-center">
      <p className="text-muted-foreground">No se encontró un animal con ese identificador.</p>
      <Button asChild variant="outline">
        <Link to="/animales">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Volver al listado
        </Link>
      </Button>
    </div>
  );
}