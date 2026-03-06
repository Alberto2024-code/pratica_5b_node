import db from '../config/BD.js'

// Obtener todas las órdenes
export const getAllOrdenes = async () => {
  const [rows] = await db.query('SELECT * FROM ordenes')
  return rows
}

// Obtener orden por ID
export const getOrdenById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM ordenes WHERE idOrden = ?',
    [id]
  )
  return rows[0]
}

// Crear nueva orden
export const createOrden = async ({ idUsuario,idLaboratorio,estado,insumos,horasHombre}) => {
  const [result] = await db.query(
    `INSERT INTO ordenes 
     (idUsuario, idLaboratorio, estado, insumos, horasHombre)
     VALUES (?, ?, ?, ?, ?)`,
    [
      idUsuario ,
      idLaboratorio,
      estado || 'espera',
      insumos || null,
      horasHombre || null
    ]
  )

  return {
    idOrden: result.insertId,
    idUsuario,
    idLaboratorio,
    estado: estado || 'espera',
    insumos,
    horasHombre
  }
}