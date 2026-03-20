import db from '../config/BD.js'

export const getAllNovedades = async()=>
    {
        const [rows]= await db.query('SELECT * FROM novedades');
        return rows
    }
    export const getNovedadesById = async(id)=>
        {
const[rows] = await db.query(
    'SELECT * FROM novedades WHERE idNovedad =?',[id]
)
return rows[0]
}
export const createNovedad = async ({ tituloNovedad, encabezado, informacion, nombreImagen, imagen }) => {
    const fecha = new Date();
    const [result] = await db.query(
        'INSERT INTO novedades (tituloNovedad, encabezado, fecha, informacion, nombreImagen, imagen) VALUES (?, ?, ?, ?, ?, ?)',
        [tituloNovedad, encabezado, fecha, informacion, nombreImagen, imagen]
    );
    return {
        idNovedad: result.insertId, 
        tituloNovedad,
        encabezado,
        fecha,
        informacion,
        nombreImagen,
        imagen
    };
};
// Actualizar Novedad
export const updateNovedadModel = async (id, datos) => {
    const { tituloNovedad, encabezado, informacion, nombreImagen, Imagen } = datos;
    const [result] = await db.query(
        'UPDATE novedades SET tituloNovedad=?, encabezado=?, informacion=?, nombreImagen=?, Imagen=? WHERE idNovedad=?',
        [tituloNovedad, encabezado, informacion, nombreImagen, Imagen, id]
    );
    return result;
};

// Eliminar Novedad
export const deleteNovedadModel = async (id) => {
    const [result] = await db.query(
        'DELETE FROM novedades WHERE idNovedad = ?',
        [id]
    );
    return result;
};