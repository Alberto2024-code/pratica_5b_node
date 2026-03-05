import { Router } from 'express'
import * as ctrl from '../controllers/controllers.laboratorios.js'

const router = Router()

// GET /api/laboratorios
router.get('/', ctrl.getAllLaboratorios)

// GET /api/laboratorios/:id
router.get('/:id', ctrl.getLaboratorioById)

// POST /api/laboratorios
router.post('/', ctrl.createLaboratorio)

export default router