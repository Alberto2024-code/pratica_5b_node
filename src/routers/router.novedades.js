import { Router } from 'express'
import * as ctrl from '../controllers/controller.novedades.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()

// GET /api/
router.get('/', ctrl.getAllNovedades)

// GET /api//:id
router.get('/:id', ctrl.getNovedadesById)

// POST /api/
router.post('/',verificarToken, ctrl.createNovedad)
router.put('/:id', verificarToken, ctrl.updateNovedad);
router.delete('/:id', verificarToken, ctrl.deleteNovedad);

export default router