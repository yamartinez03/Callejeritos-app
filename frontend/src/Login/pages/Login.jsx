import { useState } from "react";
import { Eye,EyeOff, MapPinned,History,BellRing,Wallet,ShieldCheck,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import perrito from "../../assets/perrito.png";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ThemeToggle } from "@/components/theme-toggle";
import LogoUtn from "../../assets/LogoUtn.png"

const FEATURES = [
  { icon: History, text: "Historial clínico en tiempo real" },
  { icon: BellRing, text: "Alertas automáticas de vacunación" },
  { icon: Wallet, text: "Control de gastos por animal" },
  { icon: ShieldCheck, text: "Moderación de avistamientos" },
];

export default function Login({ onSubmit }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Completá tu correo y contraseña para continuar.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit?.({ email, password, remember });
    } catch (err) {
      setError(err?.message || "No pudimos verificar tus datos. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-[1.2fr_1fr]">
 
      <div className="relative flex flex-col justify-between overflow-hidden p-8 text-primary-foreground md:p-12">
        <img
          src={perrito}
          alt=""
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-brand mix-blend-multiply" />
        <div className="absolute inset-0 bg-brand/30" />

        <div className="relative z-10">
          <Header />
        </div>


        <div className="relative z-10 flex flex-1 flex-col justify-center gap-10">
          <div>
            <h1 className="text-4xl font-bold text-balance md:text-5xl">
             Cada historia 
              <span className="text-secundary "> merece un hogar </span>
              </h1>
              <h2 className="text-secundary  tracking-widest opacity-70"> 
                <br />  
              Sumate al equipo y ayudá a que más animales encuentren su hogar
              </h2>
          </div>
           


          <ul className="space-y-3">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 text-sm backdrop-blur-sm"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/15">
                  <Icon className="size-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

      <div className="relative z-10 mt-9 flex flex-col gap-1.5 text-xs text-primary-foreground/60">
               <p>  ©2026 Callejeritos </p>
               <p>Desarrollado por alumnos de la Universidad Tecnológica Nacional </p>
              <img
               src={LogoUtn}
               alt="Logo UTN La Plata"
               className="h-2 w-auto object-contain tracking-widest opacity-50"
                />
              </div>
           </div>

   
      <div className="relative flex flex-col justify-center bg-card p-8 md:p-12">
        <div className="absolute right-6 top-6 rounded-full border border-border bg-background/60 p-1 backdrop-blur-sm">
          <ThemeToggle />
        </div>

        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-3xl font-bold text-card-foreground md:text-3xl">
            Te damos la bienvenida
          </h2>
          <p className="mt-1 text-base text-muted-foreground">
            Ingresá con tu cuenta para acceder al sistema
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              id="email"
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-foreground"
              >
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-3.5 rounded border-input accent-primary"
                />
                Recordar
              </label>
              <a href="#" className="font-medium text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verificando..." : "Inicio de sesion" }
            </Button>
          </form>

          <Button
            type="button"
            variant="outline-brand"
            className="mt-3 w-full"
            onClick={() => navigate("/registro")}
          >
            Crear una cuenta
          </Button>

          <div className="my-6 flex items-center gap-3 text-sm font-medium text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
             acceso público
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full gap-2">
            <MapPinned className="size-4" />
            Reportar avistamiento / animal perdido
          </Button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            ¿Sin acceso?{" "}
            <a href="#" className="font-medium text-primary hover:underline">
              Contactá al equipo
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}