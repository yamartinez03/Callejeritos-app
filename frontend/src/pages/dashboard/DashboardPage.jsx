import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { STAFF_ROLES, ALL_AUTHENTICATED_ROLES } from "@/lib/roles";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, Eye, FileText, LogOut, BookCheck } from "lucide-react";
import logo from "@/assets/callejeritos-logo.png";
// Avatar de ejemplo mientras no tenemos el backend
import avatarEjemplo from "@/assets/ejemploUser.jpg";
import PublicacionesPage from "../publicaciones/PublicacionesPage";

// ─── Navegación del sidebar ───────────────────────────────────────────────────
// Cada módulo nuevo que agreguen va acá como un objeto en el array `NAV_ITEMS`.
// Estructura de un ítem con submenú:
// { title: "Nombre", icon: IconoLucide, subitems: [{ title: "Sub", key: "clave",icon: IconoLucide,  roles: [] }] }
// Estructura de un ítem sin submenú:
// { title: "Nombre", icon: IconoLucide, key: "clave", roles: [] }
// Si no se especifica `roles`, el ítem es visible para todos los roles autenticados
const NAV_ITEMS = [
  {
    title: "Publicaciones",
    icon: FileText, // ícono acá
    roles: ALL_AUTHENTICATED_ROLES,
    subitems: [
      {
        title: "Moderar publicaciones",
        key: "moderarPublicacion",
        icon: BookCheck,
        roles: STAFF_ROLES,
      },
      {
        title: "Ver publicaciones",
        key: "verPublicacion",
        icon: Eye, // <--- Igual acá
        roles: ALL_AUTHENTICATED_ROLES,
      },
    ],
  },
  /* ── AGREGAR NUEVOS GRUPOS ACÁ ──────────────────────────────────────────────
  Ejemplo:
  {
     title: "Animales",
     icon: IconoLucide,
     roles: STAFF_ROLES, // Solo staff
     subitems: [
       { title: "Gestión de animales", icon: IconoLucide, key: "animales", roles: STAFF_ROLES },
     ],
  },
  {
     title: "Tránsito",
     icon: IconoLucide,
     key: "transito",
     roles: ALL_AUTHENTICATED_ROLES,
  },
  {
     title: "Adopciones",
     icon: IconoLucide,
     key: "adopciones",
     roles: ALL_AUTHENTICATED_ROLES,
  },
  {
     title: "Inventario",
     icon: IconoLucide,
     key: "inventario",
     roles: STAFF_ROLES, // Solo staff
  }, */
];

// ─── Contenido por página ─────────────────────────────────────────────────────
// Cuando agreguen una página nueva, importenla arriba y agreguen su case acá
// con la clave que definieron en NAV_ITEMS.
function renderContent(currentPage) {
  switch (currentPage) {
    case "moderarPublicacion":
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Moderar publicaciones
          </h1>
          <p className="text-muted-foreground">
            Aquí podrás moderar las publicaciones pendientes de aprobación.
          </p>
        </div>
      );

    case "verPublicacion":
      return <PublicacionesPage />;

    case "perfil":
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Configuración y datos del usuario actual.
          </p>
        </div>
      );
    // ── AGREGAR NUEVOS CASES ACÁ ───────────────────────────────────────────
    // case "animales":
    //   return <AnimalesPage />;
    // case "transito":
    //   return <TransitoPage />;
    // case "adopciones":
    //   return <AdopcionesPage />;
    // case "inventario":
    //   return <InventarioPage />;

    default:
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Página no encontrada
          </h1>
          <p className="text-muted-foreground">
            La sección solicitada no existe. Seleccioná una opción del menú.
          </p>
        </div>
      );
  }
}

