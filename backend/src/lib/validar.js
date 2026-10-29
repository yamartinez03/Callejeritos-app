const AppError = require('./AppError');

const EXTENSIONES_ARCHIVO = ['.pdf', '.csv', '.png', '.jpg', '.jpeg'];
const MAX_INT = 2147483647; // límite del tipo Int de PostgreSQL
const REGEX_FECHA = /^\d{4}-\d{2}-\d{2}(T[\d:.]+(Z|[+-]\d{2}:?\d{2})?)?$/;

const estaVacio = (v) =>
  v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

// Valida un valor según su regla. Devuelve { valor } o { error }.
function validarCampo(valor, regla) {
  switch (regla.tipo) {
    case 'id':
      if (!Number.isInteger(valor) || valor <= 0 || valor > MAX_INT) {
        return { error: 'Debe ser un número entero positivo' };
      }
      return { valor };

    case 'int': {
      const min = regla.min ?? 0;
      if (!Number.isInteger(valor) || valor < min || valor > MAX_INT) {
        return { error: `Debe ser un número entero mayor o igual a ${min}` };
      }
      return { valor };
    }

    case 'float':
      if (typeof valor !== 'number' || !Number.isFinite(valor) || valor <= 0) {
        return { error: 'Debe ser un número mayor a 0' };
      }
      return { valor };

    case 'bool':
      if (typeof valor !== 'boolean') return { error: 'Debe ser true o false' };
      return { valor };

    case 'string': {
      if (typeof valor !== 'string') return { error: 'Debe ser un texto' };
      const texto = valor.trim();
      if (regla.max && texto.length > regla.max) {
        return { error: `No puede superar los ${regla.max} caracteres` };
      }
      return { valor: texto };
    }

    case 'enum': {
      const texto = typeof valor === 'string' ? valor.trim().toUpperCase() : valor;
      if (!regla.valores.includes(texto)) {
        return { error: `Valores permitidos: ${regla.valores.join(', ')}` };
      }
      return { valor: texto };
    }

    case 'fecha': {
      const ok =
        typeof valor === 'string' && REGEX_FECHA.test(valor) && !Number.isNaN(Date.parse(valor));
      if (!ok) return { error: 'Formato de fecha inválido (usar AAAA-MM-DD)' };
      return { valor: new Date(valor) };
    }

    case 'archivo': {
      if (typeof valor !== 'string' || valor.trim().length > 255) {
        return { error: 'Debe ser una ruta de hasta 255 caracteres' };
      }
      const ruta = valor.trim();
      if (!EXTENSIONES_ARCHIVO.some((ext) => ruta.toLowerCase().endsWith(ext))) {
        return { error: `Formato no permitido (${EXTENSIONES_ARCHIVO.join(', ')})` };
      }
      return { valor: ruta };
    }

    default:
      return { valor };
  }
}

/**
 * Valida un objeto contra un esquema { campo: { tipo, opcional, ... } }.
 * - Campos obligatorios ausentes o vacíos: "Campo obligatorio".
 * - Campos con formato incorrecto: mensaje con el formato esperado.
 * - parcial = true: solo se validan los campos que vinieron (para modificaciones).
 * Devuelve un objeto limpio, solo con los campos del esquema.
 */
function validar(datos, esquema, { parcial = false } = {}) {
  const origen = datos && typeof datos === 'object' && !Array.isArray(datos) ? datos : {};
  const limpio = {};
  const campos = {};

  for (const [campo, regla] of Object.entries(esquema)) {
    const valor = origen[campo];

    if (estaVacio(valor)) {
      if (valor === undefined && (parcial || regla.opcional)) continue;
      if (regla.opcional) continue; // null / '' en un opcional se ignora
      campos[campo] = 'Campo obligatorio';
      continue;
    }

    const resultado = validarCampo(valor, regla);
    if (resultado.error) campos[campo] = resultado.error;
    else limpio[campo] = resultado.valor;
  }

  if (Object.keys(campos).length > 0) {
    throw new AppError(400, 'Datos incompletos o no válidos', { campos });
  }
  return limpio;
}

// Valida ids que vienen por URL (/animales/:id)
function parseId(valor, nombre = 'id') {
  const n = Number(valor);
  if (!Number.isInteger(n) || n <= 0 || n > MAX_INT) {
    throw new AppError(400, `El ${nombre} debe ser un número entero positivo`);
  }
  return n;
}

module.exports = { validar, parseId };
