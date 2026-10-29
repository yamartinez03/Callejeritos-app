// Error controlado de la aplicación: lleva el código HTTP y datos extra
// (por ejemplo, qué campos fallaron) para que el middleware de errores responda.
class AppError extends Error {
  constructor(status, message, extra = {}) {
    super(message);
    this.status = status;
    this.extra = extra;
  }
}

module.exports = AppError;
