import * as rolModel from '../models/models.roles.js'

// GET /api/roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await rolModel.getAllRoles()
    res.status(200).json(roles)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/roles/:id
export const getRolById = async (req, res) => {
  try {
    const rol = await rolModel.getRolById(req.params.id)

    if (!rol) {
      return res.status(404).json({
        message: 'Rol no encontrado'
      })
    }

    res.status(200).json(rol)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/roles
export const createRol = async (req, res) => {
  try {
    const { idUsuario,idLaboratorio,estado,insumos,horasHombre } = req.body

    if (!idUsuario || !idLaboratorio || !estado || !insumos || !horasHombre) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      })
    }

    const nuevoRol = await rolModel.createRol({ rol })
    res.status(201).json(nuevoRol)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export const updateRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { rol } = req.body;

        if (!rol) {
            return res.status(400).json({ message: 'El nombre del rol es obligatorio' });
        }

        const result = await rolModel.updateRolModel(id, { rol });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.json({ message: 'Rol actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar rol: ' + error.message });
    }
};

export const deleteRol = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await rolModel.deleteRolModel(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.json({ message: 'Rol eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar rol: ' + error.message });
    }
};