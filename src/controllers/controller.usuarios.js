import * as usuarioModel from '../models/models.usuarios.js'
import bcrypt from 'bcrypt'

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

    res.status(200).json(Usuario)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/laboratorios
export const createUsuario = async (req, res) => {
 
  try {
        const { idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, contrasena, estado, telefono } = req.body

        // Validación básica
        if (!nombreUsuario || !matricula || !contrasena || !idRol) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' })
        }

        // 1. ENCRIPTAR CONTRASEÑA
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(contrasena, salt)

        // 2. GUARDAR EN BD
        const nuevo = await usuarioModel.createUsuario({
            idRol,
            nombreUsuario,
            apellidoPaterno,
            apellidoMaterno,
            matricula,
            contrasena: passwordHash, // Guardamos la encriptada
            estado,
            telefono
        })

        res.status(201).json(nuevo)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
 
}
// si
export const updateUsuarioModel = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usuarioModel.updateUsuarioModel(id, req.body);
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
};

export const deleteUsuarioModel = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usuarioModel.deleteUsuarioModel(id);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
};