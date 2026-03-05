import * as novedadesModel from '../models/models.novedades.js'

// GET /api/
export const getAllNovedades = async (req, res) => {
  try {
    const novedade = await novedadesModel.getAllNovedades()
    res.status(200).json(novedade)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/
export const getNovedadesById = async (req, res) => {
  try {
    const novedad = await novedadesModel.getNovedadesById(req.params.id)

    if (!novedad) {
      return res.status(404).json({
        message: 'novedad no encontrado'
      })
    }

    res.status(200).json(marca)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/
export const createNovedad = async (req, res) => {
  try {
    const {  idNovedad,
    tituloNovedad,
    encabezado,
    informacion,
    nombreImagen,
    Imagen } = req.body

    // Validaciones básicas
    if ( !idNovedad || !tituloNovedad || !encabezado ||  !informacion || !nombreImagen || !Imagen) {
      return res.status(400).json({
        message: 'idNovedad y nombreNovedad son obligatorios'
      })
    }

    const nuevoNovedad = await novedadesModel.createNovedad({
    idNovedad,
    tituloNovedad,
    encabezado,
    informacion,
    nombreImagen,
    Imagen
    })

    res.status(201).json(nuevoNovedad)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}