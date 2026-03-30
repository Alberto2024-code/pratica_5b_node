import { Router } from "express";
import * as ctrl from '../controllers/controllers.ordenDeTrabajo.js';
import { verificarToken } from "../middlewares/middlewares.auth.js";

const router = Router();

// rutas publicas
router.get('/', ctrl.getAllOrdenes);
router.get('/:id', ctrl.getOrdenCompleta); 


//rutas protegidas 
router.post('/', verificarToken, ctrl.createOrden);
router.post('/:id/dispositivos', verificarToken, ctrl.postDispositivoAOrden);
router.patch('/:id/estado', verificarToken, ctrl.patchEstado);
router.patch('/:id/estado',verificarToken,ctrl.updateEstado);
router.patch('/:id/horasHombre',verificarToken,ctrl.updateHorasHombre);
router.patch('/:id/insumos',verificarToken,ctrl.updateInsumos);
router.get('/:id/pdf',ctrl.getOrdenCompleta); 
router.get('/laboratorios/:id/dispositivos', verificarToken, ctrl.getDispositivosByLaboratorio);

export default router;