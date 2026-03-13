import * as tipoDispositivoModel from '../models/models.tipo_dispositivo.js'

// GET /api/tipodispositivos
export const getAllTipoDispositivos = async (req, res) => {
  try {
    const tipos = await tipoDispositivoModel.getAllTipoDispositivos()
    res.status(200).json(tipos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/tipodispositivos/:id
export const getTipoDispositivoById = async (req, res) => {
  try {
    const tipo = await tipoDispositivoModel.getTipoDispositivoById(req.params.id)

    if (!tipo) {
      return res.status(404).json({
        message: 'Tipo de dispositivo no encontrado'
      })
    }

    res.status(200).json(tipo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/tipodispositivos
export const createTipoDispositivo = async (req, res) => {
  try {
    const { tipoDispositivo } = req.body

    if (!tipoDispositivo) {
      return res.status(400).json({
        message: 'El tipoDispositivo es obligatorio'
      })
    }

    const nuevoTipo = await tipoDispositivoModel.createTipoDispositivo({
      tipoDispositivo
    })

    res.status(201).json(nuevoTipo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export const updateTipoDispositivoModel = async(req,res)=>
  {
    try
    {
      const{id}= req.params;
      const result = await updateTipoDispositivoModel(id,req.body);
      res.status(500).json({message:'Tipo dispositivo actualizado'})
    }
    catch(error)
    {
      res.status(500).json({error:'Error al actualizarlo  el Tipo dispositivo'})
    }
  }
  //function que permite elimiminar al tipo dispositivo
  export const deleteTipoDipositivoModel = async(req,res)=>
    {
      try
      {
        const{id} = req.params;
        const result = await tipoDispositivoModel(id);
        res.json({message:'Tipo dispositivo eliminado'})
      }
      catch(error)
      {
        res.status(500).json({error:'error al eliminar'})
      }
    }