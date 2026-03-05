import db from '../config/BD.js'


export const getAllDispositivos = async()=>{
    const [rows]= await db.query('select * from dispositivos')
    return rows
}
export const getDispositivosById = async(id)=>{
    const [rows]= await db.query('SELECT * FROM dispositivos WHERE idDispositivos=?',
    [id]
    )
}
export const createDispositivo= async({idDispositivo,idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario})=>{
const [restult]= await db.query('insert into grupos(idDispositivo,idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario) values(?,?,?,?,?,?)'
,[idDispositivo,idLaboratorio,idModelo,idTipoDispositivo,nombreDispositivo,numeroInventario])
return
{
    idDispositivo,
    idLaboratorio,
    idModelo,
    idTipoDispositivo,
    nombreDispositivo,
    numeroInventario
}

}




/*

export const createModelo = async({idMarca,nombreModelo})=>{
    const [restult]=await db.query(
        'insert into grupos(idMarca,nombreModelo) values (?,?)'
        ,[idMarca,nombreModelo])
    return {
        idModelo: result.insertId,
       idMarca,
       nombreModelo
    }
}*/