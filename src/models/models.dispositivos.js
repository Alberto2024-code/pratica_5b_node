import db from '../config/BD.js'


export const getAllDispositivos = async()=>{
    const [rows]= await db.query('SELECT * FROM dispositivos'
    
  )
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




