import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import * as usuarioModel from '../models/models.usuarios.js';

export const register = async(req,res)=>{

    try{
        const {matricula,contrasena} = req.body;
        if(!matricula || !contrasena) return res.status(404).json({ message: 'Todos los campos son obligatorios'});

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(contrasena,salt);

        const nuevoId = await usuarioModel.createUsuario(matricula,passwordHash);
        res.status(201).json({ message:'Usuario creado con exito',id: nuevoId});
    }catch(error)
    {
        res.status(500).json({ error:'Error interno en el servidor'});

    }
}
export const login = async(req,res)=>{
    try{
        const {matricula,contrasena}= req.body;
        const usuario = await usuarioModel.findUsuarioByMatricula(matricula);
        if(!usuario) return res.status(401).json({ message:'Credenciales validas'});

        const esValida = await bcrypt.compare(contrasena,usuario.contrasena);
        if(!esValida)return res.status(401).json({ message: 'Credenciales invalidas'});

        const token = jwt.sign(
            {
                id:usuario.idUsuario,matricula: usuario.matricula,rol:usuario.idRol},
                process.env.JWT_SECRET,
                {expiresIn:'8h'}


        );

        res.json({token,usuario:{id: usuario.idUsuario, rol:usuario.idRol}});
    }catch(error){
        res.status(500).json({ error: 'Error en el proceso del login'})
    }
}