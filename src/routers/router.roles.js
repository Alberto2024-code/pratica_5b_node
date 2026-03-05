import { Router } from 'express'
import * as ctrl from '../controllers/controller.roles.js'

const router = Router()

router.get('/', ctrl.getAllRoles)
router.get('/:id', ctrl.getRolById)
router.post('/', ctrl.createRol)

export default router