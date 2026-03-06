import express from 'express'
import cors from 'cors'

import modelosRouter from './routers/router.js'
import laboratoriosRouter from './routers/router.laboratorios.js' 
import dispositivosRouter from './routers/router.dispositivos.js'
import marcaRouter from './routers/router.marca.js'
import NovedadesRouter from './routers/router.novedades.js'
import orde_dispositivoRouter from './routers/router.orden_dispositivo.js'
import ordenesRouter from './routers/router.ordenes.js'
import rolesRouter from './routers/router.roles.js'
import tipo_dispositivoRouter from './routers/router.tipo_dispositivo.js'
import tipo_matenimientoRouter from './routers/router.tipo_mantenimiento.js'
import usuariosRouter from './routers/router.usuarios.js'

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// rutas
app.use('/api/modelos', modelosRouter)
app.use('/api/laboratorios', laboratoriosRouter) 
app.use('/api/dispositivos', dispositivosRouter)
app.use('/api/marcas', marcaRouter)
app.use('/api/novedades', NovedadesRouter)
app.use('/api/orden_dispositivo', orde_dispositivoRouter)
app.use('/api/ordenes', ordenesRouter)
app.use('/api/roles', rolesRouter)
app.use('/api/tipo_dispositivo', tipo_dispositivoRouter)
app.use('/api/tipomantenimientos', tipo_matenimientoRouter)
app.use('/api/usuarios', usuariosRouter)

app.get('/', (req, res) => {
  res.send('API de mantenimiento funcionando correctamente ')
})

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000')
})
