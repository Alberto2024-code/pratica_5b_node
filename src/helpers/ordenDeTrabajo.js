// src/helpers/formatOrden.j
export const estructurarOrden = (rows) => {
    if (rows.length === 0) return null;

    // Tomamos los datos generales de la primera fila
    const orden = {
        idOrden: rows[0].idOrden,
        fecha: rows[0].fechaCreacion,
        usuario: rows[0].nombreUsuario,
        laboratorio: rows[0].nombreLaboratorio,
        estado: rows[0].estado,
        // Aquí "mapeamos" solo los dispositivo
        dispositivos: rows.map(row => ({
         id: row.idDispositivo,      
         nombre: row.nombreDispositivo,
         mantenimiento: row.mantenimiento 
}))
    };

    return orden;
};
export const estructurarGetOr = (rows) => { // Eliminado el async
    if (!rows || rows.length === 0) return null;

    return {
        idOrden: rows[0].idOrden,
        fecha: rows[0].fechaCreacion,
        tecnico: rows[0].nombreUsuario,
        estado: rows[0].estado,
        laboratorio: rows[0].nombreLaboratorio,
        dispositivos: rows.map(row => ({
            id: row.idDispositivo, // CORREGIDO: faltaba el row.
            nombre: row.nombreDispositivo,
            mantenimiento: row.mantenimiento,
            laboratorio: row.laboratorio,
            numeroInventario: row.numeroInventario
        }))
    };
};