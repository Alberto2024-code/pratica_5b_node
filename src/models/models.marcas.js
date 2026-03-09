import db from '../config/BD.js'
/*-----APARTADO DE LOS DATOS DE LABORATORIO-------------*/ 
export const getAllMarcas = async () => {
  const [rows] = await db.query('SELECT * FROM marcas')
  return rows
}

export const getMarcasById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM marcas WHERE idMarca = ?',
    [id]
  )
  return rows[0]
}

export const createMarca = async ({ idMarca,nombreMarca }) => {
  const [result] = await db.query(
    'INSERT INTO marca (idMarca,nombreMarca) VALUES (?,?)',
    [idMarca,nombreMarca]
  )

  return {
    idMarca: result.insertId,
    nombreMarca
  }
}
export const updateMarcaModel = async (id, nombreMarca) => {
    const [result] = await db.query(
        'UPDATE marcas SET nombreMarca = ? WHERE idMarca = ?',
        [nombreMarca, id]
    );
    return result;
};

export const deleteMarcaModel = async (id) => {
    const [result] = await db.query(
        'DELETE FROM marcas WHERE idMarca = ?', 
        [id]
    );
    return result;
};