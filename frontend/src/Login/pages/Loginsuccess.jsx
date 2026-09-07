import { CheckCircle2, History, BellRing, Wallet, ShieldCheck } from "lucide-react";
import perrito from "../../assets/perrito.png";
import { Header } from "../components/Header";
import { ThemeToggle } from "@/components/theme-toggle";
import LogoUtn from "../../assets/LogoUtn.png";

const FEATURES = [
  { icon: History, text: "Historial clínico en tiempo real" },
  { icon: BellRing, text: "Alertas automáticas de vacunación" },
  { icon: Wallet, text: "Control de gastos por animal" },
  { icon: ShieldCheck, text: "Moderación de avistamientos" },
];

export default function LoginSuccess({
  userName = "María Acosta",
  role = "Administrador",
}) {
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

       
   
      
      <div className="relative flex flex-col items-center justify-center gap-3 bg-card p-8 text-center md:p-12">
        <div className="absolute right-6 top-6 rounded-full border border-border bg-background/60 p-1 backdrop-blur-sm">
          <ThemeToggle />
        </div>

        <span className="flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-7" />
        </span>

        <div>
          <p className="font-semibold text-card-foreground">
            Acceso verificado
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Redirigiendo al sistema…
          </p>
          <p className="text-sm text-muted-foreground">
            Bienvenido/a,{" "}
            <span className="font-medium text-foreground">{userName}</span>
          </p>
        </div>

        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {role}
        </span>

        <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}