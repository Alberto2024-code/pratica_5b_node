import db from '../config/BD.js'


export const getAllTipoMantenimiento = async()=>
    {
        const [rows]= await db.query('SELECT * FROM tipomantenimientos' )
        return rows
    }
export const getTipoMantenimientoById= async(id)=>{
    const[rows]= await db.query('SELECT * FROM tipomantenimientos WHERE idTipoMantenimiento=?',
        [id]
    )
    return rows[0]
}

export const createTipoMantenimiento = async({idTipoMantenimiento,tipoMantenimiento})=>{
    const[result]= await db.query('INSERT INTO tipoMantenimierntos(idTipoMantenimiento,tipoMantenimiento) VALUES(?,?)',[idTipoMantenimiento,tipoMantenimiento])
return{
    idTipoMantenimiento : result.insertId,
    tipoMantenimiento
}
}

