import db from '../config/BD.js';

// 1. Cálculo de predicción (Pregunta 1) - CORREGIDO
export const GetEcuaciones = async (idDispositivo) => {
    try {
        const [rows] = await db.query(
            `SELECT
                d.idDispositivo, d.nombreDispositivo, m.nombreModelo,
                l.nombreLaboratorio, h.rendimiento, h.fecha 
            FROM dispositivos d
            INNER JOIN modelos m ON m.idModelo = d.idModelo
            INNER JOIN laboratorios l ON l.idLaboratorio = d.idLaboratorio
            INNER JOIN historial_rendimiento h ON d.idDispositivo = h.idDispositivo
            WHERE d.idDispositivo = ? 
            ORDER BY h.fecha DESC LIMIT 2`, 
            [idDispositivo]
        );

        if (rows.length < 2) {
            throw new Error("Se requieren al menos 2 registros de rendimiento.");
        }

        // p1 = ACTUAL (85), p0 = ANTERIOR (100)
        const p1 = parseFloat(rows[0].rendimiento); 
        const p0 = parseFloat(rows[1].rendimiento); 
        const fecha1 = new Date(rows[0].fecha);
        const fecha0 = new Date(rows[1].fecha);
        
        // Tiempo en meses (siempre positivo)
        const t = Math.abs(fecha1 - fecha0) / (1000 * 60 * 60 * 24 * 30.4) || 0.1;

        // k debe ser NEGATIVA para representar decremento
        const k = Math.log(p1 / p0) / t; 
        const nivelCritico = 60; 
        
        let dias_restantes = 0;
        if (k < 0) {
            // Calculamos cuánto falta desde el rendimiento ACTUAL (p1) hasta el crítico
            const t_critico = Math.log(nivelCritico / p1) / k;
            dias_restantes = t_critico * 30.4;
        }

        return {
            equipo: rows[0].nombreDispositivo,
            modelo: rows[0].nombreModelo,
            laboratorio: rows[0].nombreLaboratorio,
            rendimiento_actual: p1,
            decremento_k: k.toFixed(5),
            prediccion: {
                dias_para_fallo: Math.max(0, Math.round(dias_restantes)),
                mensaje: k < 0 ? "Decremento detectado" : "Rendimiento estable o mejora"
            }
        };
    } catch (error) {
        throw error;
    }
};

// 2. Reporte de prioridades (Pregunta 2) - CORREGIDO
export const GetReporteLaboratorios = async () => {
    try {
        const [rows] = await db.query(
            `SELECT 
                l.nombreLaboratorio, 
                COUNT(n.idNovedad) AS total_fallas
             FROM laboratorios l 
             LEFT JOIN dispositivos d ON l.idLaboratorio = d.idLaboratorio
             LEFT JOIN novedades n ON d.idDispositivo = n.idDispositivo 
             GROUP BY l.idLaboratorio, l.nombreLaboratorio
             ORDER BY total_fallas DESC`
        );
        return rows;
    } catch (error) {
        throw error;
    }
};
// 3. Reporte de Estado General por Laboratorio  esto es lo que me pidio mi fronend
export const GetEstadoLaboratorios = async () => {
    try {
        const [rows] = await db.query(
            `SELECT 
                l.nombreLaboratorio, 
                ROUND(AVG(h.rendimiento), 2) AS promedio_rendimiento,
                COUNT(d.idDispositivo) AS total_equipos,
                SUM(CASE WHEN h.rendimiento < 70 THEN 1 ELSE 0 END) AS equipos_criticos
             FROM laboratorios l
             INNER JOIN dispositivos d ON l.idLaboratorio = d.idLaboratorio
             INNER JOIN (
                -- Solo tomamos el rendimiento más reciente de cada equipo
                SELECT idDispositivo, rendimiento 
                FROM historial_rendimiento 
                WHERE (idDispositivo, fecha) IN (
                    SELECT idDispositivo, MAX(fecha) 
                    FROM historial_rendimiento 
                    GROUP BY idDispositivo
                )
             ) h ON d.idDispositivo = h.idDispositivo
             GROUP BY l.idLaboratorio, l.nombreLaboratorio
             ORDER BY promedio_rendimiento ASC` 
        );
        return rows;
    } catch (error) {
        throw error;
    }
};