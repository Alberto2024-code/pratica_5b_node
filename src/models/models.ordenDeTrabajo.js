import db from '../config/BD.js'
// get / api/ordenes
export const getAllOrdenes = async()=>{

    const[rows]= await db.query(`
    SELECT 
        o.idOrden,
        u.nombreUsuario,
        l.idLaboratorio,
        l.nombreLaboratorio,
        o.estado,
        o.horasHombre
        o.fechaCreacion
    FROM ordenes o
    LEFT JOIN usuarios u ON o.idUusuario = u.idUsuario
    LEFT JOIN laboratorios l ON o.idLaboratorio= l.idLaboratorio
    LEFT JOIN orden_dispositivos od  ON o.idOrden = od.idOrden
    LEFT JOIN dispositivos d ON d.idDispositivo = od.idDispositivo
    LEFT JOIN tipomantenimientos tm ON  tm.idTipoMantenimiento = od.idTipoMantenimiento
    ORDER BY  O.idOrden DESC;
    `);
    return rows
}
// get / api/ordenes/:id
export const getOrdenById = async(id)=>
    {
       const [rows]= await db.query('SELECT * FROM ordenes WHERE idOrden =?', 
        [id]
       );
       return  rows[0]
    }
// post /api/ordenes/:id/dispositivos

export const postDispositivoAOrden = async(idOrden, { idDispositivo, idTipoMantenimiento })=>
{
       const[result]= await db.query('SELECT * FROM orden_dispositivos (idOrden, idDispositivo, idTipoMantenimiento) VALUES (?, ?, ?)',
        [idOrden, idDispositivo, idTipoMantenimiento]
       );
    return {
    idOrdenDispositivo: result.insertId,
    idOrden,
    idDispositivo,
    idTipoMantenimiento
  };
}
// get  /api/laboratorios/:id/dispositivos
export const getDispositivosByLaboratorio = async(id)=>
    {
       const[rows]= await db.query('SELECT * FROM dispositivos WHERE idLaboratorio=?',[id]

       )
       return rows

    }
// patch  /api/ordenes/:id/estado
export const patchEstado = async(id,estado)=>
    {
        const [result] = await db.query('UPDATE ordenes SET  estado = ? WHERE idOrden = ?',
            [estado, id]
        )
        return result
    }
//get  /api/ordenes/:id/pdf
export const getDatosParaPDF = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            o.idOrden, o.fechaCreacion, o.estado, o.insumos, o.horasHombre,
            u.nombreUsuario as tecnico,
            l.nombreLaboratorio,
            d.nombreDispositivo, d.serie,
            tm.nombreTipoMantenimiento
        FROM ordenes o
        INNER JOIN usuarios u ON o.idUsuario = u.idUsuario
        INNER JOIN laboratorios l ON o.idLaboratorio = l.idLaboratorio
        LEFT JOIN orden_dispositivos od ON o.idOrden = od.idOrden
        LEFT JOIN dispositivos d ON od.idDispositivo = d.idDispositivo
        LEFT JOIN tipomantenimientos tm ON od.idTipoMantenimiento = tm.idTipoMantenimiento
        WHERE o.idOrden = ?`, 
        [id]
    );
    return rows; 
};