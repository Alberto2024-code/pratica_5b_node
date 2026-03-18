import * as ordenDeTrabajoModel from '../models/models.ordenDeTrabajo.js';
import { estructurarOrden } from '../helpers/ordenDeTrabajo.js';

export const getOrdenCompleta = async (req, res) => {
    try {
        const { id } = req.params;
        
        // El modelo trae las filas con JOIN (pueden venir repetidas por los dispositivos)
        const rows = await ordenDeTrabajoModel.getDatosParaPDF(id); 

        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: "La orden no existe o no tiene datos" });
        }
        
        // El HELPER acomoda las filas en un solo objeto JSON limpio
        const ordenLimpia = estructurarOrden(rows); 
        
        res.json(ordenLimpia);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la orden completa", error: error.message });
    }
};

export const createOrden = async (req, res) => {
    try {
        // Extraemos los datos del body que definiste en tu modelo
        const nuevaOrden = await ordenDeTrabajoModel.createOrden(req.body);
        res.status(201).json(nuevaOrden);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la orden", error: error.message });
    }
};

export const postDispositivoAOrden = async (req, res) => {
    try {
        const { id } = req.params; // ID de la orden desde la URL
        const { idDispositivo, idTipoMantenimiento } = req.body; 

        const nuevoVinculo = await ordenDeTrabajoModel.addDispositivoToOrden(id, { 
            idDispositivo, 
            idTipoMantenimiento 
        });
        
        res.status(201).json({
            message: "Dispositivo vinculado a la orden exitosamente",
            data: nuevoVinculo
        });
    } catch (error) {
        res.status(500).json({ message: "Error al vincular dispositivo", error: error.message });
    }
};

export const patchEstado = async (req, res) => {
    try {
        const { id } = req.params; 
        const { estado } = req.body; 

        if (!estado) {
            return res.status(400).json({ message: "El campo 'estado' es obligatorio" });
        }

        await ordenDeTrabajoModel.updateEstadoOrden(id, estado);
        
        res.json({ 
            message: `Estado de la orden ${id} actualizado a '${estado}' correctamente` 
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el estado", error: error.message });
    }
};

export const getAllOrdenes = async (req, res) => {
    try {
        const ordenes = await ordenDeTrabajoModel.getAllOrdenes(); // Asumiendo que tienes esta función en el modelo
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la lista de órdenes", error: error.message });
    }
};
export const getDispositivosByLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Llamamos a la función del modelo que acabas de escribir
        const dispositivos = await ordenDeTrabajoModel.getDispositivosByLaboratorio(id);

        if (!dispositivos || dispositivos.length === 0) {
            return res.status(404).json({ message: "No hay dispositivos en este laboratorio" });
        }

        res.json(dispositivos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener dispositivos", error: error.message });
    }
};