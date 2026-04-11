import * as modelEcuaciones from '../models/models.ecuacionesDFL.js';

export const GetEcuaciones = async (req, res) => {
    try {
        const { id } = req.params; 
        const prediccion = await modelEcuaciones.GetEcuaciones(id);
        return res.status(200).json({
            ok: true,
            data: prediccion
        });
    } catch (error) {
        console.error("Error en el cálculo:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error en el cálculo predictivo.",
            error: error.message
        });
    }
};

export const GetReporteLaboratorios = async (req, res) => {
    try {
        const reporte = await modelEcuaciones.GetReporteLaboratorios();
        return res.status(200).json({
            ok: true,
            data: reporte
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener prioridades."
        });
    }
};