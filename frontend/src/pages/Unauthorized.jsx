import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/Login/components/Button";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background p-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <ShieldAlert className="size-7" />
      </span>
      <h1 className="text-lg font-semibold text-foreground">
        No tenés acceso a esta sección
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Tu rol actual no tiene permiso para ver esta página. Si creés que es
        un error, contactá a un administrador.
      </p>
      <Link to="/">
        <Button variant="outline" className="mt-2">
          Volver al inicio
        </Button>
      </Link>
    </div>
  );
}