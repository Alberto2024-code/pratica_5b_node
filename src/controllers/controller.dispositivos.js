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
        const dispositivos = await dispositivosModel.getDispositivosById(req.params.id)
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
        const{idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario}=req.body

        if(!idLaboratorio || !idModelo || !idTipoDispositivo || !nombreDispositivo || !numeroInventario)
            {
                return res.status(400).json({
                    message:'id dispositivos y nombre del dispositivo son obligatorias'
                })
            }
            const nuevoDispositivo = await dispositivosModel.createDispositivo({
                idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario
            })
            res.status(201).json(nuevoDispositivo)
    }catch(error)
    {
        res.status(500).json({error: error.message})
    }
}
// funcion que permite actualizar el dispositivo
export const updateDispositivosModel = async(req,res)=>{
    try
    {
      const { id }= req.params;
      const result = await dispositivosModel.updateDispositivosModel(id,req.body);
      res.json({message:'dispositivo actualizado'});
    }
    catch(error)
    {
        res.status(500).json({error:'Error al actualizar'})
    }
}
//function que permite elimiminar al Dispositivo
export const deleteDispositivosModel = async(req,res)=>
    {
        try
        {
         const{id}= req.params;
         const result = await dispositivosModel.deleteDispositivosModel(id);
         res.json({message:'Dispositivo eliminado'})
        }
        catch(error)
        {
            res.status(500).json({error:'Error al eliminar'})
        }
    }
  export const getByLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const dispositivos = await dispositivosModel.getDispositivosByLaboratorio(id);
        
        if (dispositivos.length === 0) {
            return res.status(404).json({ message: "No hay dispositivos en este laboratorio" });
        }
        
        res.json(dispositivos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  
export const process_Dispositivos= async(req,res)=>
    {
        try
        {
            const datos = await dispositivosModel.process_Dispositivos();
            res.json(datos);
        }
        catch(error)
        {
            res.status(500).json({error:error.message});
        }
    }
   
   
    // controladores de el proyecto o apartado de ecuaciones 
export const getAnalisisFinalUTH = async (req, res) => {
    const { idDispositivo } = req.params;

    try {
        // obtener datos desde el modelo
        const dataM1 = await dispositivosModel.getM1(idDispositivo);
        const dataM2 = await dispositivosModel.getM2(idDispositivo);

        // Validación de existencia
        if (!dataM1 || !dataM2) {
            return res.status(404).json({ 
                msg: "no hay datos suficientes para el análisis" 
            });
        }

        const M1 = dataM1.M1;
        const M2 = dataM2.M2;

        // validación matemática de la formula de decremento 
        if (M1 <= 0 || M2 <= 0) {
            return res.status(400).json({ 
                error: "datos invalidos: no se puede calcular con valores en 0" 
            });
        }

        if (M2 <= M1) {
            return res.status(400).json({ 
                error: "no hay crecimiento suficiente para aplicar el modelo exponencial" 
            });
        }

        //  Modelo: dM/dt = kM
        const t1 = 1;
        const t2 = 4;

        // Paso 4: constante k
        const k = Math.log(M2 / M1) / (t2 - t1);

        // Paso 6: proyección a 6 semanas
        const t_proyeccion = 6;
        const M_proyectado = M1 * Math.exp(k * (t_proyeccion - t1));

        // Paso 7: tiempo para llegar a 10 mantenimientos
        const M_limite = 10;
        const t_critico = (Math.log(M_limite / M1) / k) + t1;

        // 🔹 Conversión a días
        const dias_criticos = Math.round(t_critico * 7);

        // 🔹 Respuesta final
        res.json({
            header: {
                laboratorio: dataM2.nombreLaboratorio,
                dispositivo: dataM2.nombreDispositivo
            },
            datos_base: {
                M1_semana_1: M1,
                M2_semana_4: M2
            },
            modelo_matematico: {
                constante_k: parseFloat(k.toFixed(4)),
                proyeccion_semana_6: parseFloat(M_proyectado.toFixed(2)),
                semanas_para_10: parseFloat(t_critico.toFixed(2)),
                dias_estimados: dias_criticos
            },
            conclusion: `El dispositivo alcanzará ${M_limite} mantenimientos en aproximadamente ${dias_criticos} días. Se recomienda mantenimiento preventivo o reemplazo para evitar costos elevados.`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: "Error en el cálculo del modelo predictivo." 
        });
    }
};