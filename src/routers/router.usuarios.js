import { Router } from 'express'
import { verificarToken } from '../middlewares/middlewares.auth.js'
import * as ctrl from '../controllers/controller.usuarios.js'


const router = Router()

// --- RUTAS PÚBLICAS ---
router.get('/',ctrl.getAllUsuarios);
router.get('/:id',  ctrl.getUsuariosById);
router.get('/vistaUsuario', ctrl.vistasUsuariosModel);
router.post('/tecnico', ctrl.process_Tecnico);

// Rutas Protegidas 
router.post('/', ctrl.createUsuario);
router.put('/:id', verificarToken, ctrl.updateUsuarioModel);
router.delete('/:id', verificarToken, ctrl.deleteUsuarioModel);


export default router