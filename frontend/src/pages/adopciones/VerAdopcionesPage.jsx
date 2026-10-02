import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

const ANIMALES_ADOPTION_MOCK = [
  {
    idanimal: 1,
    idespecie: 1,
    nombre: "Max",
    sexo: "MACHO",
    edadestimada: 3,
    colorpelaje: "Negro y Dorado",
    peso: 25.5,
    castrado: true,
    lugarorigen: "Calle 12, La Plata",
    estado: "EN_ADOPCION",
    fechaingreso: "2026-07-15",
    lactante: false,
    especie: "Perro",
    fotos: [
      {
        idfoto: 6,
        idanimal: 1,
        ruta: "https://media.istockphoto.com/id/467923438/photo/silly-dog-tilts-head-in-front-of-barn.jpg?s=612x612&w=0&k=20&c=haPwfoPl_ggvNKAga_Qv4r88qWdcpH-qZ5DaBba6-8U=",
      },
    ],
  },
  {
    idanimal: 2,
    idespecie: 1,
    nombre: "Luna",
    sexo: "HEMBRA",
    edadestimada: 2,
    colorpelaje: "Negro",
    peso: 4.2,
    castrado: true,
    lugarorigen: "Parque Saavedra, La Plata",
    estado: "EN_TRANSITO",
    fechaingreso: "2026-08-01",
    lactante: true,
    especie: "Gato",
    fotos: [
      {
        idfoto: 7,
        idanimal: 2,
        ruta: "https://media.istockphoto.com/id/1186954832/photo/little-black-kitten-playing-and-enjoys-with-orange-ball-at-living-room-of-house.jpg?s=612x612&w=0&k=20&c=Qa0SrgHouoEUnsAUj-L-bKeQSQsw769P4cJCPrK6uMk=",
      },
    ],
  },
  {
    idanimal: 3,
    idespecie: 1,
    nombre: "Rocky",
    sexo: "MACHO",
    edadestimada: 5,
    colorpelaje: "Gris",
    peso: 30.0,
    castrado: true,
    lugarorigen: "Av. 7, La Plata",
    estado: "EN_ADOPCION",
    fechaingreso: "2026-06-20",
    lactante: false,
    especie: "Perro",
    fotos: [
      {
        idfoto: 8,
        idanimal: 3,
        ruta: "https://media.istockphoto.com/id/2202652356/photo/a-dog-with-sad-eyes.jpg?s=612x612&w=0&k=20&c=6EPYK_oMWFRXfsSUocs0XyVRmTIy9FBuy5O6QDfEPNI=",
      },
      {
        idfoto: 9,
        idanimal: 3,
        ruta: "https://media.istockphoto.com/id/2190589171/photo/a-dog-with-sad-eyes.jpg?s=612x612&w=0&k=20&c=IbjANPhXf6nKjza8Jc9XF4n_NVvA1mmyy1_5na1QL6M=",
      },
    ],
  },
];

