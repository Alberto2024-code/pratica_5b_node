import * as laboratorioModel from '../models/models.laboratorios.js'

// GET /api/laboratorios
export const getAllLaboratorios = async (req, res) => {
  try {
    const labs = await laboratorioModel.getAllLaboratorios()
    res.status(200).json(labs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/laboratorios/:id
export const getLaboratorioById = async (req, res) => {
  try {
    const lab = await laboratorioModel.getLaboratorioById(req.params.id)

    if (!lab) {
      return res.status(404).json({
        message: 'Laboratorio no encontrado'
      })
    }

    res.status(200).json(lab)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/laboratorios
export const createLaboratorio = async (req, res) => {
  try {
    const { nombreLaboratorio } = req.body

    if (!nombreLaboratorio) {
      return res.status(400).json({
        message: 'nombreLaboratorio es obligatorio'
      })
    }

    const nuevo = await laboratorioModel.createLaboratorio({ nombreLaboratorio })
    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}