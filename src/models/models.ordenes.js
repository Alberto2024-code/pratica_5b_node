import db from '../config/BD.js'

// Obtener todas las órdenes
export const getAllOrdenes = async () => {
  const [rows] = await db.query(`
    SELECT 
        o.idOrden, 
        u.nombreUsuario,
        l.idLaboratorio, 
        l.nombreLaboratorio, 
        o.estado, 
        o.insumos, 
        o.horasHombre
    FROM ordenes o
    INNER JOIN usuarios u ON o.idUsuario = u.idUsuario
    INNER JOIN laboratorios l ON o.idLaboratorio = l.idLaboratorio
  `)
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
export const createOrden = async ({ idUsuario,idLaboratorio,estado,insumos,fechaCreacion,horasHombre}) => {
  const [result] = await db.query(
    `INSERT INTO ordenes 
     (idUsuario, idLaboratorio, estado, insumos,fechaCreacion,horasHombre)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      idUsuario,
      idLaboratorio,
      estado || 'espera',
      insumos || null,
      fechaCreacion || new Date(),
      horasHombre || null
    ]
  )

  return {
    idOrden: result.insertId,
    idUsuario,
    idLaboratorio,
    estado: estado || 'espera',
    insumos,
    fechaCreacion,
    horasHombre
  }
}
// Actualizar Orden
export const updateOrdenModel = async (id, datos) => {
    const { idUsuario, idLaboratorio, estado, insumos, horasHombre } = datos;
    const [result] = await db.query(
        `UPDATE ordenes SET 
         idUsuario = ?, 
         idLaboratorio = ?, 
         estado = ?, 
         insumos = ?, 
         horasHombre = ? 
         WHERE idOrden = ?`,
        [idUsuario, idLaboratorio, estado, insumos, horasHombre, id]
    );
    return result;
};
//esta esta en processo ahun nose aprueba su uso
export const crearOrdenMantenimientoCompleta = async (datos) => {
    const { idUsuario, idLaboratorio, idDispositivo, idTipoMantenimiento } = datos;
  
    const connection = await db.getConnection(); 
    
    try {
        await connection.beginTransaction();
        const [resOrden] = await connection.query(
            'INSERT INTO ordenes(fechaCreacion, idUsuario, idLaboratorio, estado) VALUES (NOW(), ?, ?, "EN PROCESO")',
            [idUsuario, idLaboratorio]
        );
        
        const nuevoIdOrden = resOrden.insertId; 
        await connection.query(
            'INSERT INTO orden_dispositivos(idOrden, idDispositivo, idTipoMantenimiento, realizado) VALUES (?, ?, ?, "No")',
            [nuevoIdOrden, idDispositivo, idTipoMantenimiento]
        );

        await connection.commit(); 
        return { success: true, idOrden: nuevoIdOrden };

    } catch (error) {
        await connection.rollback(); 
        throw error;
    } finally {
        connection.release(); 
    }
};

export const updateInsumos = async(id,datos)=>
  {
    const{insumos}=datos;
    const[result]= await db.query('UPDATE ordenes SET insumos=? WHERE idOrden = ?'[insumos,id]);
    return  result;
  }

// Eliminar Orden
export const deleteOrdenModel = async (id) => {
    const [result] = await db.query(
        'DELETE FROM ordenes WHERE idOrden = ?',
        [id]
    );
    return result;
};
