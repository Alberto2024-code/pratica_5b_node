import { Router } from 'express'
import * as ctrl from '../controllers/controller.novedades.js'
// import { verificarToken } from '../middlewares/middlewares.auth.js'
import {upload} from '../config/Cloudynary.js'
const router = Router()

// rutas publicas 
router.get('/', ctrl.getAllNovedades);
router.get('/:id', ctrl.getNovedadesById);

// rutas privadas 
router.post('/', upload.single('imagen'),ctrl.createNovedad);

export default router