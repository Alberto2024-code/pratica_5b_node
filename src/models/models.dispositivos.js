import db from '../config/BD.js'


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
        d.idTipoDispositivo

    FROM dispositivos d
    INNER JOIN modelos mo ON d.idModelo = mo.idModelo
    INNER JOIN laboratorios lab ON d.idLaboratorio = lab.idLaboratorio

  `)
    return rows
}
export const getDispositivosById = async(id)=>{
    const [rows]= await db.query('SELECT * FROM dispositivos WHERE idDispositivos=?',
    [id]
    )
    return rows[0]
}
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




