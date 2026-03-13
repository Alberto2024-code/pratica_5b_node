import { Router } from 'express'
import * as ctrl from '../controllers/controllers.laboratorios.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'
const router = Router()

// rutas publicas
router.get('/', ctrl.getAllLaboratorios)
router.get('/:id', ctrl.getLaboratorioById)

// rutas protegidas
router.post('/', verificarToken ,ctrl.createLaboratorio)
router.put('/:id', verificarToken, ctrl.updateLaboratorio);
router.delete('/:id', verificarToken, ctrl.deleteLaboratorio);

export default router