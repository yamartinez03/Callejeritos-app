import { useState } from "react"
import { Stethoscope, Building2, Plus, Pencil, Trash2, Phone, Mail, MessageCircle, AtSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useToast } from "@/components/use-toast"
import {
  catalogoServicios,
  veterinariasIniciales,
  profesionalesIniciales,
  siguienteId,
} from "@/Veterinarias/veterinarias-data"

export default function VeterinariasPage() {
  const [veterinarias, setVeterinarias] = useState(veterinariasIniciales)
  const [profesionales, setProfesionales] = useState(profesionalesIniciales)
  const [vetDialog, setVetDialog] = useState({ open: false, item: null })
  const [profDialog, setProfDialog] = useState({ open: false, item: null })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const showToast = useToast()

  function saveVeterinaria(data) {
    setVeterinarias((current) =>
      data.id
        ? current.map((v) => (v.id === data.id ? data : v))
        : [...current, { ...data, id: siguienteId(current) }]
    )
    showToast(data.id ? "Veterinaria actualizada" : "Veterinaria agregada", "success")
    setVetDialog({ open: false, item: null })
  }

  function saveProfesional(data) {
    setProfesionales((current) =>
      data.id
        ? current.map((p) => (p.id === data.id ? data : p))
        : [...current, { ...data, id: siguienteId(current) }]
    )
    showToast(data.id ? "Profesional actualizado" : "Profesional agregado", "success")
    setProfDialog({ open: false, item: null })
  }

  function confirmDelete() {
    if (!deleteTarget) return
    if (deleteTarget.tipo === "veterinaria") {
      setVeterinarias((current) => current.filter((v) => v.id !== deleteTarget.id))
    } else {
      setProfesionales((current) => current.filter((p) => p.id !== deleteTarget.id))
    }
    showToast(`${deleteTarget.nombre} eliminado`, "warning")
    setDeleteTarget(null)
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Veterinarias y Profesionales</h1>
        <p className="text-sm text-muted-foreground">
          Directorio de veterinarias y profesionales independientes que atienden a los animales.
        </p>
      </div>

      <Tabs defaultValue="veterinarias">
        <TabsList>
          <TabsTrigger value="veterinarias">
            <Building2 /> Veterinarias
          </TabsTrigger>
          <TabsTrigger value="profesionales">
            <Stethoscope /> Profesionales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="veterinarias" className="mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Veterinarias</CardTitle>
              <Button size="sm" onClick={() => setVetDialog({ open: true, item: null })}>
                <Plus /> Nueva veterinaria
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Servicios</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {veterinarias.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium">{v.nombre}</TableCell>
                      <TableCell>
                        <ContactoCell
                          telefono={v.telefono}
                          email={v.email}
                          whatsapp={v.whatsapp}
                          instagram={v.instagram}
                        />
                      </TableCell>
                      <TableCell className="whitespace-normal">{v.direccion}</TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="flex flex-wrap gap-1">
                          {v.servicios.map((s) => (
                            <Badge key={s} variant="secondary">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <RowActions
                          onEdit={() => setVetDialog({ open: true, item: v })}
                          onDelete={() => setDeleteTarget({ tipo: "veterinaria", id: v.id, nombre: v.nombre })}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profesionales" className="mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Profesionales independientes</CardTitle>
              <Button size="sm" onClick={() => setProfDialog({ open: true, item: null })}>
                <Plus /> Nuevo profesional
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profesionales.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.nombre}</TableCell>
                      <TableCell>
                        <ContactoCell
                          telefono={p.telefono}
                          email={p.email}
                          whatsapp={p.whatsapp}
                          instagram={p.instagram}
                        />
                      </TableCell>
                      <TableCell>{p.especialidad}</TableCell>
                      <TableCell className="text-right">
                        <RowActions
                          onEdit={() => setProfDialog({ open: true, item: p })}
                          onDelete={() => setDeleteTarget({ tipo: "profesional", id: p.id, nombre: p.nombre })}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <VeterinariaDialog
        key={vetDialog.item?.id ?? "new-vet"}
        open={vetDialog.open}
        item={vetDialog.item}
        onOpenChange={(open) => setVetDialog((s) => ({ ...s, open }))}
        onSubmit={saveVeterinaria}
      />

      <ProfesionalDialog
        key={profDialog.item?.id ?? "new-prof"}
        open={profDialog.open}
        item={profDialog.item}
        onOpenChange={(open) => setProfDialog((s) => ({ ...s, open }))}
        onSubmit={saveProfesional}
      />

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar {deleteTarget?.nombre}?</DialogTitle>
            <DialogDescription>Esta acción no se puede deshacer.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ContactoCell({ telefono, email, whatsapp, instagram }) {
  return (
    <div className="flex flex-col gap-0.5 text-sm">
      {telefono && (
        <span className="flex items-center gap-1.5">
          <Phone className="size-3.5 text-muted-foreground" /> {telefono}
        </span>
      )}
      {email && (
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Mail className="size-3.5" /> {email}
        </span>
      )}
      {whatsapp && (
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <MessageCircle className="size-3.5" /> {whatsapp}
        </span>
      )}
      {instagram && (
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <AtSign className="size-3.5" />
          <a
            href={instagram.startsWith("http") ? instagram : `https://instagram.com/${instagram.replace(/^@/, "")}`}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {instagram}
          </a>
        </span>
      )}
    </div>
  )
}

function RowActions({ onEdit, onDelete }) {
  return (
    <div className="flex justify-end gap-1">
      <Button variant="ghost" size="icon-sm" onClick={onEdit} aria-label="Editar">
        <Pencil />
      </Button>
      <Button variant="ghost" size="icon-sm" onClick={onDelete} aria-label="Eliminar">
        <Trash2 />
      </Button>
    </div>
  )
}

function VeterinariaDialog({ open, item, onOpenChange, onSubmit }) {
  const [nombre, setNombre] = useState(item?.nombre ?? "")
  const [telefono, setTelefono] = useState(item?.telefono ?? "")
  const [email, setEmail] = useState(item?.email ?? "")
  const [whatsapp, setWhatsapp] = useState(item?.whatsapp ?? "")
  const [instagram, setInstagram] = useState(item?.instagram ?? "")
  const [direccion, setDireccion] = useState(item?.direccion ?? "")
  const [servicios, setServicios] = useState(item?.servicios ?? [])

  function toggleServicio(servicio, checked) {
    setServicios((current) =>
      checked ? [...current, servicio] : current.filter((s) => s !== servicio)
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!nombre.trim()) return
    onSubmit({ id: item?.id, nombre, telefono, email, whatsapp, instagram, direccion, servicios })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{item ? "Editar veterinaria" : "Nueva veterinaria"}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="vet-nombre">Nombre *</Label>
            <Input id="vet-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vet-telefono">Teléfono</Label>
              <Input id="vet-telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vet-email">Email</Label>
              <Input id="vet-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vet-whatsapp">WhatsApp</Label>
              <Input id="vet-whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vet-instagram">Instagram</Label>
              <Input
                id="vet-instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@usuario o link"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="vet-direccion">Dirección</Label>
            <Input id="vet-direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Servicios ofrecidos</Label>
            <div className="grid grid-cols-2 gap-2">
              {catalogoServicios.map((servicio) => (
                <label key={servicio} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={servicios.includes(servicio)}
                    onCheckedChange={(checked) => toggleServicio(servicio, checked)}
                  />
                  {servicio}
                </label>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ProfesionalDialog({ open, item, onOpenChange, onSubmit }) {
  const [nombre, setNombre] = useState(item?.nombre ?? "")
  const [telefono, setTelefono] = useState(item?.telefono ?? "")
  const [email, setEmail] = useState(item?.email ?? "")
  const [whatsapp, setWhatsapp] = useState(item?.whatsapp ?? "")
  const [instagram, setInstagram] = useState(item?.instagram ?? "")
  const [especialidad, setEspecialidad] = useState(item?.especialidad ?? "")

  function handleSubmit(e) {
    e.preventDefault()
    if (!nombre.trim() || !especialidad.trim()) return
    onSubmit({ id: item?.id, nombre, telefono, email, whatsapp, instagram, especialidad })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{item ? "Editar profesional" : "Nuevo profesional"}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="prof-nombre">Nombre *</Label>
            <Input id="prof-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prof-telefono">Teléfono</Label>
              <Input id="prof-telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prof-email">Email</Label>
              <Input id="prof-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prof-whatsapp">WhatsApp</Label>
              <Input id="prof-whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prof-instagram">Instagram</Label>
              <Input
                id="prof-instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@usuario o link"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="prof-especialidad">Especialidad *</Label>
            <Input
              id="prof-especialidad"
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              placeholder="Ej: Cirugía, Clínica general..."
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
