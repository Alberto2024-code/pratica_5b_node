import db from '../config/BD.js'

export const getAllOrdenDispositivo= async ()=>{
    const [rows]= await db.query('select * from orden_dispositivos')
    return rows
}

// Obtener modelo por ID
export const getOrdenDispositivoById = async (id) => { const [rows] = await db.query(
    'SELECT * FROM orden_dispositivos WHERE idDispositivo = ?',
    [id]
  )
  return rows[0]
}

export const createOrdenDispositivo = async({idOrden,idDispositivo,idTipoMantenimiento,realizado})=>{
    const [restult]=await db.query(
        'INSERT INTO orden_dispositivo(idOrden,idDispositivo,idTipoMantenimiento,realizado) values (?,?,?,?)'
        ,[idOrden,idDispositivo,idTipoMantenimiento,realizado])
    return {
        idOrden:restult.insertId,
        idDispositivo,
        idTipoMantenimiento,
        realizado
    }
}
// Actualizar relación Orden-Dispositivo
export const updateOrdenDispositivoModel = async (id, datos) => {
    const { idOrden, idTipoMantenimiento, realizado } = datos;
    const [result] = await db.query(
        'UPDATE orden_dispositivos SET idOrden = ?, idTipoMantenimiento = ?, realizado = ? WHERE idDispositivo = ?',
        [idOrden, idTipoMantenimiento, realizado, id]
    );
    return result;
};

// Eliminar relación
export const deleteOrdenDispositivoModel = async (id) => {
    const [result] = await db.query(
        'DELETE FROM orden_dispositivos WHERE idDispositivo = ?',
        [id]
    );
    return result;
};