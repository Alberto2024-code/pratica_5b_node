import { Router } from "express";
import * as ctrl from '../controllers/controllers.ordenDeTrabajo.js';
import { verificarToken } from "../middlewares/middlewares.auth.js";

const router = Router();

// rutas publicas

// Obtener la lista de todas las órdenes (vista general)
router.get('/', ctrl.getAllOrdenes);
//Obtener el detalle de una orden específica (Aquí es donde el Controlador usa el HELPER)
router.get('/:id', ctrl.getOrdenCompleta); 


//rutas protegidas 
//Crear la cabecera de la orden (Primero se crea la orden vacía)
router.post('/', verificarToken, ctrl.createOrden);
//Agregar dispositivos a esa orden (Se usa el ID de la orden en la URL)
router.post('/:id/dispositivos', verificarToken, ctrl.postDispositivoAOrden);

//Cambiar el estado (espera, proceso, terminado)
router.patch('/:id/estado', verificarToken, ctrl.patchEstado);

//Obtener datos estructurados para el PDF
router.get('/:id/pdf', verificarToken, ctrl.getOrdenCompleta); 

//Consultar qué dispositivos hay en un laboratorio (Para saber qué agregar)
router.get('/laboratorios/:id/dispositivos', verificarToken, ctrl.getDispositivosByLaboratorio);

export default router;