import { Router } from 'express'
import * as ctrl from '../controllers/controller.marcas.js'

const router = Router()

// GET /api/
router.get('/', ctrl.getAllMarca)

// GET /api/
router.get('/:id', ctrl.getMarcasById)

// POST /api/
router.post('/', ctrl.createMarca)

export default router