// Envuelve un controller async para que cualquier error llegue al middleware de errores.
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