// ─── Sidebar interno ──────────────────────────────────────────────────────────
function AppSidebar({ currentPage, onPageSelect, user, onLogout }) {
  const { setOpenMobile } = useSidebar();
  const userRole = user?.role;

  // Selecciona la página y cierra el drawer en mobile
  const handleSelectPage = (key) => {
    onPageSelect(key);
    setOpenMobile(false);
  };

  // Filtrar navegación según el rol del usuario
  const filteredNavItems = NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  ).map((item) => {
    if (item.subitems) {
      return {
        ...item,
        subitems: item.subitems.filter(
          (sub) => !sub.roles || sub.roles.includes(userRole),
        ),
      };
    }
    return item;
  });

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <Sidebar>
      {/* Header con logo y theme toggle */}
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded-full bg-white dark:bg-transparent"
              style={{
                width: "32px",
                height: "32px",
              }}
            >
              <img
                src={logo}
                alt="Callejeritos logo"
                className="h-5 w-5 object-contain"
              />
            </div>
            <div>
              <p
                className="text-sm font-bold leading-tight"
                style={{ color: "var(--sidebar-foreground)" }}
              >
                Callejeritos
              </p>
              <p
                className="text-xs leading-tight"
                style={{ color: "var(--sidebar-accent-foreground)" }}
              >
                Gestión Animal
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </SidebarHeader>

      {/* Navegación */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {filteredNavItems.map((item) => {
              const ItemIcon = item.icon; // Componente de icono para item principal
              return item.subitems ? (
                // Ítem con submenú colapsable
                <Collapsible
                  key={item.title}
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {ItemIcon && <ItemIcon />}
                        <span style={{ color: "var(--sidebar-foreground)" }}>
                          {item.title}
                        </span>
                        <ChevronRight
                          className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                          style={{ color: "var(--sidebar-foreground)" }}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subitems.map((sub) => {
                          const SubIcon = sub.icon; // Asignación a variable en mayúscula para React
                          return (
                            <SidebarMenuSubItem key={sub.key}>
                              <SidebarMenuSubButton
                                isActive={currentPage === sub.key}
                                onClick={() => handleSelectPage(sub.key)}
                              >
                                {/* Se renderiza dinámicamente si el subítem tiene ícono asignado */}
                                {SubIcon && <SubIcon className="h-3 w-3" />}

                                <span
                                  style={{ color: "var(--sidebar-foreground)" }}
                                >
                                  {sub.title}
                                </span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                // Ítem sin submenú
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    isActive={currentPage === item.key}
                    onClick={() => handleSelectPage(item.key)}
                    tooltip={item.title}
                  >
                    {ItemIcon && <ItemIcon />}
                    <span style={{ color: "var(--sidebar-foreground)" }}>
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer con usuario y logout estilizado */}
      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <SidebarMenu className="gap-2">
          {/* Fila del perfil de usuario */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              isActive={currentPage === "perfil"}
              onClick={() => handleSelectPage("perfil")}
              tooltip="Perfil de usuario"
              className="cursor-pointer transition-all duration-200 hover:bg-sidebar-accent"
            >
              <div className="flex items-center gap-3 w-full px-2.5 py-2 rounded-lg">
                <Avatar className="h-9 w-9 rounded-lg border border-sidebar-border shadow-xs">
                  <AvatarImage src={avatarEjemplo} alt={user?.name} />
                  <AvatarFallback className="rounded-lg text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left text-sm leading-tight flex-1 min-w-0">
                  <span
                    className="font-semibold truncate"
                    style={{ color: "var(--sidebar-foreground)" }}
                  >
                    {user?.name || "Usuario"}
                  </span>
                  <span
                    className="text-xs truncate font-medium"
                    style={{ color: "var(--sidebar-accent-foreground)" }}
                  >
                    {user?.roleLabel || user?.role}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Botón Estilizado de Cerrar Sesión */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              tooltip="Cerrar sesión"
              className="group/logout flex items-center justify-center gap-2.5 w-full py-2.5 px-3 rounded-lg border border-red-500/50 dark:border-red-600/40 bg-red-500 dark:bg-red-600 text-white font-medium text-xs shadow-2xs hover:bg-red-600 dark:hover:bg-red-700 hover:border-red-600 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <LogOut className="h-4 w-4 transition-transform duration-200 group-hover/logout:-translate-x-0.5" />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <p
          className="text-[10px] px-2 pt-3 pb-1 text-center font-medium"
          style={{ color: "var(--sidebar-accent-foreground)" }}
        >
          © 2026 Callejeritos · UTN La Plata
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

// ─── Dashboard principal ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // 1. Hook para manejar los parámetros de la URL
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. Lee la página de la URL; si está vacía, usa "verPublicacion" como valor por defecto
  const currentPage = searchParams.get("page") || "verPublicacion";

  // 3. Autocompleta la URL a /dashboard?page=verPublicacion al entrar
  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: "verPublicacion" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // 4. Actualiza la URL e incrementa el historial del navegador
  const handlePageSelect = (pageKey) => {
    setSearchParams({ page: pageKey });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          currentPage={currentPage}
          onPageSelect={handlePageSelect}
          user={user}
          onLogout={handleLogout}
        />
        <div className="flex flex-col flex-1 min-w-0 bg-background">
          <header
            className="sticky top-0 z-50 flex items-center h-12 px-4 border-b border-border md:hidden"
            style={{ backgroundColor: "var(--secondary)" }}
          >
            <SidebarTrigger />
          </header>

          <main className="flex-1">{renderContent(currentPage)}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
