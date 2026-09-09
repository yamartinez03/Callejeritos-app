import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicacionCard from "./components/PublicacionCard";
import CrearPublicacionForm from "./components/CrearPublicacionForm";
import logo from "@/assets/callejeritos-logo.png";
import heroPhoto from "@/assets/photo-hero.jpg";

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
  const navigate = useNavigate();
  const [filter, setFilter] = useState("TODOS");
  const [showCrearForm, setShowCrearForm] = useState(false);
  const [allContent, setAllContent] = useState([
    ...PUBLICACIONES_MOCK,
    ...ANIMALES_MOCK,
  ]);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // para el buscador de publicaciones
  const [busqueda, setBusqueda] = useState("");

  // Carrusel del hero con autoplay --- verificar con Laura
  const heroSlides = [
    {
      image: heroPhoto,
      title: "Asociación Callejeritos Villa Elisa",
      description:
        "Rescatamos, rehabilitamos y buscamos hogares responsables para animales en situación de calle, promoviendo el respeto y bienestar animal hacia una comunidad sin abandono.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&q=80",
      title: "Juntos por ellos",
      description:
        "Cada gesto de amor cuenta. Trabajamos incansablemente para dar una segunda oportunidad a quienes más lo necesitan, construyendo lazos inquebrantables entre humanos y animales.",
    },
  ];

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  // Autoplay del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      nextHeroSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredContent = allContent.filter((item) => {
    const esAnimal =
      item.estado === "EN_ADOPCION" || item.estado === "EN_TRANSITO";
    const estaAprobado = esAnimal || item.estadoaprobado === "APROBADA";
    const tipoItem = item.tipoPublicacion || item.estado;
    //filtra por tipo de publicación y estado aprobado
    // Filtro por tipo
    const pasaFiltro =
      filter === "TODOS"
        ? estaAprobado
        : filter === "EN_ADOPCION"
          ? (item.estado === "EN_ADOPCION" || item.estado === "EN_TRANSITO") &&
            estaAprobado
          : tipoItem === filter && estaAprobado;

    if (busqueda.trim() !== "") {
      const termino = busqueda.toLowerCase();
      const textosBuscables = [
        item.descripcion,
        item.zona,
        item.nombreVisitante,
        item.nombre,
        item.colorpelaje,
        item.especie,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return pasaFiltro && textosBuscables.includes(termino);
    }

    return pasaFiltro;
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
    <div className="min-h-screen" style={{ backgroundColor: "var(--muted)" }}>
      {/* Navbar sticky */}
      <nav
        className="px-6 py-4 flex items-center justify-between border-b sticky top-0 z-50"
        style={{ backgroundColor: "var(--secondary)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Callejeritos logo"
            className="h-10 w-10 object-contain"
          />
          <div>
            <h1
              className="text-lg font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Callejeritos Villa Elisa
            </h1>
          </div>
        </div>
        <Button className="font-semibold" onClick={() => navigate("/login")}>
          Iniciar sesión
        </Button>
      </nav>

      {/* Hero Section con Carrusel */}
      <div className="relative w-full h-96 md:h-[600px] overflow-hidden">
        <div
          className="relative w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-500"
          style={{
            backgroundImage: `url('${heroSlides[currentHeroSlide].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

          {/* Controles del carrusel */}
          <button
            onClick={prevHeroSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={nextHeroSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Indicador del carrusel */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentHeroSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
            <div className="max-w-3xl md:max-w-4xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight whitespace-nowrap">
                {heroSlides[currentHeroSlide].title}
              </h1>
              <p className="text-base md:text-xl lg:text-2xl text-white/95 mb-6 md:mb-8 leading-relaxed">
                {heroSlides[currentHeroSlide].description}
              </p>
              <button className="font-semibold px-6 py-3 text-lg border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors">
                Conocer Más
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(to bottom, var(--background), var(--muted))",
        }}
      >
        {/* Contenido principal */}
        <main className="px-10 py-8">
          {/* Header de sección */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                Publicaciones activas
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
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
                    filter === f.valor ? "var(--filter-active)" : "transparent",
                  color:
                    filter === f.valor
                      ? "var(--primary-foreground)"
                      : "var(--muted-foreground)",
                  borderColor:
                    filter === f.valor
                      ? "var(--filter-active)"
                      : "var(--border)",
                }}
              >
                {f.etiqueta}
              </button>
            ))}

            {/* Buscador — en desktop a la derecha, en mobile nueva fila alineado a la derecha */}
            <div
              className="ml-auto flex items-center gap-2 border rounded-full px-4 py-1.5 bg-white w-full md:w-auto"
              style={{ borderColor: "var(--border)" }}
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
    </div>
  );
};

export default PublicacionesPage;
