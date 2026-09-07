import { useState } from "react";
import { Eye, EyeOff, History, BellRing, Wallet, ShieldCheck, PawPrint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import perrito from "../../assets/perrito.png";
import LogoUtn from "../../assets/LogoUtn.png";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRoles } from "@/hooks/useRoles";
import RegisterSuccess from "./RegisterSuccess";

const FEATURES = [
  { icon: History, text: "Historial clínico en tiempo real" },
  { icon: BellRing, text: "Alertas automáticas de vacunación" },
  { icon: Wallet, text: "Control de gastos por animal" },
  { icon: ShieldCheck, text: "Moderación de avistamientos" },
];

// Huellas del "caminito de barro": van alternando de lado (como dos patas)
// mientras bajan en diagonal por el costado derecho del panel blanco.
const PAW_TRAIL = [
  { top: 40, right: 40, rotate: -35 },
  { top: 92, right: 12, rotate: -55 },
  { top: 148, right: 44, rotate: -35 },
  { top: 200, right: 16, rotate: -55 },
  { top: 256, right: 48, rotate: -35 },
  { top: 308, right: 20, rotate: -55 },
];

export default function Registro({ onSubmit }) {
  const navigate = useNavigate();
  const { roles, loading: rolesLoading } = useRoles();

  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [justRegistered, setJustRegistered] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !dni || !username || !email || !password || !confirmPassword || !role) {
      setError("Completá todos los campos obligatorios.");
      return;
    }
    if (!/^\d+$/.test(dni)) {
      setError("El DNI solo puede tener números.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña tiene que tener al menos 6 caracteres.");
      return;
    }
    if (!acceptedTerms) {
      setError("Tenés que aceptar los términos para continuar.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit?.({ name, dni, username, email, phone, role, password });
      const selectedRole = roles.find((r) => String(r.value) === String(role));
      setJustRegistered({ name, roleLabel: selectedRole?.label ?? "" });
    } catch (err) {
      setError(err?.message || "No pudimos crear tu cuenta. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (justRegistered) {
    return (
      <RegisterSuccess
        name={justRegistered.name}
        role={justRegistered.roleLabel}
        onContinue={() => navigate("/login")}
      />
    );
  }

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
                  <h1 className="text-4xl font-bold text-balance md:text-4xl">
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
      

      <div className="relative flex flex-col justify-center overflow-y-auto bg-card p-8 md:p-12">
        <div className="absolute right-6 top-6 rounded-full border border-border bg-background/60 p-1 backdrop-blur-sm">
          <ThemeToggle />
        </div>


        <div className="mx-auto w-full max-w-lg py-8">
          <h2 className="text-3xl font-bold text-card-foreground">
            Creá tu cuenta
          </h2>
          <p className="mt-1 text-base text-muted-foreground">
            Completá tus datos
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="name"
                label="Nombre completo"
                type="text"
                autoComplete="name"
                placeholder="Ej: Ana González"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                id="dni"
                label="DNI"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Ej: 38456123"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />

              <Input
                id="username"
                label="Nombre de usuario"
                type="text"
                autoComplete="username"
                placeholder="Ej: ana.gonzalez"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                id="phone"
                label="Teléfono (opcional)"
                type="tel"
                autoComplete="tel"
                placeholder="221-5551234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <Input
              id="email"
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="space-y-1.5">
              <label htmlFor="role" className="text-xs font-medium text-foreground">
                Tipo de cuenta
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={rolesLoading}
                className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-60"
              >
                <option value="" disabled>
                  {rolesLoading ? "Cargando opciones..." : "Seleccioná una opción"}
                </option>
                {roles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-medium text-foreground">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <Input
                id="confirmPassword"
                label="Confirmar contraseña"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repetí tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 size-3.5 rounded border-input accent-primary"
              />
              Acepto los términos de uso y el tratamiento de mis datos.
            </label>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            ¿Ya tenés cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-primary hover:underline"
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}