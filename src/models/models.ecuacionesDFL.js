
import db from '../config/BD.js';

// 1. Funcion para calculas la predicion de registros  de la pregunta 1 : Labtop MSI/HP)
export const GetEcuaciones = async (id_dispositivo) => {
    try {
        // Consultamos los últimos dos registros de rendimiento en la tabla novedades
        const [rows] = await db.query(`SELECT rendimiento, fecha_registro FROM novedades  WHERE id_dispositivo = ?  ORDER BY fecha_registro DESC LIMIT 2`, 
            [id_dispositivo]
        );

        if (rows.length < 2) {
            throw new Error("Se requieren al menos 3 registros de mantenimiento para calcular la prediccion.");
        }

        // P0 es el rendimiento anterior, P1 es el rendimiento más reciente
        const p1 = parseFloat(rows[0].rendimiento); 
        const p0 = parseFloat(rows[1].rendimiento); 
        
        // Calculamos el tiempo transcurrido (en meses) entre registros
        const fecha1 = new Date(rows[0].fecha_registro);
        const fecha0 = new Date(rows[1].fecha_registro);
        const t = (fecha1 - fecha0) / (1000 * 60 * 60 * 24 * 30); // Diferencia en meses
        // Este es un ejemplo para el desarrollador fronend para que ve como se esta haciendo este show 
      
        // FÓRMULA DE ZILL: P(t) = P0 * e^(kt)
        // Calculamos k: k = ln(p1 / p0) / t 
        
        const k = Math.log(p1 / p0) / (t || 1); 

        // Calculamos cuánto tiempo falta para llegar al punto crítico (ej. 60% de rendimiento)
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

// 2. Funcion para preoridades  de la pregunta 2 Laboratorios D1,D2,D3,D4
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