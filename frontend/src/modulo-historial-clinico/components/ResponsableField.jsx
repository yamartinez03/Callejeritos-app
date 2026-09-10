import CampoFormulario from "@/shared/components/CampoFormulario";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VETERINARIAS } from "@/shared/data/mockAnimales";
import { PROFESIONALES } from "@/shared/data/mockHistorialClinico";

/*
 Campo "Veterinaria o profesional" (desplegable del directorio del
 sistema + opción "otro").
 Props:
 - responsableId / responsableOtro: valores controlados del formulario padre.
 - onChangeId / onChangeOtro: setters.
 - erroresPorCampo: { responsableId?, responsableOtro? } (opcional).
 */
export default function ResponsableField({
  responsableId,
  responsableOtro,
  onChangeId,
  onChangeOtro,
  errorId,
  errorOtro,
}) {
  return (
    <>
      <CampoFormulario label="Veterinaria o profesional" error={errorId}>
        <Select value={responsableId} onValueChange={onChangeId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccioná una opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Veterinarias</SelectLabel>
              {VETERINARIAS.map((v) => (
                <SelectItem key={`vet-${v.idresponsable}`} value={String(v.idresponsable)}>
                  {v.nombre}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Profesionales</SelectLabel>
              {PROFESIONALES.map((p) => (
                <SelectItem key={`prof-${p.idresponsable}`} value={String(p.idresponsable)}>
                  {p.nombre} ({p.especialidad})
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectItem value="OTRO">Otro…</SelectItem>
          </SelectContent>
        </Select>
      </CampoFormulario>

      {responsableId === "OTRO" && (
        <CampoFormulario label="Otro (especificar)" error={errorOtro}>
          <Input
            value={responsableOtro}
            onChange={(e) => onChangeOtro(e.target.value)}
            placeholder="Nombre de la veterinaria o profesional"
          />
        </CampoFormulario>
      )}
    </>
  );
}