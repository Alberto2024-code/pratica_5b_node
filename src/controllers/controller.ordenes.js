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
    const { idUsuario, idLaboratorio, estado, insumos,fechaCreacion, horasHombre } = req.body

    // Validaciones mínimas
    if (!idUsuario || !idLaboratorio || !fechaCreacion) {
      return res.status(400).json({
        message: 'idUsuario e idLaboratorio son obligatorios'
      })
    }

    const nuevaOrden = await ordenModel.createOrden({
      idUsuario,
      idLaboratorio,
      estado,
      insumos,
      fechaCreacion,
      horasHombre
    })

    res.status(201).json(nuevaOrden)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export const updateOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const result = await ordenModel.updateOrdenModel(id, datos);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json({ message: 'Orden actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la orden: ' + error.message });
    }
};
export const updateInsumos = async(req,res)=>
  {
    try
    {
      const {id}= req.params;
      const datos = req.body;

      const result = await ordenModel.updateInsumos(id,datos);

      if(result.affectedRows ==0)
        {
          return res.status(404).json({message:'orden no encontrada'})
        }
        res.json({message:'orden actualizada correctamente'})
    }catch(error)
    {
      res.status(500).json({error:'error al actualizar la orden'+ error.message});
    }
  }

export const deleteOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ordenModel.deleteOrdenModel(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la orden: ' + error.message });
    }
};