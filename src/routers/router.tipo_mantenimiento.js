import { Router } from 'express'
import * as ctrl from '../controllers/controller.tipo_mantenimiendo.js'

const router = Router()

// GET /api/laboratorios
router.get('/', ctrl.getAllTipoMantenimiento)

// GET /api/laboratorios/:id
router.get('/:id', ctrl.getTipoMantenimientoById)

// POST /api/laboratorios
router.post('/', ctrl.createTipoMantenimiento)

export default router