const VerAdopcionesPage = ({ onNavegar }) => {
  const [animales, setAnimales] = useState(ANIMALES_ADOPTION_MOCK);
  const [busqueda, setBusqueda] = useState("");
  const [form, setForm] = useState({
    id: 1,
    tipo: "ADOPCION",
    nombre: "Formulario de Adopción",
    ruta: "https://docs.google.com/forms/d/e/1FAIpQLSduzFJZg4xXXQN0_bRjH_LyElLOciNgVSY3Gla34kJwU_IZeQ/viewform?usp=publish_editor",
    activo: true,
  });

  const handleIniciarAdopcion = (animal) => {
    if (!form.activo) {
      alert(
        "El formulario de adopción está temporalmente inactivo. Por favor, inténtalo más tarde.",
      );
      return;
    }
    // Navegar al formulario con el ID del animal usando la función del dashboard
    if (onNavegar) {
      onNavegar("solicitarAdopcion", { animalId: animal.idanimal });
    }
  };

  const animalesFiltrados = animales.filter((animal) => {
    if (!busqueda) return true;
    const busquedaLower = busqueda.toLowerCase();
    return (
      animal.nombre?.toLowerCase().includes(busquedaLower) ||
      animal.raza?.toLowerCase().includes(busquedaLower) ||
      animal.colorpelaje?.toLowerCase().includes(busquedaLower) ||
      animal.lugarorigen?.toLowerCase().includes(busquedaLower)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const AdopcionCard = ({ animal }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const fotos = animal.fotos || [];
    const hasPhotos = fotos.length > 0;
    const multiplePhotos = fotos.length > 1;

    const handleNextPhoto = () => {
      if (currentPhotoIndex < fotos.length - 1) {
        setCurrentPhotoIndex(currentPhotoIndex + 1);
      }
    };

    const handlePrevPhoto = () => {
      if (currentPhotoIndex > 0) {
        setCurrentPhotoIndex(currentPhotoIndex - 1);
      }
    };

    return (
      <Card
        className="hover:shadow-md transition-shadow overflow-hidden"
        style={{ backgroundColor: "var(--card)" }}
      >
        <CardContent className="p-0">
          {/* Badge de tipo */}
          <div className="flex justify-end items-center gap-2 py-3">
            <Badge className="bg-orange-100 text-orange-800">En Adopción</Badge>
          </div>

          {/* Carrusel de fotos */}
          {hasPhotos && (
            <div className="relative">
              <div className="relative aspect-square">
                <img
                  src={fotos[currentPhotoIndex]?.ruta}
                  alt={`Foto ${currentPhotoIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {multiplePhotos && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      disabled={currentPhotoIndex === 0}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>

                    <button
                      onClick={handleNextPhoto}
                      disabled={currentPhotoIndex === fotos.length - 1}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {currentPhotoIndex + 1} / {fotos.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Contenido de la tarjeta */}
          <div className="p-4 space-y-3">
            {/* Datos del animal */}
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {animal.nombre}
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  - {animal.especie}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Sexo:
                  </span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">
                    {animal.sexo}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Edad:
                  </span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">
                    {animal.edadestimada} años
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Peso:
                  </span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">
                    {animal.peso} kg
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Castrado:
                  </span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">
                    {animal.castrado ? "Sí" : "No"}
                  </span>
                </div>
              </div>

              <div className="text-sm mt-1">
                <span className="text-gray-500 dark:text-gray-400">Color:</span>
                <span className="ml-1 text-gray-700 dark:text-gray-200">
                  {animal.colorpelaje}
                </span>
              </div>

              {animal.lactante && (
                <div className="mt-2">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Lactante
                  </Badge>
                </div>
              )}
            </div>

            {/* Ubicación y Fecha */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Ubicación:</span>
              <span>{animal.lugarorigen}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Ingreso:</span>
              <span>{formatDate(animal.fechaingreso)}</span>
            </div>

            {/* Botón de adopción */}
            <Button
              className="w-full"
              onClick={() => handleIniciarAdopcion(animal)}
            >
              Iniciar Adopción
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--muted)" }}>
      {/* Contenido principal */}
      <main className="px-10 py-8">
        {/* Banner de aviso si el formulario está inactivo */}
        {!form.activo && (
          <div
            className="mb-6 p-4 rounded-lg border flex items-center gap-3"
            style={{ backgroundColor: "#fef2f2", borderColor: "#fecaca" }}
          >
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold" style={{ color: "#dc2626" }}>
                Formulario de Adopción Inactivo
              </p>
              <p className="text-sm" style={{ color: "#991b1b" }}>
                El formulario de adopción está temporalmente deshabilitado. Por
                favor, contáctate con el administrador.
              </p>
            </div>
          </div>
        )}

        {/* Header de sección */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between mb-6">
          <div>
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Animales en Adopción
            </h3>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {animales.length}{" "}
              {animales.length === 1
                ? "animal disponible"
                : "animales disponibles"}
            </p>
          </div>

          {/* Buscador */}
          <div
            className="flex items-center gap-2 border rounded-full px-4 py-1.5 w-full md:w-auto"
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
              placeholder="Buscar por nombre, raza, color..."
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
        </div>

        {/* Grid de animales */}
        {animalesFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animalesFiltrados.map((animal) => (
              <AdopcionCard
                key={animal.uuid || `animal-${animal.idanimal}`}
                animal={animal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg" style={{ color: "var(--muted-foreground)" }}>
              {busqueda
                ? "No se encontraron animales que coincidan con la búsqueda."
                : "No hay animales disponibles para adopción en este momento."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VerAdopcionesPage;
