import { useMemo, useState } from "react"
import { Bell, Bug, Syringe, Send, Download, CircleCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/use-toast"
import {
  registrosIniciales,
  conDias,
  calcularProximaFecha,
} from "@/Alertas/alertas-data"

const fmt = (fecha) =>
  new Date(fecha).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })

const ESTADO_BADGE = {
  vencida: "bg-destructive/10 text-destructive",
  proxima: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "al-dia": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

const ESTADO_LABEL = {
  vencida: "Vencida",
  proxima: (dias) => `${dias} días`,
  "al-dia": "Al día",
}

export default function AlertasPage() {
  const [registros, setRegistros] = useState(registrosIniciales)
  const showToast = useToast()

  const conVencimiento = useMemo(() => registros.map(conDias), [registros])

  const alertasActivas = useMemo(
    () => conVencimiento.filter((r) => r.dias <= 30).sort((a, b) => a.dias - b.dias),
    [conVencimiento]
  )

  const vencidas = alertasActivas.filter((a) => a.estado === "vencida").length
  const proximas = alertasActivas.filter((a) => a.estado === "proxima").length
  const alDia = conVencimiento.filter((r) => r.estado === "al-dia").length

  function registrarAplicacion(registro) {
    const hoy = "2026-06-15"
    const proxima = calcularProximaFecha(registro.tipo, hoy)
    setRegistros((current) =>
      current.map((r) =>
        r.id === registro.id ? { ...r, fechaAplicacion: hoy, fechaVencimiento: proxima } : r
      )
    )
    showToast(`${registro.nombre} registrada para ${registro.animal}`, "success")
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Bell className="size-6 text-primary" />
        <div>
          <h1 className="text-xl font-semibold">Centro de Alertas</h1>
          <p className="text-sm text-muted-foreground">
            Notificaciones automáticas de vencimientos según plan veterinario
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Vencidas" value={vencidas} tone="text-destructive" />
        <StatCard label="Próximos 30 días" value={proximas} tone="text-amber-600 dark:text-amber-400" />
        <StatCard label="Al día" value={alDia} tone="text-emerald-600 dark:text-emerald-400" />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Alertas activas</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => showToast("Notificaciones enviadas a todos los hogares con alertas", "success")}
            >
              <Send /> Notificar tránsitos
            </Button>
            <Button size="sm" onClick={() => showToast("Listado exportado", "info")}>
              <Download /> Exportar listado
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {alertasActivas.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
              <CircleCheck className="size-8 text-emerald-500" />
              <p>No hay alertas activas.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Hogar de tránsito</TableHead>
                  <TableHead>Tipo de alerta</TableHead>
                  <TableHead>Última aplicación</TableHead>
                  <TableHead>Vence</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertasActivas.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <span className="mr-1.5">{r.emoji}</span>
                      {r.animal}
                    </TableCell>
                    <TableCell>
                      <div>{r.hogar}</div>
                      <div className="text-xs text-muted-foreground">{r.telefono}</div>
                    </TableCell>
                    <TableCell>
                      {r.tipo === "desparasitacion" ? (
                        <Bug className="mr-1 inline size-3.5 text-muted-foreground" />
                      ) : (
                        <Syringe className="mr-1 inline size-3.5 text-muted-foreground" />
                      )}
                      {r.nombre}
                    </TableCell>
                    <TableCell>{fmt(r.fechaAplicacion)}</TableCell>
                    <TableCell
                      className={cn(
                        "font-medium",
                        r.estado === "vencida" && "text-destructive",
                        r.estado === "proxima" && "text-amber-600 dark:text-amber-400"
                      )}
                    >
                      {fmt(r.fechaVencimiento)}
                    </TableCell>
                    <TableCell>
                      <Badge className={ESTADO_BADGE[r.estado]}>
                        {r.estado === "proxima" ? ESTADO_LABEL.proxima(r.dias) : ESTADO_LABEL[r.estado]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant={r.estado === "vencida" ? "default" : "secondary"}
                        onClick={() => registrarAplicacion(r)}
                      >
                        Registrar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ label, value, tone }) {
  return (
    <Card>
      <CardContent className="flex items-baseline gap-2">
        <span className={cn("text-3xl font-semibold", tone)}>{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  )
}
