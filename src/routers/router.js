import { Router } from 'express'
import * as ctrl from '../controllers/controller.js'

const router = Router()

// GET /api/modelos
router.get('/', ctrl.getAllModelos)

// GET /api/modelos/:id
router.get('/:id', ctrl.getModeloById)

// POST /api/modelos
router.post('/', ctrl.createModelo)

export default router