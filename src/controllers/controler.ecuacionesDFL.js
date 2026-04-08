import * as modelEcuaciones from '../models/models.ecuacionesDFL.js'

export const GetEcuaciones = async(req,res)=>
    {
     try
     {
        const { id } = req.params; 
        const prediccion = await modelEcuaciones.GetEcuaciones(id);
        return res.status(200).json({
            ok: true,
            data: prediccion
        });

     }
     catch(error)
     {
   console.error("Error en el cálculo predictivo:", error);
        return res.status(500).json({
            ok: false,
            msg: "No se pudo calcular la predicción. Verifique que el equipo tenga historial de mantenimiento.",
            error: error.message
        });
     }
    }


    export const getPrioridadLaboratorios = async (req, res) => {
    try {
        const reporte = await modelEcuaciones.GetReporteLaboratorios();
        return res.status(200).json({
            ok: true,
            data: reporte
        });

    } catch (error) {
        console.error("Error al obtener prioridades:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al generar el reporte de laboratorios."
        });
    }
};
