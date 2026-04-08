import { Router } from 'express';
import * as ctrl from '../controllers/controler.ecuacionesDFL.js';

const router = Router();

router.get('/prediccion/:id', ctrl.GetEcuaciones);
router.get('/prioridad-laboratorios', ctrl.getPrioridadLaboratorios);

export default router;