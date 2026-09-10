import { useState, useEffect } from "react";
import logo from "@/assets/callejeritos-logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import PublicacionesPage from "./PublicacionesPage";

const PublicacionesHeader = () => {
  const navigate = useNavigate();
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Carrusel del hero con autoplay
  const heroSlides = [
    {
      image: "./src/assets/photo-hero.jpg",
      title: "Asociación Callejeritos Villa Elisa",
      description:
        "Rescatamos, rehabilitamos y buscamos hogares responsables para animales en situación de calle, promoviendo el respeto y bienestar animal hacia una comunidad sin abandono.",
    },
    {
      image: "./src/assets/photo-hero2.jpg",
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--muted)" }}>
      {/* Navbar sticky responsivo */}
      <nav
        className="px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between border-b sticky top-0 z-50"
        style={{ backgroundColor: "var(--secondary)" }}
      >
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <img
            src={logo}
            alt="Callejeritos logo"
            className="h-7 w-7 sm:h-10 sm:w-10 object-contain flex-shrink-0"
          />
          <div className="min-w-0">
            <h1
              className="text-xs sm:text-lg font-bold truncate whitespace-nowrap"
              style={{ color: "var(--foreground)" }}
            >
              Callejeritos Villa Elisa
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <ThemeToggle />
          <Button
            size="sm"
            className="font-semibold text-xs sm:text-sm px-2.5 sm:px-4 py-1 sm:py-2 h-auto"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </Button>
        </div>
      </nav>

      {/* Hero Section con Carrusel */}
      <div className="relative w-full h-[420px] sm:h-96 md:h-[600px] overflow-hidden">
        <div
          className="relative w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-500"
          style={{
            backgroundImage: `url('${heroSlides[currentHeroSlide].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

          {/* Controles del carrusel */}
          <button
            onClick={prevHeroSlide}
            aria-label="Anterior slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.2)")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-6 sm:h-6"
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
            aria-label="Siguiente slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.2)")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-6 sm:h-6"
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
                aria-label={`Ir al slide ${index + 1}`}
                className="w-2 h-2 rounded-full transition-colors"
                style={{
                  backgroundColor:
                    index === currentHeroSlide
                      ? "white"
                      : "rgba(255, 255, 255, 0.5)",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-16 lg:px-24">
            <div className="max-w-3xl md:max-w-4xl pr-4 sm:pr-0">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-6 leading-tight">
                {heroSlides[currentHeroSlide].title}
              </h1>
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-5 sm:mb-8 leading-relaxed line-clamp-4 sm:line-clamp-none">
                {heroSlides[currentHeroSlide].description}
              </p>
              <button className="font-semibold px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors">
                Donaciones
              </button>
            </div>
          </div>
        </div>
      </div>
      <PublicacionesPage />
    </div>
  );
};

export default PublicacionesHeader;
