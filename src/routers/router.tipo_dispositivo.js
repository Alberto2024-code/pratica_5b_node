import { Router } from 'express'
import * as ctrl from '../controllers/controller.tipo_dispositivo.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'

const router = Router()
//rutas publicas
router.get('/', ctrl.getAllTipoDispositivos);
router.get('/:id', ctrl.getTipoDispositivoById);
// rutas protegidas 
router.post('/',verificarToken, ctrl.createTipoDispositivo);
router.put('/:id',verificarToken,ctrl.updateTipoDispositivoModel);
router.delete('/:id',verificarToken,ctrl.deleteTipoDipositivoModel);

export default router