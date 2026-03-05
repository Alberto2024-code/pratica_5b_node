import db from '../config/BD.js'

export const getAllNovedades = async()=>
    {
        const [rows]= await db.query('SELECT * FROM novedades')
        return rows
    }
    export const getNovedadesById = async(id)=>
        {
const[rows] = await db.query(
    'SELECT * FROM novedades WHERE idNovedad =?',[id]
)
return rows[0]
}
export const createNovedad = async({idNovedad,tituloNovedad,encabezado,informacion,nombreImagen,Imagen})=>{ 
const[restult] = await db.query(
    'INSERT INTO novedades(idNovedad,tituloNovedad,encabezado,informacion,nombreImagen,Imagen)',[idNovedad,tituloNovedad,encabezado,informacion,nombreImagen,Imagen]
)
return{
    idNovedad,
    tituloNovedad,
    encabezado,
    informacion,
    nombreImagen,
    Imagen
}
}