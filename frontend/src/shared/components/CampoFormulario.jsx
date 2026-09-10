import { Label } from "@/components/ui/label";

/**
 * Wrapper label + control + error, usado por todos los formularios del
 * módulo de Historial Clínico. Cuando el dato ingresado no es válido, el
 * campo se resalta con `border-destructive` y muestra el mensaje debajo
 * (GH_02..GH_08, flujo alternativo "Datos no válidos").
 */
export default function CampoFormulario({ label, error, full, children }) {
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label>{label}</Label>
      <div className={error ? "[&_input]:border-destructive [&_button]:border-destructive [&_textarea]:border-destructive" : ""}>
        {children}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}