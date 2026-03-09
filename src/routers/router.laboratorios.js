import { Router } from 'express'
import * as ctrl from '../controllers/controllers.laboratorios.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'
const router = Router()

// GET /api/laboratorios
router.get('/', ctrl.getAllLaboratorios)

// GET /api/laboratorios/:id
router.get('/:id', ctrl.getLaboratorioById)

// POST /api/laboratorios
router.post('/', verificarToken ,ctrl.createLaboratorio)
router.put('/:id', verificarToken, ctrl.updateLaboratorio);
router.delete('/:id', verificarToken, ctrl.deleteLaboratorio);

export default router