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


export const getUsuariosById = async (id) => { const [rows] = await db.query(
    'SELECT * FROM usuarios WHERE idUsuario = ?',
    [id]
  )
  return rows[0]
}
// crea un usuario nuevo para la api
// Opción recomendada: recibe un solo objeto llamado 'datos'
export const createUsuario = async (datos) => {
    // 1. Extraemos todo de 'datos'
    const { idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, contrasena, estado, telefono } = datos;

    // 2. Ejecutamos la consulta
    const [result] = await db.query(
        'INSERT INTO usuarios (idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, contrasena, estado, telefono) VALUES (?,?,?,?,?,?,?,?)',
        [idRol, nombreUsuario, apellidoPaterno, apellidoMaterno, matricula, contrasena, estado || 1, telefono]
    );

    // 3. Retornamos la respuesta limpia
    return {
        idUsuario: result.insertId, 
        ...datos // Esto incluye todos los campos automáticamente
    };
};

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


//se implento una vista para usuarios
export const vistasUsuariosModel= async()=>
    {
        const[rows]= await db.query(`SELECT * FROM v_estadisticas_tecnicos`);
        return rows;
    } 
export const process_Tecnico = async()=>
    {
        const[rows] = await bd.query('CALL sp_RegistrarTecnico(?,?,?,?,?,?)',[nombre, ap, am, mat, pass, tel]);
        return rows;
    }

