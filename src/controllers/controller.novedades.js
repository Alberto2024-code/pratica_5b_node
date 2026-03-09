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
export const updateNovedad = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        if (!datos.tituloNovedad) {
            return res.status(400).json({ message: 'El título de la novedad es obligatorio' });
        }

        const result = await novedadModel.updateNovedadModel(id, datos);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Novedad no encontrada' });
        }

        res.json({ message: 'Novedad actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar novedad: ' + error.message });
    }
};

export const deleteNovedad = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await novedadModel.deleteNovedadModel(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Novedad no encontrada' });
        }

        res.json({ message: 'Novedad eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar novedad: ' + error.message });
    }
};