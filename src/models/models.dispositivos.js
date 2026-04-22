import db from '../config/BD.js'

//funcion que permite consultar lo que tiene registrado la api 
export const getAllDispositivos = async()=>{
    const [rows]= await db.query(`
    SELECT 
        d.idDispositivo, 
        d.nombreDispositivo, 
        d.numeroInventario,
        d.idModelo,
        mo.nombreModelo,
        d.idLaboratorio,
        lab.nombreLaboratorio,
        d.idTipoDispositivo,
        t.tipoDispositivo

    FROM dispositivos d
    INNER JOIN modelos mo ON d.idModelo = mo.idModelo
    INNER JOIN laboratorios lab ON d.idLaboratorio = lab.idLaboratorio
    INNER JOIN tipodispositivos t ON d.idTipoDispositivo = t.idTipoDispositivo
  `)
    return rows
}
//fruncion que permite al usuario del fronend poder buscar un dispositivo por medio de id
export const getDispositivosById = async(id)=>{
    const [rows]= await db.query('SELECT * FROM dispositivos WHERE idDispositivo=?',
    [id]
    )
    return rows[0]
}
// funcion que permite que fronend pueda crear un nuevo usuario para la api
export const createDispositivo = async ({ idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario}) => {

const [result] = await db.query(
'INSERT INTO dispositivos(idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario) VALUES (?,?,?,?,?)',
[idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario]
)

return {
    idDispositivo: result.insertId,
    idLaboratorio,
    idModelo,
    idTipoDispositivo,
    nombreDispositivo,
    numeroInventario
}
}
//funcion que permite actualzar lo datos que el fronend pide actualizar
export const updateDispositivosModel = async(id,datos)=>{

    const {idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario}= datos;
    const [result]= await db.query('UPDATE dispositivos SET idLaboratorio=?,idModelo=?,idTipoDispositivo=?,nombreDispositivo=?,numeroInventario=? WHERE idDispositivo = ?',
    [idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario,id]);
    return result;
}
//funcion que permite eliminar lo que el fronend pida 
export const deleteDispositivosModel = async(id)=>{
    const [result] = await db.query('DELETE FROM dispositivos WHERE idDispositivo=?',
        [id]
    );
    return result;
}
// Obtener dispositivos filtrados por laboratorio
export const getDispositivosByLaboratorio = async (idLaboratorio) => {
    const [rows] = await db.query(
        `SELECT d.*, l.nombreLaboratorio 
         FROM dispositivos d 
         INNER JOIN laboratorios l ON d.idLaboratorio = l.idLaboratorio 
         WHERE d.idLaboratorio = ?`, 
        [idLaboratorio]
    );
    return rows;
};
export const  process_Dispositivos = async()=>
    {
        const [rows]= await db.query('CALL  sp_ListarDispositivosCompletos()')
        return rows
    }



    // este apartado es lo de ecuaciones diferenciales deseenme suerte  (°o°)
// Obtener M1 (1 semana)
export const getM1 = async (idDispositivo) => {
    const [rows] = await db.query(`
        SELECT COUNT(DISTINCT o.idOrden) AS M1
        FROM dispositivos d
        INNER JOIN (
            SELECT od.idDispositivo, MIN(o.fechaCreacion) AS fechaInicio
            FROM ordenes o
            JOIN orden_dispositivos od ON o.idOrden = od.idOrden
            WHERE od.idTipoMantenimiento = 2
            GROUP BY od.idDispositivo
        ) primera_fecha ON d.idDispositivo = primera_fecha.idDispositivo
        INNER JOIN orden_dispositivos od ON d.idDispositivo = od.idDispositivo
        INNER JOIN ordenes o ON od.idOrden = o.idOrden
        WHERE d.idDispositivo = ?
          AND od.idTipoMantenimiento = 2
          AND o.fechaCreacion BETWEEN primera_fecha.fechaInicio
          AND DATE_ADD(primera_fecha.fechaInicio, INTERVAL 1 WEEK);
    `, [idDispositivo]);

    return rows[0] || { M1: 0 };
};

// Obtener M2 (4 semanas)
export const getM2 = async (idDispositivo) => {
    const [rows] = await db.query(`
        SELECT 
            l.nombreLaboratorio,
            d.nombreDispositivo,
            COUNT(DISTINCT o.idOrden) AS M2
        FROM dispositivos d
        INNER JOIN laboratorios l ON d.idLaboratorio = l.idLaboratorio
        INNER JOIN (
            SELECT od.idDispositivo, MIN(o.fechaCreacion) AS fechaInicio
            FROM ordenes o
            JOIN orden_dispositivos od ON o.idOrden = od.idOrden
            WHERE od.idTipoMantenimiento = 2
            GROUP BY od.idDispositivo
        ) primera_fecha ON d.idDispositivo = primera_fecha.idDispositivo
        INNER JOIN orden_dispositivos od ON d.idDispositivo = od.idDispositivo
        INNER JOIN ordenes o ON od.idOrden = o.idOrden
        WHERE d.idDispositivo = ?
          AND od.idTipoMantenimiento = 2
          AND o.fechaCreacion BETWEEN primera_fecha.fechaInicio
          AND DATE_ADD(primera_fecha.fechaInicio, INTERVAL 4 WEEK)
        GROUP BY d.idDispositivo, d.nombreDispositivo, l.nombreLaboratorio;
    `, [idDispositivo]);

    return rows[0] || { M2: 0 };
};