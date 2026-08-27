import { useState } from "react";
import { Button } from "@/components/ui/button";
import PublicacionCard from "./components/PublicacionCard";
import CrearPublicacionForm from "./components/CrearPublicacionForm";

// Datos de ejemplo simulados basados en el schema de Prisma
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

// Datos de ejemplo de animales en adopción/transito basados en el schema de Prisma

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
  // Combinar publicaciones y animales en un solo array
  const [allContent, setAllContent] = useState([
    ...PUBLICACIONES_MOCK,
    ...ANIMALES_MOCK,
  ]);

  // FILTRADO UNIFICADO
  // Aquí se debería llamar al backend: GET /api/publicaciones?tipo=X&estado=APROBADA
  // Y para animales: GET /api/animales?estado=EN_ADOPCION,EN_TRANSITO
  // El backend debería devolver todo en un formato unificado

  const filteredContent = allContent.filter((item) => {
    const esAnimal =
      item.estado === "EN_ADOPCION" || item.estado === "EN_TRANSITO";
    const estaAprobado = esAnimal || item.estadoaprobado === "APROBADA";
    const tipoItem = item.tipoPublicacion || item.estado;
    // Filtro "TODOS"
    if (filter === "TODOS") return estaAprobado;

    // Si seleccionan "EN_ADOPCION", mostramos tanto EN_ADOPCION como EN_TRANSITO
    if (filter === "EN_ADOPCION") {
      return (
        (item.estado === "EN_ADOPCION" || item.estado === "EN_TRANSITO") &&
        estaAprobado
      );
    }

    // Resto de los filtros (PERDIDO, ENCONTRADO, AVISTAMIENTO)
    return tipoItem === filter && estaAprobado;
  });

  // CREAR NUEVA PUBLICACIÓN
  // Aquí se debería llamar al backend: POST /api/publicaciones
  const handleCrearPublicacion = async (datos) => {
    console.log("Datos para enviar al backend:", datos);

    // CALL TO BACKEND: POST /api/publicaciones
    // const response = await fetch('http://localhost:3000/api/publicaciones', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}` // si está autenticado
    //   },
    //   body: JSON.stringify({
    //     tipoPublicacion: datos.tipoPublicacion,
    //     descripcion: datos.descripcion,
    //     zona: datos.zona,
    //     fecha: datos.fecha,
    //     nombreVisitante: datos.nombreVisitante || null,
    //     emailVisitante: datos.emailVisitante || null,
    //     telefonoVisitante: datos.telefonoVisitante || null,
    //     // Si el usuario está autenticado, enviar idpersonapublico
    //     // idpersonapublico: usuarioId
    //   })
    // })

    // Simulación exitosa utilizando el mock de publicaciones
    const nuevaPublicacion = {
      idpublicacion: PUBLICACIONES_MOCK.length + 1,
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
      estadoaprobado: "PENDIENTE", // Las publicaciones nuevas quedan pendientes de aprobación
      resuelto: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fotos: [],
    };

    setAllContent((prevContent) => [nuevaPublicacion, ...prevContent]);
    setShowCrearForm(false);
    alert(
      "Publicación creada exitosamente. Quedará pendiente de aprobación por un administrador.",
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <h1 className="text-lg font-bold text-gray-900">
            Callejeritos Villa Elisa
          </h1>
        </div>
        <Button variant="outline">Iniciar sesión</Button>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl font-bold text-black">
              Publicaciones de Animales
            </h2>
            <Button onClick={() => setShowCrearForm(!showCrearForm)}>
              {showCrearForm ? "Cancelar" : "+ Nueva publicacion"}
            </Button>
          </div>
          <p className="text-gray-500">
            Perdidos, encontrados y avistamientos en Villa Elisa
          </p>
        </div>

        {showCrearForm ? (
          <CrearPublicacionForm
            onSubmit={handleCrearPublicacion}
            onCancel={() => setShowCrearForm(false)}
          />
        ) : (
          <>
            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={filter === "TODOS" ? "default" : "outline"}
                onClick={() => setFilter("TODOS")}
              >
                Todas
              </Button>
              <Button
                variant={filter === "PERDIDO" ? "default" : "outline"}
                onClick={() => setFilter("PERDIDO")}
              >
                Perdidos
              </Button>
              <Button
                variant={filter === "ENCONTRADO" ? "default" : "outline"}
                onClick={() => setFilter("ENCONTRADO")}
              >
                Encontrados
              </Button>
              <Button
                variant={filter === "AVISTAMIENTO" ? "default" : "outline"}
                onClick={() => setFilter("AVISTAMIENTO")}
              >
                Avistamientos
              </Button>
              <Button
                variant={filter === "EN_ADOPCION" ? "default" : "outline"}
                onClick={() => setFilter("EN_ADOPCION")}
              >
                En Adopcion
              </Button>
            </div>

            {/* Contador */}
            <p className="text-gray-600 mb-6">
              Mostrando {filteredContent.length} elementos
            </p>

            {/* Grid de contenido unificado */}
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
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No hay elementos para mostrar
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default PublicacionesPage;
