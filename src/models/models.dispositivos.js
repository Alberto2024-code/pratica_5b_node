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

