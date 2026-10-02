import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

const ANIMALES_MOCK = [
  {
    idanimal: 1,
    nombre: "Max",
    especie: "Perro",
    colorpelaje: "Negro y Dorado",
    edadestimada: 3,
    estado: "EN_ADOPCION",
    fotos: [
      {
        idfoto: 6,
        ruta: "https://media.istockphoto.com/id/467923438/photo/silly-dog-tilts-head-in-front-of-barn.jpg?s=612x612&w=0&k=20&c=haPwfoPl_ggvNKAga_Qv4r88qWdcpH-qZ5DaBba6-8U=",
      },
    ],
  },
  {
    idanimal: 2,
    nombre: "Luna",
    especie: "Gato",
    colorpelaje: "Negro",
    edadestimada: 2,
    estado: "EN_ADOPCION",
    fotos: [
      {
        idfoto: 7,
        ruta: "https://media.istockphoto.com/id/1186954832/photo/little-black-kitten-playing-and-enjoys-with-orange-ball-at-living-room-of-house.jpg?s=612x612&w=0&k=20&c=Qa0SrgHouoEUnsAUj-L-bKeQSQsw769P4cJCPrK6uMk=",
      },
    ],
  },
  {
    idanimal: 3,
    nombre: "Rocky",
    especie: "Perro",
    colorpelaje: "Gris",
    edadestimada: 5,
    estado: "EN_ADOPCION",
    fotos: [
      {
        idfoto: 8,
        ruta: "https://media.istockphoto.com/id/2202652356/photo/a-dog-with-sad-eyes.jpg?s=612x612&w=0&k=20&c=6EPYK_oMWFRXfsSUocs0XyVRmTIy9FBuy5O6QDfEPNI=",
      },
    ],
  },
];

const FormularioAdopcionPage = ({ animalId }) => {
  const navigate = useNavigate();
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Si se pasa un animalId, buscarlo y mostrar directamente el formulario
  useEffect(() => {
    if (animalId) {
      const animal = ANIMALES_MOCK.find(
        (a) => a.idanimal === parseInt(animalId),
      );
      if (animal) {
        setAnimalSeleccionado(animal);
        setMostrarFormulario(true);
      }
    }
  }, [animalId]);

  const animalesFiltrados = ANIMALES_MOCK.filter((animal) => {
    if (!busqueda) return true;
    const busquedaLower = busqueda.toLowerCase();
    return (
      animal.nombre?.toLowerCase().includes(busquedaLower) ||
      animal.especie?.toLowerCase().includes(busquedaLower) ||
      animal.colorpelaje?.toLowerCase().includes(busquedaLower)
    );
  });

  const handleSeleccionarAnimal = (animal) => {
    setAnimalSeleccionado(animal);
    setMostrarFormulario(true);
  };

  const handleVolver = () => {
    if (mostrarFormulario && !animalId) {
      setMostrarFormulario(false);
    } else {
      navigate("/dashboard");
    }
  };

  const handleConfirmarCompletado = () => {
    // Aquí iría la llamada al backend para crear la solicitud
    console.log("Creando solicitud para animal:", animalSeleccionado);
    alert("Solicitud creada. Un administrador revisará tu solicitud.");
    navigate("/dashboard");
  };

  const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSduzFJZg4xXXQN0_bRjH_LyElLOciNgVSY3Gla34kJwU_IZeQ/viewform?usp=publish-editor"; //mock luego debe venir de la configuración del backend

  if (!mostrarFormulario) {
    // Vista de selección de animal
    return (
      <div className="min-h-screen" style={{ backgroundColor: "var(--muted)" }}>
        <main className="px-10 py-8">
          {/* Header */}
          <div className="mb-6">
            <h1
              className="text-xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Solicitar Adopción
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Selecciona el animal que deseas adoptar
            </p>
          </div>

          {/* Buscador */}
          <div
            className="flex items-center gap-2 border rounded-full px-4 py-1.5 w-full md:w-auto mb-6"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
            }}
          >
            <Search
              className="h-4 w-4 shrink-0"
              style={{ color: "var(--muted-foreground)" }}
            />
            <input
              type="text"
              placeholder="Buscar por nombre, especie, color..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="text-sm bg-transparent outline-none w-full md:w-48"
              style={{ color: "var(--foreground)" }}
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="text-xs shrink-0"
                style={{ color: "var(--muted-foreground)" }}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Grid de animales */}
          {animalesFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animalesFiltrados.map((animal) => (
                <Card
                  key={animal.idanimal}
                  className="hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                  style={{ backgroundColor: "var(--card)" }}
                  onClick={() => handleSeleccionarAnimal(animal)}
                >
                  <CardContent className="p-0">
                    <div className="relative h-48 bg-gray-100">
                      {animal.fotos && animal.fotos.length > 0 ? (
                        <img
                          src={animal.fotos[0].ruta}
                          alt={animal.nombre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                          🐾
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-orange-100 text-orange-800">
                          En Adopción
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3
                        className="text-lg font-bold mb-1"
                        style={{ color: "var(--foreground)" }}
                      >
                        {animal.nombre}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {animal.especie} · {animal.colorpelaje} ·{" "}
                        {animal.edadestimada} años
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p
                className="text-lg"
                style={{ color: "var(--muted-foreground)" }}
              >
                {busqueda
                  ? "No se encontraron animales que coincidan con la búsqueda."
                  : "No hay animales disponibles para adopción en este momento."}
              </p>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Vista del formulario con el animal seleccionado
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--muted)" }}>
      <main className="px-10 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Formulario de Adopción
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Animal: {animalSeleccionado?.nombre}
          </p>
        </div>

        {/* Iframe con Google Form */}
        <div className="mb-20">
          <iframe
            src={googleFormUrl}
            style={{ width: "100%", height: "600px", border: "none" }}
            title="Formulario de Adopción"
          />
        </div>

        {/* Botones sticky footer */}
        <div
          className="fixed bottom-0 left-0 right-0 p-6 border-t flex items-center justify-end gap-4 pr-10"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        >
          <Button variant="outline" onClick={handleVolver} className="w-48">
            Cancelar
          </Button>
          <Button onClick={handleConfirmarCompletado} className="w-48">
            Ya completé el formulario
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FormularioAdopcionPage;
