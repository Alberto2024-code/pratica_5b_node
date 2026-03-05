import { Router } from 'express'
import * as ctrl from '../controllers//controller.orden_dispositivo.js'

const router = Router()

// GET /api/
router.get('/', ctrl.getAllOrdenDispositivos)

// GET /api/
router.get('/:id', ctrl.getOrdenDispositivoById)

// POST /api/
router.post('/', ctrl.createOrdenDispositivo)

export default router