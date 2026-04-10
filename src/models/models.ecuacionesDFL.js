import db from '../config/BD.js';

// 1. Cálculo de predicción (Pregunta 1)
export const GetEcuaciones = async (idDispositivo) => {
    try {
        // Se hace un INNER JOIN para traer los datos 

    
        const [rows] = await db.query(
            `SELECT
            d.idDispositivo,
            d.nombreDispositivo,
            d.idModelo,
            d.idTipoDispositivo,
            t.tipoDispositivo,
            d.idLaboratorio,
            l.nombreLaboratorio,
            d.numeroInventario,
            m.nombreModelo,
            h.rendimiento, h.fecha 
             
            FROM dispositivos d
             INNER JOIN modelos m ON   m.idModelo = d.idModelo
             INNER JOIN tipodispositivos t ON  t.idTipoDispositivo = d.idTipoDispositivo
             INNER JOIN laboratorios l ON l.idLaboratorio = d.idLaboratorio
             INNER JOIN historial_rendimiento h ON d.idDispositivo = h.idDispositivo
            WHERE d.idDispositivo = ? 
            ORDER BY h.fecha DESC LIMIT 2`, 
            [idDispositivo]
        );

        if (rows.length < 2) {
            throw new Error("Se requieren al menos 2 registros de rendimiento para calcular el decremento.");
        }

        const p1 = parseFloat(rows[0].rendimiento); 
        const p0 = parseFloat(rows[1].rendimiento); 
        const fecha1 = new Date(rows[0].fecha);
        const fecha0 = new Date(rows[1].fecha);
        
        // Diferencia de tiempo en meses
        const t = (fecha1 - fecha0) / (1000 * 60 * 60 * 24 * 30) || 0.1;

        // FÓRMULA DE ZILL
        const k = Math.log(p1 / p0) / t; 
        const nivelCritico = 60; 
        const t_critico = Math.log(nivelCritico / p0) / k;
        const dias_restantes = (t_critico - t) * 30;

        return {
            equipo: rows[0].nombreDispositivo,
            modelo: rows[0].nombreModelo,
            laboratorio: rows[0].nombreLaboratorio,
            rendimiento_actual: p1,
            decremento_k: k.toFixed(5),
            prediccion: {
                dias_para_fallo: Math.max(0, parseInt(dias_restantes)),
                mensaje: "Análisis de decremento basado en historial técnico"
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