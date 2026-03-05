import { Router } from 'express'
import * as ctrl from '../controllers/controller.tipo_dispositivo.js'

const router = Router()

router.get('/', ctrl.getAllTipoDispositivos)
router.get('/:id', ctrl.getTipoDispositivoById)
router.post('/', ctrl.createTipoDispositivo)

export default router