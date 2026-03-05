import db from '../config/BD.js'

// Obtener todos los tipos de dispositivo
export const getAllTipoDispositivos = async () => {
  const [rows] = await db.query('SELECT * FROM tipodispositivos')
  return rows
}

// Obtener tipo de dispositivo por ID
export const getTipoDispositivoById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM tipodispositivos WHERE idTipoDispositivo = ?',
    [id]
  )
  return rows[0]
}

// Crear nuevo tipo de dispositivo
export const createTipoDispositivo = async ({ tipoDispositivo }) => {
  const [result] = await db.query(
    'INSERT INTO tipodispositivos (tipoDispositivo) VALUES (?)',
    [tipoDispositivo]
  )

  return {
    idTipoDispositivo: result.insertId,
    tipoDispositivo
  }
}