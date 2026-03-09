import { Router } from 'express'
import * as ctrl from '../controllers/controller.marcas.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'
const router = Router()

// GET /api/
router.get('/', ctrl.getAllMarca)

// GET /api/
router.get('/:id', ctrl.getMarcasById)

// POST /api/
router.post('/',verificarToken, ctrl.createMarca)
router.put('/:id', verificarToken, ctrl.updateMarca);
router.delete('/:id', verificarToken, ctrl.deleteMarca);

export default router