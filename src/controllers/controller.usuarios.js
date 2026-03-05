import * as usuarioModel from '../models/models.usuarios.js'

// GET /api/laboratorios
export const getAllUsuarios = async (req, res) => {
  try {
    const usuario = await usuarioModel.getAllUsuarios()
    res.status(200).json(usuario)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/laboratorios/:id
export const getUsuariosById = async (req, res) => {
  try {
    const Usuario = await usuarioModel.getUsuariosById(req.params.id)

    if (!Usuario) {
      return res.status(404).json({
        message: 'usuario no encontrado'
      })
    }

    res.status(200).json(lab)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/laboratorios
export const createUsuario = async (req, res) => {
  try {
    const { usuario } = req.body

    if (! idUsuario || 
        !nombreUsuario || !apellidoPaterno || !apellidomaterno || !matricula || !contrasena    || !estado || !telefono) {
      return res.status(400).json({
        message: 'usuario es obligatorio es obligatorio'
      })
    }

    const nuevo = await usuarioModel.createUsuario({ usuario })
    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}