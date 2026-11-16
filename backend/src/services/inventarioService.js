const prisma = require("../../lib/prisma");

class InventarioService {
  // Obtener todos los insumos
  async obtenerTodos() {
    try {
      const insumos = await prisma.insumo.findMany({
        include: {
          alimento: {
            include: {
              especieanimal: true,
            },
          },
          medicamento: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return insumos;
    } catch (error) {
      throw new Error(`Error al obtener insumos: ${error.message}`);
    }
  }

  // Obtener insumo por ID
  async obtenerPorId(id) {
    try {
      const insumo = await prisma.insumo.findUnique({
        where: { idinsumo: parseInt(id) },
        include: {
          alimento: {
            include: {
              especieanimal: true,
            },
          },
          medicamento: true,
        },
      });
      if (!insumo) {
        throw new Error("Insumo no encontrado");
      }
      return insumo;
    } catch (error) {
      throw new Error(`Error al obtener insumo: ${error.message}`);
    }
  }

  // Crear nuevo insumo
  async crear(datos) {
    try {
      const { tipo, ...resto } = datos;

      const nuevoInsumo = await prisma.insumo.create({
        data: {
          nombre: resto.nombre,
          descripcion: resto.descripcion,
          stock: parseInt(resto.stock),
          fechavencimiento: resto.fechaVencimiento
            ? new Date(resto.fechaVencimiento)
            : null,
          ...resto,
        },
      });

      // Si es medicamento, crear el registro correspondiente
      if (tipo === "medicamento" && resto.numerolote) {
        await prisma.medicamento.create({
          data: {
            idinsumo: nuevoInsumo.idinsumo,
            numerolote: resto.numerolote,
            concentracion: resto.concentracion,
            viaadministracion: resto.viaadministracion,
          },
        });
      }

      // Si es alimento, crear el registro correspondiente
      if (tipo === "alimento" && resto.idespecie) {
        await prisma.alimento.create({
          data: {
            idinsumo: nuevoInsumo.idinsumo,
            idespecie: parseInt(resto.idespecie),
            marca: resto.marca,
            tipoalimento: resto.tipoalimento,
            peso: resto.peso ? parseInt(resto.peso) : null,
          },
        });
      }

      return this.obtenerPorId(nuevoInsumo.idinsumo);
    } catch (error) {
      throw new Error(`Error al crear insumo: ${error.message}`);
    }
  }

  // Actualizar insumo
  async actualizar(id, datos) {
    try {
      const insumoExistente = await prisma.insumo.findUnique({
        where: { idinsumo: parseInt(id) },
      });

      if (!insumoExistente) {
        throw new Error("Insumo no encontrado");
      }

      const insumoActualizado = await prisma.insumo.update({
        where: { idinsumo: parseInt(id) },
        data: {
          ...(datos.nombre && { nombre: datos.nombre }),
          ...(datos.descripcion && { descripcion: datos.descripcion }),
          ...(datos.stock !== undefined && { stock: parseInt(datos.stock) }),
          ...(datos.fechaVencimiento !== undefined && {
            fechavencimiento: datos.fechaVencimiento
              ? new Date(datos.fechaVencimiento)
              : null,
          }),
        },
      });

      return this.obtenerPorId(id);
    } catch (error) {
      throw new Error(`Error al actualizar insumo: ${error.message}`);
    }
  }

  // Eliminar insumo
  async eliminar(id) {
    try {
      const insumoExistente = await prisma.insumo.findUnique({
        where: { idinsumo: parseInt(id) },
      });

      if (!insumoExistente) {
        throw new Error("Insumo no encontrado");
      }

      await prisma.insumo.delete({
        where: { idinsumo: parseInt(id) },
      });

      return { mensaje: "Insumo eliminado correctamente" };
    } catch (error) {
      throw new Error(`Error al eliminar insumo: ${error.message}`);
    }
  }

  // Registrar movimiento de inventario
  async registrarMovimiento(datos) {
    try {
      const { idinsumo, idpersona, tipo, cantidad, motivo } = datos;

      // Obtener insumo actual
      const insumo = await prisma.insumo.findUnique({
        where: { idinsumo: parseInt(idinsumo) },
      });

      if (!insumo) {
        throw new Error("Insumo no encontrado");
      }

      // Validar stock para salidas
      if (tipo === "SALIDA" && cantidad > insumo.stock) {
        throw new Error("La cantidad no puede superar el stock actual");
      }

      // Crear movimiento
      const movimiento = await prisma.movimientoinventario.create({
        data: {
          idinsumo: parseInt(idinsumo),
          idpersona: parseInt(idpersona),
          tipo,
          cantidad: parseInt(cantidad),
          fecha: new Date(),
          motivo,
        },
      });

      // Actualizar stock del insumo
      const nuevoStock =
        tipo === "ENTRADA"
          ? insumo.stock + parseInt(cantidad)
          : insumo.stock - parseInt(cantidad);

      await prisma.insumo.update({
        where: { idinsumo: parseInt(idinsumo) },
        data: { stock: nuevoStock },
      });

      return movimiento;
    } catch (error) {
      throw new Error(`Error al registrar movimiento: ${error.message}`);
    }
  }

  // Obtener movimientos de un insumo
  async obtenerMovimientos(idinsumo) {
    try {
      const movimientos = await prisma.movimientoinventario.findMany({
        where: { idinsumo: parseInt(idinsumo) },
        include: {
          usuario: {
            select: {
              idpersona: true,
              nombrecompleto: true,
            },
          },
        },
        orderBy: {
          fecha: "desc",
        },
      });
      return movimientos;
    } catch (error) {
      throw new Error(`Error al obtener movimientos: ${error.message}`);
    }
  }

  // Obtener estadísticas de inventario
  async obtenerEstadisticas() {
    try {
      const total = await prisma.insumo.count();
      const stockBajo = await prisma.insumo.count({
        where: {
          stock: {
            lt: 5,
          },
        },
      });

      const fechaHoy = new Date();
      const fecha60Dias = new Date();
      fecha60Dias.setDate(fecha60Dias.getDate() + 60);

      const porVencer = await prisma.insumo.count({
        where: {
          fechavencimiento: {
            not: null,
            lte: fecha60Dias,
          },
        },
      });

      return {
        total,
        stockBajo,
        porVencer,
      };
    } catch (error) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }
}

module.exports = new InventarioService();
