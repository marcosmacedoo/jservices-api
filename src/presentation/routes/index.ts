import { Router } from 'express'
import serviceRoutes from './ServiceRoutes'

const routes = Router()

routes.use(serviceRoutes)

export default routes
