import db from '../config/BD.js'
//funcion que permite consultar lo que tiene registrado la api 
export const getAllUsuarios= async ()=>{
    const [rows]= await db.query(`
    SELECT 
        u.idUsuario, 
        u.nombreUsuario,
        u.apellidoPaterno,
        u.apellidoMaterno,
        u.matricula,
        u.contrasena,
        r.Rol AS rol,
        r.idRol,
        u.estado,
        u.telefono
    FROM usuarios u
    INNER JOIN roles r ON u.idRol = r.idRol
  `)
    return rows
}

//fruncion que permite al usuario del fronend poder buscar un dispositivo por medio de id
export const getUsuariosById = async (id) => { const [rows] = await db.query(
    'SELECT * FROM usuarios WHERE idUsuario = ?',
    [id]
  )
  return rows[0]
}
// crea un usuario nuevo para la api
export const createUsuario = async({idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, contrasena, estado, telefono}) => {
    
    const [result] = await db.query(
        'INSERT INTO usuarios (idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, contrasena, estado, telefono) VALUES (?,?,?,?,?,?,?,?)',
        [idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, contrasena, estado, telefono]
    )
    return {
        idUsuario: result.insertId, 
        idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, contrasena, estado, telefono
    }
}

export const  findUsuarioByMatricula = async (matricula) => {

const [rows] = await db.query(
'SELECT idUsuario, matricula, contrasena, idRol FROM usuarios WHERE matricula = ?',
[matricula]
)
return rows[0]
}
// Función para actualizar los datos del usuario
export const updateUsuarioModel = async (id, datos) => {
   
    if(!datos || Object.keys(datos).length==0)
        {
            console.warn("Intento de actualización fallido: El objeto de datos está vacío.");
            return null;
        }
   
    const { idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, estado, telefono } = datos;
    const [result] = await db.query(
        'UPDATE usuarios SET idRol=?, nombreUsuario=?, apellidoPaterno=?, apellidoMaterno=?, matricula=?, estado=?,telefono=? WHERE idUsuario=?',
        [idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, estado, telefono, id]
    );
    return result;
};

// Función para eliminar físicamente al usuario
export const deleteUsuarioModel = async (id) => {
    const [result] = await db.query(
        'DELETE FROM usuarios WHERE idUsuario = ?', 
        [id]
    );
    return result;
};
//agregar el json yol token  a la api y agregar los inner join 
