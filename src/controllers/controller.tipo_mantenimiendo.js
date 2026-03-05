import * as tipo_matenimientoModel from '../models/models.tipo_mantenimiento.js'

export const getAllTipoMantenimiento = async (req,res)=>{
    try{
        const tipoMantenimiento = await tipo_matenimientoModel.getAllTipoMantenimiento()
        res.status(200).json(tipoMantenimiento)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}
export const getTipoMantenimientoById = async(req,res)=>{
    try
    {
        const Tipomantenimiento = await tipo_matenimientoModel.getTipoMantenimientoById(res.params.id)

        if(!lab)
            {
                return res.status(404).json({
                    message: 'tipo mantenimiento no encontrado'
                })
            }
            res.status(200).json(Tipomantenimiento)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const createTipoMantenimiento = async (req, res) => {
  try {
    const {idTipoMantenimiento,tipoMantenimiento } = req.body

    // Validaciones básicas
    if (!idTipoMantenimiento || !tipoMantenimiento) {
      return res.status(400).json({
        message: 'tipoMantenimiento  son obligatorios'
      })
    }

    const nuevoTipoMantenimiento = await tipo_matenimientoModel.createTipoMantenimiento({
      idTipoMantenimiento,
      tipoMantenimiento
    })

    res.status(201).json(nuevoTipoMantenimiento)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}