import { Router } from 'express'
import * as ctrl from '../controllers/controller.marcas.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'
const router = Router()

// rutas publicas
router.get('/', ctrl.getAllMarca)
router.get('/:id', ctrl.getMarcasById)

// rutas protegidas
router.post('/',verificarToken, ctrl.createMarca)
router.put('/:id', verificarToken, ctrl.updateMarca);
router.delete('/:id', verificarToken, ctrl.deleteMarca);

export default router