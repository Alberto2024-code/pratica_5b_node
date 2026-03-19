import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import * as usuarioModel from '../models/models.usuarios.js';

dotenv.config();

export const register = async (req, res) => {
    try {
        // 1. Extraemos TODOS los campos del body
        const { 
            idRol, 
            nombreUsuario, 
            apellidoPaterno, 
            apellidoMaterno, 
            matricula, 
            contrasena, 
            telefono 
        } = req.body;
        
        // 2. Validación: Verifica que el nombre no venga vacío
        if (!matricula || !contrasena || !idRol || !nombreUsuario) {
            return res.status(400).json({ message: 'Nombre, Matrícula, Contraseña e idRol son obligatorios' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(contrasena, salt);

        // 3. ENVIAMOS LAS VARIABLES REALES (no comillas vacías)
        const nuevoUsuario = await usuarioModel.createUsuario({
            idRol,
            nombreUsuario,
            apellidoPaterno,
            apellidoMaterno,
            matricula,
            contrasena: passwordHash,
            estado: 'Activo',
            telefono
        }); 
        
        // 4. Respondemos con el objeto creado (esto sirve para tu evidencia)
        res.status(201).json({ 
            message: 'Usuario creado con éxito', 
            usuario: nuevoUsuario 
        });

    } catch (error) {
        // Manejo específico para las pruebas PA-24 y PA-25 (Duplicados)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "La matrícula ya existe en el sistema" });
        }
        console.error(error);
        res.status(500).json({ error: 'Error interno en el servidor' });
    }
};

export const login = async (req, res) => {
    try {
        const { matricula, contrasena } = req.body; 
        
        const usuario = await usuarioModel.findUsuarioByMatricula(matricula);
        
        console.log("Datos del usuario encontrado:", usuario);
        
        // Corregido el mensaje de "validas" a "inválidas"
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales invalidas :) ' });
        }
        // Aqui mira en esta validadcion 
        const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
       
        if (!esValida) {
            return res.status(401).json({ message: 'Credenciales inválidas :(' });
        }
         
         const token = jwt.sign(
            { 
                id: usuario.idUsuario, 
                matricula: usuario.matricula, 
                rol: usuario.idRol,
                nombre: usuario.nombreUsuario
            },
            process.env.JWT_SECRET || 'clave_temporal_pruebas', // Si no halla la env, usa el string,
            { expiresIn: '8h' }
        );

        res.json({ 
            token, 
            usuario: { id: usuario.idUsuario, rol: usuario.idRol, matricula: usuario.matricula, nombre: usuario.nombreUsuario} 
        });

    } catch (error) {
        console.error("ALERTA DE ERROR EN LOGIN:"); // Esto DEBE aparecer en Vercel
    console.error(error); 
    res.status(500).json({ 
        message: "Error interno", 
        error: error.message, // Esto le llegará a Dylan en su consola
        stack: error.stack 
    });
    }
};