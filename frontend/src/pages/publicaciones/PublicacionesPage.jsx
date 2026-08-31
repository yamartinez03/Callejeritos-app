import { useState } from "react";
import { Button } from "@/components/ui/button";
import PublicacionCard from "./components/PublicacionCard";
import CrearPublicacionForm from "./components/CrearPublicacionForm";
import logo from "@/assets/callejeritos-logo.png";

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

  const filteredContent = allContent.filter((item) => {
    const esAnimal =
      item.estado === "EN_ADOPCION" || item.estado === "EN_TRANSITO";
    const estaAprobado = esAnimal || item.estadoaprobado === "APROBADA";
    const tipoItem = item.tipoPublicacion || item.estado;

    if (filter === "TODOS") return estaAprobado;
    if (filter === "EN_ADOPCION") {
      return (
        (item.estado === "EN_ADOPCION" || item.estado === "EN_TRANSITO") &&
        estaAprobado
      );
    }
    return tipoItem === filter && estaAprobado;
  });

  const handleCrearPublicacion = async (datos) => {
    const nuevaPublicacion = {
      idpublicacion: Date.now(),
      uuid: Math.random().toString(36).substring(7),
      idpersonapublico: null,
      idpersonaaprobo: null,
      idanimal: null,
      tipoPublicacion: datos.tipoPublicacion,
      descripcion: datos.descripcion,
      zona: datos.zona,
      fecha: datos.fecha,
      nombreVisitante: datos.nombreVisitante || null,
      emailVisitante: datos.emailVisitante || null,
      telefonoVisitante: datos.telefonoVisitante || null,
      estadoaprobado: "PENDIENTE",
      resuelto: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fotos: [],
    };
    setAllContent((prev) => [nuevaPublicacion, ...prev]);
    setShowCrearForm(false);
    alert("Publicación enviada. Quedará pendiente de aprobación.");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#e8ddd4" }}>
      {/* Navbar */}
      <nav
        className="px-6 py-4 flex items-center justify-between border-b"
        style={{ backgroundColor: "#ffe9e0" }}
      >
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Callejeritos logo"
            className="h-10 w-10 object-contain"
          />
          <div>
            <h1 className="text-lg font-bold" style={{ color: "#2c1a0e" }}>
              Callejeritos Villa Elisa
            </h1>
            <p className="text-xs" style={{ color: "#9c7b5e" }}>
              Gestión animal
            </p>
          </div>
        </div>
        <Button className="font-semibold">Iniciar sesión</Button>
      </nav>

      <div
        style={{ background: "linear-gradient(to bottom, #fff8f3, #f0e6dc)" }}
      >
        {/* Header de bienvenida */}
        <div className="px-10 py-8">
          <h2 className="text-3xl font-bold mb-1" style={{ color: "#2c1a0e" }}>
            Bienvenido a Callejeritos 🐾
          </h2>
          <p className="text-base" style={{ color: "#7a5c44" }}>
            Acá podés reportar un animal perdido, encontrado o avistado en tu
            zona. Cada publicación ayuda a que más animales encuentren su hogar.
          </p>
        </div>

        {/* Contenido principal */}
        <main className="px-10 py-8">
          {/* Header de sección */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold" style={{ color: "#2c1a0e" }}>
                Publicaciones activas
              </h3>
              <p className="text-sm" style={{ color: "#9c7b5e" }}>
                {filteredContent.length}{" "}
                {filteredContent.length === 1 ? "resultado" : "resultados"}
              </p>
            </div>
            <Button
              className="font-semibold"
              onClick={() => setShowCrearForm(!showCrearForm)}
              variant={showCrearForm ? "secondary" : "default"}
            >
              {showCrearForm ? "✕ Cancelar" : "+ Nueva publicación"}
            </Button>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-6">
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
                  backgroundColor: filter === f.valor ? "#c1440e" : "#fff8f3",
                  color: filter === f.valor ? "#fff" : "#7a5c44",
                  borderColor: filter === f.valor ? "#c1440e" : "#d4b8a0",
                }}
              >
                {f.etiqueta}
              </button>
            ))}
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
                  <p className="text-lg" style={{ color: "#9c7b5e" }}>
                    No hay publicaciones para mostrar.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PublicacionesPage;
