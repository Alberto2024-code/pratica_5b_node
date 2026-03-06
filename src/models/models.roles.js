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