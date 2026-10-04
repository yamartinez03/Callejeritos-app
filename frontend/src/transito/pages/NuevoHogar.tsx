
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { HogarForm } from "../components/hogares/HogarForm";
import type { HogarTransito } from "../types/transito";

export function NuevoHogar() {
  const navigate = useNavigate();

  const handleRegistrar = (
    data: Omit<HogarTransito, "id" | "estado" | "ocupacion">,
  ) => {
    const nuevoHogar: HogarTransito = {
      ...data,
      id: `HT-${Date.now()}`,
      estado: "DISPONIBLE",
      ocupacion: 0,
    };

    console.log("Nuevo hogar registrado:", nuevoHogar);

    // Por ahora volvemos a la lista.
    // Más adelante acá vamos a llamar al backend.
    navigate("/transito/hogares");
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/transito/hogares")}
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Volver a hogares
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <Home size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Nuevo hogar de tránsito
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Registrá un nuevo hogar disponible para realizar tránsitos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <HogarForm
        onSubmit={handleRegistrar}
        onCancel={() => navigate("/transito/hogares")}
      />
    </div>
  );
}
