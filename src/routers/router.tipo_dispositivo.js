import { Router } from 'express'
import * as ctrl from '../controllers/controller.tipo_dispositivo.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()

router.get('/', ctrl.getAllTipoDispositivos);
router.get('/:id', ctrl.getTipoDispositivoById);
// verificacion de tokens
router.post('/',verificarToken, ctrl.createTipoDispositivo);


export default router