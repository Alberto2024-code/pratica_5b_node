import { Router } from 'express'
import * as ctrl from '../controllers/controller.tipo_mantenimiendo.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()

// GET /api/laboratorios
router.get('/', ctrl.getAllTipoMantenimiento)

// GET /api/laboratorios/:id
router.get('/:id', ctrl.getTipoMantenimientoById)

// POST /api/laboratorios
router.post('/',verificarToken, ctrl.createTipoMantenimiento)


export default router