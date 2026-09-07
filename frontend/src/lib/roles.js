// Roles del sistema. La clave (value) es lo que viaja en el token/JWT
// y se guarda en el usuario; el label es lo que se muestra en pantalla.

export const ROLES = {
  ADMIN: "administrador",
  NUCLEO_OPERATIVO: "nucleo_operativo",
  TRANSITANTE: "transitante",
  ADOPTANTE: "adoptante",
  SOCIO: "socio",
  PUBLICO: "usuario_publico",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Administrador",
  [ROLES.NUCLEO_OPERATIVO]: "Núcleo operativo",
  [ROLES.TRANSITANTE]: "Transitante",
  [ROLES.ADOPTANTE]: "Adoptante",
  [ROLES.SOCIO]: "Socio",
  [ROLES.PUBLICO]: "Usuario público",
};

// Grupos útiles para no repetir arrays largos en cada ruta.
// Ajustá según cómo manejen permisos internamente.
export const STAFF_ROLES = [ROLES.ADMIN, ROLES.NUCLEO_OPERATIVO];
export const COMMUNITY_ROLES = [
  ROLES.TRANSITANTE,
  ROLES.ADOPTANTE,
  ROLES.SOCIO,
];
export const ALL_AUTHENTICATED_ROLES = [
  ROLES.ADMIN,
  ROLES.NUCLEO_OPERATIVO,
  ROLES.TRANSITANTE,
  ROLES.ADOPTANTE,
  ROLES.SOCIO,
];

// Roles que un usuario puede elegir por sí mismo al registrarse.
// Administrador y Núcleo operativo quedan afuera a propósito: esos se
// asignan desde adentro del sistema, no por auto-registro público.
export const SELF_REGISTER_ROLES = [
  ROLES.TRANSITANTE,
  ROLES.ADOPTANTE,
  ROLES.SOCIO,
  ROLES.PUBLICO,
];