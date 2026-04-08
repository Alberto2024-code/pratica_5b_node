
import db from '../config/BD.js';

// 1. Cálculo de predicción (Pregunta 1)
export const GetEcuaciones = async (id_dispositivo) => {
    try {
        const [rows] = await db.query(
            `SELECT informacion, fecha FROM novedades WHERE id_dispositivo = ? ORDER BY fecha DESC LIMIT 2`, 
    [id_dispositivo]
        );

        if (rows.length < 2) {
            throw new Error("Se requieren al menos 2 registros para calcular la predicción.");
        }

        const p1 = parseFloat(rows[0].rendimiento); 
        const p0 = parseFloat(rows[1].rendimiento); 
        
        const fecha1 = new Date(rows[0].fecha_registro);
        const fecha0 = new Date(rows[1].fecha_registro);
        const t = (fecha1 - fecha0) / (1000 * 60 * 60 * 24 * 30); // Diferencia en meses

        // FÓRMULA DE ZILL
        const k = Math.log(p1 / p0) / (t || 1); 
        const nivelCritico = 60;
        const t_critico = Math.log(nivelCritico / p0) / k;
        const dias_restantes = (t_critico - t) * 30;

        return {
            id_dispositivo,
            rendimiento_actual: p1,
            constante_k: k.toFixed(5),
            prediccion: {
                meses_totales_vida: t_critico.toFixed(2),
                dias_para_fallo: Math.max(0, dias_restantes.toFixed(0)),
                mensaje: "Basado en el modelo de decrecimiento de Zill"
            }
        };
    } catch (error) {
        throw error;
    }
};

// 2. Reporte de prioridades (Pregunta 2)
export const GetReporteLaboratorios = async () => {
    try {
        const [rows] = await db.query(
            `SELECT l.nombreLaboratorio, COUNT(n.idNovedad) as total_fallas
             FROM laboratorios l
             LEFT JOIN dispositivos d ON l.idLaboratorio = d.idLaboratorio
             LEFT JOIN novedades n ON d.id_dispositivo = n.id_dispositivo
             GROUP BY l.idLaboratorio
             ORDER BY total_fallas DESC`
        );
        return rows;
    } catch (error) {
        throw error;
    }
};