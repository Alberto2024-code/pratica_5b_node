import db from '../config/BD.js'

export const getAllUsuarios= async ()=>{
    const [rows]= await db.query('select * from usuarios')
    return rows
}

// Obtener modelo por ID
export const getUsuariosById = async (id) => { const [rows] = await db.query(
    'SELECT * FROM usuarios WHERE idUsuario = ?',
    [id]
  )
  return rows[0]
}

export const createUsuario = async({idUsuario,idRol,nombreUsuario,apellidoPaterno,apellidomaterno,matricula,contrasena,estado,telefono})=>{
    const [restult]=await db.query(
        'INSERT INTO usuarios(idUsuario,idRol,nombreUsuario,apellidoPaterno,apellidomaterno,matricula,contrasena,estado,telefono) values (?,?)'
        ,[idUsuario,idRol,nombreUsuario,apellidoPaterno,apellidomaterno,matricula,contrasena,estado,telefono])
    return {
        idUsuario: restult.insertId,idRol,
        nombreUsuario,
        apellidoPaterno,
        apellidomaterno,
        matricula,
        contrasena,
        estado,
        telefono
    }
}
