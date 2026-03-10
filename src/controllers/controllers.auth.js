import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; // Cambiado de 'env' a 'dotenv'
import * as usuarioModel from '../models/models.usuarios.js';

dotenv.config();

export const register = async (req, res) => {
    try {
        const { matricula, contrasena, idRol } = req.body;
        
        // Es mejor usar 400 (Bad Request) para campos faltantes
        if (!matricula || !contrasena || !idRol) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(contrasena, salt);


        
        // ¡IMPORTANTE!: Pasa el idRol aquí para que se guarde en la BD
        const nuevoId = await usuarioModel.createUsuario({idRol,matricula,contrasena: passwordHash,nombreUsuario:'', apellidoPaterno:'',apellidoMaterno: '',estado:'Activo',telefono:''}); 
        
        res.status(201).json({ message: 'Usuario creado con éxito', id: nuevoId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno en el servidor' });
    }
};

export const login = async (req, res) => {
    try {
        const { matricula, contrasena, idRol } = req.body; // Extrae idRol también
        
        const usuario = await usuarioModel.findUsuarioByMatricula(matricula);
        
        // Corregido el mensaje de "validas" a "inválidas"
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esValida) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Validación de Rol que agregaste (¡Muy bien!)
        if (usuario.idRol != idRol) {
            return res.status(401).json({ 
                message: 'El rol seleccionado no corresponde al usuario' 
            });
        }

        const token = jwt.sign(
            { 
                id: usuario.idUsuario, 
                matricula: usuario.matricula, 
                rol: usuario.idRol 
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ 
            token, 
            usuario: { id: usuario.idUsuario, rol: usuario.idRol } 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el proceso del login' });
    }
};