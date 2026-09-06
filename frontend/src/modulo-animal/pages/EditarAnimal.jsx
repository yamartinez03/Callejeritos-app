import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimalForm from "../components/AnimalForm";
import { animalAFormulario } from "#lib/animalUtils.js";
import { getAnimalPorId, editarAnimal } from "@/shared/data/mockAnimales";

export default function EditarAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = getAnimalPorId(id);

  if (!animal) {
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

  function handleSubmit(form) {
    // Simulación de PUT /api/animales/:id (ver editarAnimal en mockAnimales.js).
    const actualizado = editarAnimal(id, form);
    console.log(`PUT /api/animales/${id} ->`, actualizado);
    navigate(`/animales/${actualizado.idanimal}`);
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-5">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <Link to={`/animales/${animal.idanimal}`}>
            <ArrowLeft className="h-4 w-4" />
            Volver al perfil
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary">
            <PawPrint className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-foreground">Editar a {animal.nombre}</h1>
            <p className="text-sm text-muted-foreground">Modificá los datos y guardá los cambios.</p>
          </div>
        </div>

        <AnimalForm
          valoresIniciales={animalAFormulario(animal)}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
          cancelarHref={`/animales/${animal.idanimal}`}
        />
      </div>
    </div>
  );
}