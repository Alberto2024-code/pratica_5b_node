import { Router } from 'express'
import * as ctrl from '../controllers/controller.ordenes.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()

//rutas publicas
router.get('/', ctrl.getAllOrdenes)
router.get('/:id', ctrl.getOrdenById)
//rutas protegidas
router.post('/',verificarToken, ctrl.createOrden)
router.put('/:id', verificarToken, ctrl.updateOrden);
router.delete('/:id', verificarToken, ctrl.deleteOrden);

export default router