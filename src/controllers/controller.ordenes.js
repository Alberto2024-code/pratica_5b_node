import * as ordenModel from '../models/models.ordenes.js'

// GET /api/ordenes
export const getAllOrdenes = async (req, res) => {
  try {
    const ordenes = await ordenModel.getAllOrdenes()
    res.status(200).json(ordenes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/ordenes/:id
export const getOrdenById = async (req, res) => {
  try {
    const orden = await ordenModel.getOrdenById(req.params.id)

    if (!orden) {
      return res.status(404).json({
        message: 'Orden no encontrada'
      })
    }

    res.status(200).json(orden)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/ordenes
export const createOrden = async (req, res) => {
  try {
    const { idUsuario, idLaboratorio, estado, insumos, horasHombre } = req.body

    // Validaciones mínimas
    if (!idUsuario || !idLaboratorio) {
      return res.status(400).json({
        message: 'idUsuario e idLaboratorio son obligatorios'
      })
    }

    const nuevaOrden = await ordenModel.createOrden({
      idUsuario,
      idLaboratorio,
      estado,
      insumos,
      horasHombre
    })

    res.status(201).json(nuevaOrden)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}