import { Router } from 'express'
import * as ctrl from '../controllers//controller.orden_dispositivo.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()

// GET /api/
router.get('/', ctrl.getAllOrdenDispositivos)

// GET /api/
router.get('/:id', ctrl.getOrdenDispositivoById)

// POST /api/
router.post('/', verificarToken, ctrl.createOrdenDispositivo)
router.put('/:id', verificarToken, ctrl.updateOrdenDispositivo);
router.delete('/:id', verificarToken, ctrl.deleteOrdenDispositivo);

export default router