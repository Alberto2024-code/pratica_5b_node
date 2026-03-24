import { Router } from 'express'
import * as ctrl from '../controllers/controller.dispositivos.js'
import { verificarToken } from '../middlewares/middlewares.auth.js'
const router = Router()

// rutas publicas 
router.get('/', ctrl.getAllDispositivos);
router.get('/:id', ctrl.getDispositivosById);
router.get('/laboratorio/:id', ctrl.getByLaboratorio);
//rutas proteguidas 
router.post('/',verificarToken, ctrl.createDispositivo);
router.put('/:id',verificarToken,ctrl.updateDispositivosModel);
router.delete('/:id', verificarToken,ctrl.deleteDispositivosModel);


export default router