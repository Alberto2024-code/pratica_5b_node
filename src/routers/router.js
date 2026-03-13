import { Router } from 'express'
import * as ctrl from '../controllers/controller.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()

//rutas publicas
router.get('/', ctrl.getAllModelos)
router.get('/:id', ctrl.getModeloById)

//rutas proteguidas
router.post('/', verificarToken, ctrl.createModelo)
router.put('/:id', verificarToken, ctrl.updateModeloModel);
router.delete('/:id', verificarToken, ctrl.deleteModeloModel);

export default router