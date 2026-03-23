// src/helpers/formatOrden.j
export const estructurarOrden = (rows) => {
    if (rows.length === 0) return null;

    // Tomamos los datos generales de la primera fila
    const orden = {
        idOrden: rows[0].idOrden,
        fecha: rows[0].fechaCreacion,
        tecnico: rows[0].nombreUsuario,
        laboratorio: rows[0].nombreLaboratorio,
        estado: rows[0].estado,
        // Aquí "mapeamos" solo los dispositivos
        dispositivos: rows.map(row => ({
         id: row.idDispositivo,      
         nombre: row.nombreDispositivo,
         mantenimiento: row.mantenimiento 
}))
    };

    return orden;
};