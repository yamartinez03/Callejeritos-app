import { useState } from "react";
import { Button } from "@/components/ui/button";
import PublicacionCard from "./components/PublicacionCard";
import CrearPublicacionForm from "./components/CrearPublicacionForm";

const PUBLICACIONES_MOCK = [
  {
    idpublicacion: 1,
    uuid: "550e8400-e29b-41d4-a716-446655440000",
    idpersonapublico: null,
    idpersonaaprobo: null,
    idanimal: null,
    tipoPublicacion: "PERDIDO",
    descripcion:
      "Se busca perro perdido, raza Golden Retriever, color dorado, collar rojo con medalla. Responde al nombre de Fido. Muy amigable.",
    zona: "Calle 12 entre 60 y 61, La Plata",
    fecha: "2026-08-25",
    nombreVisitante: "Juan Perez",
    emailVisitante: "juan@email.com",
    telefonoVisitante: "2211234567",
    estadoaprobado: "APROBADA",
    resuelto: false,
    createdAt: "2026-08-25T10:00:00Z",
    updatedAt: "2026-08-25T10:00:00Z",
    fotos: [
      {
        idfoto: 1,
        idpub: 1,
        ruta: "https://media.istockphoto.com/id/162715246/photo/little-golden-retriever.jpg?s=612x612&w=0&k=20&c=7jT7YOpJ3QI3oqJ8vH9ZaNKciZoC0Y7HnCpmT6S4o6w=",
      },
      {
        idfoto: 2,
        idpub: 1,
        ruta: "https://media.istockphoto.com/id/163206279/es/foto/little-labrador-dorado.webp?a=1&b=1&s=612x612&w=0&k=20&c=vMl-BgjPHhfdvOtQEkvmOzkXTPA8xoHa-SejsJcSjsY=",
      },
      {
        idfoto: 3,
        idpub: 1,
        ruta: "https://media.istockphoto.com/id/162324055/es/foto/little-labrador-dorado.webp?a=1&b=1&s=612x612&w=0&k=20&c=Npo0V7X_69cbT8lvhbqy-ptZAGfKuk9M_axQCn0hxig=",
      },
    ],
  },
  {
    idpublicacion: 2,
    uuid: "550e8400-e29b-41d4-a716-446655440001",
    idpersonapublico: null,
    idpersonaaprobo: null,
    idanimal: null,
    tipoPublicacion: "ENCONTRADO",
    descripcion:
      "Encontré un gatito negro cerca del parque, parece ser abandonado. Tiene collar rosa sin identificación. Muy cariñoso.",
    zona: "Parque Saavedra, La Plata",
    fecha: "2026-08-26",
    nombreVisitante: "Maria Garcia",
    emailVisitante: "maria@email.com",
    telefonoVisitante: "2217654321",
    estadoaprobado: "APROBADA",
    resuelto: false,
    createdAt: "2026-08-26T15:30:00Z",
    updatedAt: "2026-08-26T15:30:00Z",
    fotos: [
      {
        idfoto: 4,
        idpub: 2,
        ruta: "https://t4.ftcdn.net/jpg/03/43/65/33/240_F_343653380_ljWKYOp5AbEgMSRNr35EyQ3RhiB5DoTo.jpg",
      },
    ],
  },
  {
    idpublicacion: 3,
    uuid: "550e8400-e29b-41d4-a716-446655440002",
    idpersonapublico: null,
    idpersonaaprobo: null,
    idanimal: null,
    tipoPublicacion: "AVISTAMIENTO",
    descripcion:
      "Vi un perro parecido a un Pastor Alemán merodeando por la zona. Parece asustado pero no agresivo.",
    zona: "Av. 7 y 50, La Plata",
    fecha: "2026-08-27",
    nombreVisitante: "Carlos Lopez",
    emailVisitante: null,
    telefonoVisitante: "2219876543",
    estadoaprobado: "APROBADA",
    resuelto: false,
    createdAt: "2026-08-27T09:00:00Z",
    updatedAt: "2026-08-27T09:00:00Z",
    fotos: [],
  },
  {
    idpublicacion: 4,
    uuid: "550e8400-e29b-41d4-a716-446655440003",
    idpersonapublico: null,
    idpersonaaprobo: null,
    idanimal: null,
    tipoPublicacion: "PERDIDO",
    descripcion:
      "Se busca gata persa blanca, ojos azules, muy pequeña. Se escapó del jardín el día 24.",
    zona: "Calle 44 entre 1 y 2, La Plata",
    fecha: "2026-08-24",
    nombreVisitante: "Ana Martinez",
    emailVisitante: "ana@email.com",
    telefonoVisitante: "2213456789",
    estadoaprobado: "APROBADA",
    resuelto: true,
    createdAt: "2026-08-24T18:00:00Z",
    updatedAt: "2026-08-27T12:00:00Z",
    fotos: [
      {
        idfoto: 5,
        idpub: 4,
        ruta: "https://as1.ftcdn.net/v2/jpg/00/35/53/06/1000_F_35530672_OQKsZsHq5ivfgwgEGMDGQCkCxHlMAMeO.jpg",
      },
    ],
  },
];

