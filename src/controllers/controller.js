import * as modeloModel from '../models/models.js'

// GET /api/modelos
export const getAllModelos = async (req, res) => {
  try {
    const modelos = await modeloModel.getAllModelos()
    res.status(200).json(modelos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/modelos/:id
export const getModeloById = async (req, res) => {
  try {
    const modelo = await modeloModel.getModeloById(req.params.id)

    if (!modelo) {
      return res.status(404).json({
        message: 'Modelo no encontrado'
      })
    }

    res.status(200).json(modelo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/modelos
export const createModelo = async (req, res) => {
  try {
    const { idMarca, nombreModelo } = req.body

    // Validaciones básicas
    if (!idMarca || !nombreModelo) {
      return res.status(400).json({
        message: 'idMarca y nombreModelo son obligatorios'
      })
    }

    const nuevoModelo = await modeloModel.createModelo({
      idMarca,
      nombreModelo
    })

    res.status(201).json(nuevoModelo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
// Actualizar usuario
export const updateModeloModel = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        
        // Llamamos al modelo que me pasaste
        const result = await modeloModel.updateModeloModel(id, datos);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado para actualizar' });
        }

        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario: ' + error.message });
    }
};

// Eliminar usuario
export const deleteModeloModel = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Llamamos al modelo que me pasaste
        const result = await usuarioModel.deleteModeloModel(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
        }

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario: ' + error.message });
    }
};