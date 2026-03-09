import { json } from 'express';
import jwt from 'jsonwebtoken'

export const verificarToken = (req,res,next)=>
    {
        const authHeader = req.headers['authorization'];

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message:'Acceso denegado token requerido'});
        }

        const  token = authHeader.split(' ')[1];

        try {
            const Verificado = jwt.verify(token,process.env.JWT_SECRET);
            req.usuario = Verificado;
            next();
        }catch(error){
            res.status(403).json({message:'Token no valido o expirado'});
        }
    };