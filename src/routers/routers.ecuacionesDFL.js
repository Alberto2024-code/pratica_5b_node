import { Router } from 'express'
import { verificarToken } from '../middlewares/middlewares.auth.js'
import * as ctrl from '../controllers/controler.ecuacionesDFL.js'

const router = Router()

// --- RUTAS PÚBLICAS ---
//pregunta 1
router.get('/prediccion/:id', ctrl.GetEcuaciones);
//pregunta 2
router.get('/prioridad-laboratorios', ctrl.getPrioridadLaboratorios);


export default router