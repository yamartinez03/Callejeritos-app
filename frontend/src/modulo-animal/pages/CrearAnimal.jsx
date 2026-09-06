import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimalForm from "../components/AnimalForm";
import { crearAnimal } from "@/shared/data/mockAnimales";

export default function CrearAnimal() {
  const navigate = useNavigate();

  function handleSubmit(form) {
    // Simulación de POST /api/animales (ver crearAnimal en mockAnimales.js).
    const nuevoAnimal = crearAnimal(form);
    console.log("POST /api/animales ->", nuevoAnimal);
    navigate(`/animales/${nuevoAnimal.idanimal}`);
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-5">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <Link to="/animales">
            <ArrowLeft className="h-4 w-4" />
            Volver al listado
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary">
            <PawPrint className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-foreground">Nuevo animal</h1>
            <p className="text-sm text-muted-foreground">
              Completá los datos para dar de alta un animal en el sistema.
            </p>
          </div>
        </div>

        <AnimalForm onSubmit={handleSubmit} submitLabel="Guardar animal" cancelarHref="/animales" />
      </div>
    </div>
  );
}