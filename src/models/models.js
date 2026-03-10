import db from '../config/BD.js'

export const getAllModelos= async ()=>{
    const [rows]= await db.query(`
    SELECT 
        m.idModelo, 
        m.nombreModelo, 
        ma.nombreMarca 
    FROM modelos m
    INNER JOIN marcas ma ON m.idMarca = ma.idMarca
  `)
    return rows
}

// Obtener modelo por ID
export const getModeloById = async (id) => { const [rows] = await db.query(
    'SELECT * FROM modelos WHERE idModelo = ?',
    [id]
  )
  return rows[0]
}

export const createModelo = async({idMarca,nombreModelo})=>{
    const [restult]=await db.query(
        'INSERT INTO grupos(idMarca,nombreModelo) VALUES (?,?)'
        ,[idMarca,nombreModelo])
    return {
        idModelo: restult.insertId,
       idMarca,
       nombreModelo
    }
}




