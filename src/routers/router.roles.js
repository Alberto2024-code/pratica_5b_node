import { Router } from 'express'
import * as ctrl from '../controllers/controller.roles.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()

router.get('/', ctrl.getAllRoles);
router.get('/:id', ctrl.getRolById);
//....................
router.post('/',verificarToken, ctrl.createRol);
router.put('/:id', verificarToken, ctrl.updateRol);
router.delete('/:id', verificarToken, ctrl.deleteRol);


export default router