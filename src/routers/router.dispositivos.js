import { Router } from 'express'
import * as ctrl from '../controllers/controller.dispositivos.js'

const router = Router()

// GET /api/
router.get('/', ctrl.getAllDispositivos)

// GET /api/
router.get('/:id', ctrl.getDispositivosById)

// POST /api/
router.post('/', ctrl.createDispositivo)

export default router