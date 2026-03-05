import *  as dispositivosModel from '../models/models.dispositivos.js'
// GET /API/DISPOSIVOS
export const getAllDispositivos = async(req,res)=>{
    try
    {
        const dispositivos = await dispositivosModel.getAllDispositivos()
        res.status(200).json(dispositivos)
    }catch (error){
        res.status(500).json({error:error.message})
    }

}
//GET del modelo
export const getDispositivosById= async (req,res)=>{
    try
    {
        const dispositivos = await dispositivosModel.getDispositivos(req.params.id)
        if(!dispositivos)
            {
                return res.status(404).json({
                    message:'Dispositivo no encontrado'
                })
            }
            res.status(200).json(dispositivos)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const createDispositivo = async(req,res)=>{
    try{
        const{idDispositivo,idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario}=req.body

        if(!idDispositivo || !idLaboratorio || !idModelo || !idTipoDispositivo || !nombreDispositivo || !numeroInventario)
            {
                return res.status(400).json({
                    message:'id dispositivos y nombre del dispositivo son obligatorias'
                })
            }
            const nuevoDispositivo = await dispositivosModel.createDispositivo({
                idDispositivo,idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario
            })
            res.status(201).json(nuevoDispositivo)
    }catch(error)
    {
        res.status(500).json({error: error.message})
    }
}