import * as marcaModel from '../models/models.marcas.js'

// GET /api/modelos
export const getAllMarca = async (req, res) => {
  try {
    const marca = await marcaModel.getAllMarcas()
    res.status(200).json(marca)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/modelos/:id
export const getMarcasById = async (req, res) => {
  try {
    const marca = await marcaModel.getMarcasById(req.params.id)

    if (!marca) {
      return res.status(404).json({
        message: 'marca no encontrado'
      })
    }

    res.status(200).json(marca)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/modelos
export const createMarca = async (req, res) => {
  try {
    const { idMarca, nombreMarca } = req.body

    // Validaciones básicas
    if (!idMarca || !nombreMarca) {
      return res.status(400).json({
        message: 'idMarca y nombreMarca son obligatorios'
      })
    }

    const nuevoMarca = await marcaModel.createMarca({
      idMarca,
      nombreMarca
    })

    res.status(201).json(nuevoMarca)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}