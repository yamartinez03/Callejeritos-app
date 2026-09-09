import icon from "../../assets/callejeritos-icono.png";

export function Header({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/95 p-1.5 shadow-sm">
        <img src={icon} alt="Callejeritos" className="h-full w-full object-contain" />
      </span>
      <div className="flex flex-col items-center leading-tight">
        <p className="text-xl font-semibold md:text-2xl">Callejeritos</p>
        <p className="text-[10px] text-center tracking-widest opacity-70">
          GESTIÓN ANIMAL
        </p>
      </div>
    </div>
  );
}
