import * as ordenDispositivoModel from '../models/models.orden_dispositivo.js'

// GET /api/orden-dispositivos
export const getAllOrdenDispositivos = async (req, res) => {
  try {
    const ordenes = await ordenDispositivoModel.getAllOrdenDispositivo()
    res.status(200).json(ordenes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/orden-dispositivos/:id
export const getOrdenDispositivoById = async (req, res) => {
  try {
    const orden = await ordenDispositivoModel.getOrdenDispositivoById(req.params.id)

    if (!orden) {
      return res.status(404).json({
        message: 'Orden dispositivo no encontrada'
      })
    }

    res.status(200).json(orden)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/orden-dispositivos
export const createOrdenDispositivo = async (req, res) => {
  try {
    const { idOrden, idDispositivo, idTipoMantenimiento, realizado } = req.body

    // Validaciones básicas
    if (!idOrden || !idDispositivo || !idTipoMantenimiento) {
      return res.status(400).json({
        message: 'idOrden, idDispositivo e idTipoMantenimiento son obligatorios'
      })
    }

    const nuevaOrden = await ordenDispositivoModel.createOrdenDispositivo({
      idOrden,
      idDispositivo,
      idTipoMantenimiento,
      realizado
    })

    res.status(201).json(nuevaOrden)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export const updateOrdenDispositivo = async (req, res) => {
    try {
        const { id } = req.params; // Este sería el idDispositivo según tu modelo
        const datos = req.body;

        const result = await ordenDispModel.updateOrdenDispositivoModel(id, datos);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro de orden-dispositivo no encontrado' });
        }

        res.json({ message: 'Orden de dispositivo actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar: ' + error.message });
    }
};

export const deleteOrdenDispositivo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ordenDispModel.deleteOrdenDispositivoModel(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.json({ message: 'Registro eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar: ' + error.message });
    }
};