import db from '../config/BD.js'
/*-----APARTADO DE LOS DATOS DE LABORATORIO-------------*/ 
export const getAllLaboratorios = async () => {
  const [rows] = await db.query('SELECT * FROM laboratorios')
  return rows
}

export const getLaboratorioById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM laboratorios WHERE idLaboratorio = ?',
    [id]
  )
  return rows[0]
}

export const createLaboratorio = async ({ nombreLaboratorio }) => {
  const [result] = await db.query(
    'INSERT INTO laboratorios (nombreLaboratorio) VALUES (?)',
    [nombreLaboratorio]
  )

  return {
    idLaboratorio: result.insertId,
    nombreLaboratorio
  }
}
// Actualizar laboratorio
export const updateLaboratorioModel = async (id, datos) => {
    const { nombreLaboratorio } = datos;
    const [result] = await db.query(
        'UPDATE laboratorios SET nombreLaboratorio = ? WHERE idLaboratorio = ?',
        [nombreLaboratorio, id]
    );
    return result;
};

// Eliminar laboratorio
export const deleteLaboratorioModel = async (id) => {
    const [result] = await db.query(
        'DELETE FROM laboratorios WHERE idLaboratorio = ?',
        [id]
    );
    return result;
};