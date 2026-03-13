import db from '../config/BD.js'

export const getAllModelos= async ()=>{
    const [rows]= await db.query(`
    SELECT 
        m.idModelo, 
        m.nombreModelo, 
        ma.nombreMarca,
        ma.idMarca
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
        'INSERT INTO modelos(idMarca,nombreModelo) VALUES (?,?)'
        ,[idMarca,nombreModelo])
    return {
        idModelo: restult.insertId,
       idMarca,
       nombreModelo
    }
}
// Función para actualizar los datos del modelo
export const updateModeloModel = async(id,datos)=>
    {
       const {idMarca,nombreModelo}= datos;
       const[result]= await db.query('UPDATE modelos SET idMarca=?,nombreModelo=? WHERE idModelo=?',[idMarca,nombreModelo,id]);
       return result;
    };
//Función para eliminar físicamente al modelos 
export const deleteModeloModel= async(id)=>
    {
      const [result] = await db.query('DELETE FROM modelos WHERE idModelo = ? ',
        [id]
      );
     return result;
    };