const ANIMALES_MOCK = [
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

const PublicacionesPage = () => {
  const [filter, setFilter] = useState("TODOS");
  const [showCrearForm, setShowCrearForm] = useState(false);
  const [allContent, setAllContent] = useState([
    ...PUBLICACIONES_MOCK,
    ...ANIMALES_MOCK,
  ]);

  // para el buscador de publicaciones
  const [busqueda, setBusqueda] = useState("");

  const filteredContent = allContent.filter((item) => {
    const esAnimal =
      item.estado === "EN_ADOPCION" || item.estado === "EN_TRANSITO";
    const tipo = esAnimal ? item.estado : item.tipoPublicacion;

    // Filtro por tipo
    if (filter !== "TODOS" && tipo !== filter) return false;

    // Filtro por búsqueda
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      return (
        (item.descripcion &&
          item.descripcion.toLowerCase().includes(busquedaLower)) ||
        (item.zona && item.zona.toLowerCase().includes(busquedaLower)) ||
        (item.nombre && item.nombre.toLowerCase().includes(busquedaLower)) ||
        (item.colorpelaje &&
          item.colorpelaje.toLowerCase().includes(busquedaLower))
      );
    }

    return true;
  });

  const handleCrearPublicacion = (nuevaPublicacion) => {
    // Aquí iría la llamada al backend para crear la publicación
    console.log("Nueva publicación:", nuevaPublicacion);

    // Por ahora, simulamos agregando al estado local
    const nuevaPublicacionConId = {
      ...nuevaPublicacion,
      idpublicacion: allContent.length + 1,
      uuid: crypto.randomUUID(),
      estadoaprobado: "PENDIENTE",
      resuelto: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fotos: nuevaPublicacion.fotos || [],
    };

    setAllContent([...allContent, nuevaPublicacionConId]);
    setShowCrearForm(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--muted)" }}>
      {/* Contenido principal */}
      <main className="px-10 py-8">
        {/* Header de sección */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Publicaciones nuevas
            </h3>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {filteredContent.length}{" "}
              {filteredContent.length === 1 ? "resultado" : "resultados"}
            </p>
          </div>
          <Button
            className="font-semibold"
            onClick={() => setShowCrearForm(!showCrearForm)}
            variant={showCrearForm ? "secondary" : "default"}
          >
            {showCrearForm ? "✕ Cancelar" : "+ Nuevo Reporte"}
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          {/* Filtros */}
          {[
            { valor: "TODOS", etiqueta: "Todas" },
            { valor: "PERDIDO", etiqueta: "Perdidos" },
            { valor: "ENCONTRADO", etiqueta: "Encontrados" },
            { valor: "AVISTAMIENTO", etiqueta: "Avistamientos" },
            { valor: "EN_ADOPCION", etiqueta: "En adopción" },
          ].map((f) => (
            <button
              key={f.valor}
              onClick={() => setFilter(f.valor)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
              style={{
                backgroundColor:
                  filter === f.valor ? "var(--primary)" : "transparent",
                color:
                  filter === f.valor
                    ? "var(--primary-foreground)"
                    : "var(--muted-foreground)",
                borderColor:
                  filter === f.valor ? "var(--primary)" : "var(--border)",
              }}
            >
              {f.etiqueta}
            </button>
          ))}

          {/* Buscador — en desktop a la derecha, en mobile nueva fila alineado a la derecha */}
          <div
            className="ml-auto flex items-center gap-2 border rounded-full px-4 py-1.5 w-full md:w-auto"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0"
              style={{ color: "var(--muted-foreground)" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar por color, nombre, zona..."
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
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Layout split o full */}
        <div
          className={`flex gap-6 items-start ${showCrearForm ? "flex-col md:flex-row" : ""}`}
        >
          {/* Form — en mobile aparece primero, en desktop a la derecha */}
          {showCrearForm && (
            <div className="w-full md:w-1/4 md:order-2 md:sticky md:top-6">
              <CrearPublicacionForm
                onSubmit={handleCrearPublicacion}
                onCancel={() => setShowCrearForm(false)}
              />
            </div>
          )}

          {/* Publicaciones — en mobile aparece después del form, en desktop a la izquierda */}
          <div
            className={`${showCrearForm ? "w-full md:w-3/4 md:order-1" : "w-full"}`}
          >
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((item) => (
                  <PublicacionCard
                    key={item.uuid || `animal-${item.idanimal}`}
                    item={item}
                    publicacion={item}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p
                  className="text-lg"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  No hay publicaciones para mostrar.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicacionesPage;
