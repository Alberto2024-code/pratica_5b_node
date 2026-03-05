import { Router } from 'express'
import * as ctrl from '../controllers/controller.novedades.js'

const router = Router()

// GET /api/
router.get('/', ctrl.getAllNovedades)

// GET /api//:id
router.get('/:id', ctrl.getNovedadesById)

// POST /api/
router.post('/', ctrl.createNovedad)

export default router