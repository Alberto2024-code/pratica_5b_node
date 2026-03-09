import { Router } from 'express'
import { verificarToken } from '../middlewares/middlewares.auth.js'
import * as ctrl from '../controllers/controller.usuarios.js'


const router = Router()

// --- RUTAS PÚBLICAS ---

router.get('/',ctrl.getAllUsuarios)

// Obtener un usuario por ID
router.get('/:id',  ctrl.getUsuariosById)


// Rutas Protegidas (Escritura/Borrado)
router.post('/', verificarToken, ctrl.createUsuario);
router.put('/:id', verificarToken, ctrl.updateUsuarioModel);
router.delete('/:id', verificarToken, ctrl.deleteUsuarioModel);

export default router