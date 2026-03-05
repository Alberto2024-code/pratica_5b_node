import { Router } from 'express'
import * as ctrl from '../controllers/controller.ordenes.js'

const router = Router()

router.get('/', ctrl.getAllOrdenes)

router.get('/:id', ctrl.getOrdenById)

router.post('/', ctrl.createOrden)

export default router