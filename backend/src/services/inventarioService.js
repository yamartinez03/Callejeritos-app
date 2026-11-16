const prisma = require("../../lib/prisma");

// Error con código HTTP para que el controller responda bien (404, 400...)
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Umbrales fijos (coinciden con las tarjetas del front)
const STOCK_BAJO_MENOR_A = 5;
const DIAS_POR_VENCER = 60;

// El front manda minúsculas ("seco", "entrada"); los enums del schema van en mayúsculas
const mayus = (valor) => (valor ? String(valor).trim().toUpperCase() : valor);

// Relaciones que se incluyen siempre al devolver un insumo
const INCLUDE_INSUMO = {
  alimento: { include: { especieanimal: true } },
  medicamento: true,
};

class InventarioService {
  // Listar insumos activos (filtro opcional por tipo: medicamento | alimento | insumo)
  async obtenerTodos({ tipo } = {}) {
    const where = { activo: true };

    if (tipo === "medicamento") where.medicamento = { isNot: null };
    if (tipo === "alimento") where.alimento = { isNot: null };
    if (tipo === "insumo") {
      where.medicamento = { is: null };
      where.alimento = { is: null };
    }

    return prisma.insumo.findMany({
      where,
      include: INCLUDE_INSUMO,
      orderBy: { nombre: "asc" },
    });
  }

  async obtenerPorId(id) {
    const insumo = await prisma.insumo.findUnique({
      where: { idinsumo: Number(id) },
      include: INCLUDE_INSUMO,
    });
    if (!insumo) throw new HttpError(404, "Insumo no encontrado");
    return insumo;
  }

  // Crear insumo (+ medicamento o alimento) en una sola operación atómica
  async crear(datos) {
    const tipo = datos.tipo;

    if (!datos.nombre || datos.stock === undefined || datos.stock === "") {
      throw new HttpError(400, "Nombre y stock son obligatorios");
    }
    if (Number(datos.stock) < 0) {
      throw new HttpError(400, "El stock no puede ser negativo");
    }

    const data = {
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion || null,
      stock: Number(datos.stock),
      fechavencimiento: datos.fechaVencimiento
        ? new Date(datos.fechaVencimiento)
        : null,
    };

    if (tipo === "medicamento") {
      if (!datos.concentracion || !datos.viaadministracion) {
        throw new HttpError(400, "Faltan datos del medicamento");
      }
      data.medicamento = {
        create: {
          numerolote: datos.numerolote || null,
          concentracion: datos.concentracion,
          viaadministracion: mayus(datos.viaadministracion),
        },
      };
    }

    if (tipo === "alimento") {
      if (!datos.idespecie || !datos.tipoalimento || !datos.peso) {
        throw new HttpError(400, "Faltan datos del alimento");
      }
      data.alimento = {
        create: {
          idespecie: Number(datos.idespecie),
          marca: datos.marca || null,
          tipoalimento: mayus(datos.tipoalimento),
          peso: Number(datos.peso),
        },
      };
    }

    const nuevo = await prisma.insumo.create({
      data,
      include: INCLUDE_INSUMO,
    });
    return nuevo;
  }

  // Actualizar datos del insumo (NO el stock: el stock se mueve solo con movimientos)
  async actualizar(id, datos) {
    const existente = await this.obtenerPorId(id);

    const data = {};
    if (datos.nombre) data.nombre = datos.nombre.trim();
    if (datos.descripcion !== undefined)
      data.descripcion = datos.descripcion || null;
    if (datos.fechaVencimiento !== undefined) {
      data.fechavencimiento = datos.fechaVencimiento
        ? new Date(datos.fechaVencimiento)
        : null;
    }

    if (existente.medicamento) {
      const med = {};
      if (datos.numerolote !== undefined)
        med.numerolote = datos.numerolote || null;
      if (datos.concentracion) med.concentracion = datos.concentracion;
      if (datos.viaadministracion)
        med.viaadministracion = mayus(datos.viaadministracion);
      if (Object.keys(med).length) data.medicamento = { update: med };
    }

    if (existente.alimento) {
      const ali = {};
      if (datos.marca !== undefined) ali.marca = datos.marca || null;
      if (datos.tipoalimento) ali.tipoalimento = mayus(datos.tipoalimento);
      if (datos.peso) ali.peso = Number(datos.peso);
      if (datos.idespecie) ali.idespecie = Number(datos.idespecie);
      if (Object.keys(ali).length) data.alimento = { update: ali };
    }

    return prisma.insumo.update({
      where: { idinsumo: Number(id) },
      data,
      include: INCLUDE_INSUMO,
    });
  }

  // Baja lógica (CU-IN07): el insumo queda inactivo y se conserva el historial
  async eliminar(id) {
    await this.obtenerPorId(id);
    await prisma.insumo.update({
      where: { idinsumo: Number(id) },
      data: { activo: false },
    });
    return { mensaje: "Insumo dado de baja correctamente" };
  }

  // Registrar entrada/salida. idpersona sale del usuario logueado, no del body.
  async registrarMovimiento({ idinsumo, idpersona, tipo, cantidad, motivo }) {
    const tipoMov = mayus(tipo);
    const cant = Number(cantidad);

    if (!["ENTRADA", "SALIDA"].includes(tipoMov)) {
      throw new HttpError(400, "El tipo debe ser ENTRADA o SALIDA");
    }
    if (!Number.isInteger(cant) || cant <= 0) {
      throw new HttpError(400, "La cantidad debe ser un entero mayor a cero");
    }
    if (!motivo || !motivo.trim()) {
      throw new HttpError(400, "El motivo es obligatorio");
    }

    // La validación y la escritura van dentro de la misma transacción:
    // evita que dos salidas simultáneas dejen el stock en negativo.
    return prisma.$transaction(async (tx) => {
      const insumo = await tx.insumo.findUnique({
        where: { idinsumo: Number(idinsumo) },
      });
      if (!insumo || !insumo.activo) {
        throw new HttpError(404, "Insumo no encontrado");
      }
      if (tipoMov === "SALIDA" && cant > insumo.stock) {
        throw new HttpError(
          400,
          `Stock insuficiente. Stock actual: ${insumo.stock}`,
        );
      }

      const movimiento = await tx.movimientoInventario.create({
        data: {
          idinsumo: insumo.idinsumo,
          idpersona: Number(idpersona),
          tipo: tipoMov,
          cantidad: cant,
          fecha: new Date(),
          motivo: motivo.trim(),
        },
      });

      await tx.insumo.update({
        where: { idinsumo: insumo.idinsumo },
        data: {
          stock:
            tipoMov === "ENTRADA" ? { increment: cant } : { decrement: cant },
        },
      });

      return movimiento;
    });
  }

  async obtenerMovimientos(idinsumo) {
    await this.obtenerPorId(idinsumo);
    return prisma.movimientoInventario.findMany({
      where: { idinsumo: Number(idinsumo) },
      include: {
        usuario: { select: { idpersona: true, nombrecompleto: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async obtenerEstadisticas() {
    const limite = new Date();
    limite.setDate(limite.getDate() + DIAS_POR_VENCER);

    const [total, stockBajo, porVencer] = await Promise.all([
      prisma.insumo.count({ where: { activo: true } }),
      prisma.insumo.count({
        where: { activo: true, stock: { lt: STOCK_BAJO_MENOR_A } },
      }),
      prisma.insumo.count({
        where: {
          activo: true,
          fechavencimiento: { not: null, gte: new Date(), lte: limite },
        },
      }),
    ]);

    return { total, stockBajo, porVencer };
  }
}

module.exports = new InventarioService();
module.exports.HttpError = HttpError;
