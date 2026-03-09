import db from '../config/BD.js'

// Obtener todos los roles
export const getAllRoles = async () => {
  const [rows] = await db.query('SELECT * FROM roles')
  return rows
}

// Obtener rol por ID
export const getRolById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM roles WHERE idRol = ?',
    [id]
  )
  return rows[0]
}

export const createRol = async ({  idRol,rol }) => {
  const [result] = await db.query(
    'INSERT INTO roles ( idRol,rol) VALUES (?,?)',
    [idRol,rol]
  )

  return {
    idRol: result.insertId,
    rol
  }
}
// Actualizar Rol
export const updateRolModel = async (id, datos) => {
    const { rol } = datos;
    const [result] = await db.query(
        'UPDATE roles SET rol = ? WHERE idRol = ?',
        [rol, id]
    );
    return result;
};

// Eliminar Rol
export const deleteRolModel = async (id) => {
    const [result] = await db.query(
        'DELETE FROM roles WHERE idRol = ?',
        [id]
    );
    return result;
};