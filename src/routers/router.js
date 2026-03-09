import { Router } from 'express'
import * as ctrl from '../controllers/controller.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()

// GET /api/modelos
router.get('/', ctrl.getAllModelos)

// GET /api/modelos/:id
router.get('/:id', ctrl.getModeloById)

// POST /api/modelos
router.post('/', verificarToken, ctrl.createModelo)

router.put('/:id', verificarToken, ctrl.updateUsuarioModel);
router.delete('/:id', verificarToken, ctrl.deleteUsuarioModel);

export default router