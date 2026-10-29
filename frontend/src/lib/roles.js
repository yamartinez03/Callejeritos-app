// Roles del sistema.
// La clave (value) es lo que viaja en el token/JWT
// y se guarda en el usuario.
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

// Roles internos / administrativos
export const STAFF_ROLES = [
  ROLES.ADMIN,
  ROLES.NUCLEO_OPERATIVO,
];

// Roles de la comunidad
export const COMMUNITY_ROLES = [
  ROLES.TRANSITANTE,
  ROLES.ADOPTANTE,
  ROLES.SOCIO,
];

// Todos los roles que requieren autenticación
export const ALL_AUTHENTICATED_ROLES = [
  ROLES.ADMIN,
  ROLES.NUCLEO_OPERATIVO,
  ROLES.TRANSITANTE,
  ROLES.ADOPTANTE,
  ROLES.SOCIO,
];