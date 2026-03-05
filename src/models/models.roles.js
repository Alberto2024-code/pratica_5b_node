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

// Crear nuevo rol
export const createRol = async ({ rol }) => {
  const [result] = await db.query(
    'INSERT INTO roles (rol) VALUES (?)',
    [rol]
  )

  return {
    idRol: result.insertId,
    rol
  }
}