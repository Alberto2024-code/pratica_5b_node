import { Router } from 'express'
import * as ctrl from '../controllers/controller.usuarios.js'

const router = Router()

// GET /api/
router.get('/', ctrl.getAllUsuarios)

// GET /api/
router.get('/:id', ctrl.getUsuariosById)

// POST /api/
router.post('/', ctrl.createUsuario)

export default router