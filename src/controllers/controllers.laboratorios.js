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
export const updateLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreLaboratorio } = req.body;

        if (!nombreLaboratorio) {
            return res.status(400).json({ message: 'El nombre del laboratorio es requerido' });
        }

        const result = await labModel.updateLaboratorioModel(id, { nombreLaboratorio });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Laboratorio no encontrado' });
        }

        res.json({ message: 'Laboratorio actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar: ' + error.message });
    }
};

export const deleteLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await labModel.deleteLaboratorioModel(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Laboratorio no encontrado' });
        }

        res.json({ message: 'Laboratorio eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar: ' + error.message });
    }
};