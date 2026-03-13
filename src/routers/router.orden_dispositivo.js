import { Router } from 'express'
import * as ctrl from '../controllers//controller.orden_dispositivo.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()

// rutas publicas
router.get('/', ctrl.getAllOrdenDispositivos)
router.get('/:id', ctrl.getOrdenDispositivoById)

// rutas protegidas
router.post('/', verificarToken, ctrl.createOrdenDispositivo)
router.put('/:id', verificarToken, ctrl.updateOrdenDispositivo);
router.delete('/:id', verificarToken, ctrl.deleteOrdenDispositivo);

export default router