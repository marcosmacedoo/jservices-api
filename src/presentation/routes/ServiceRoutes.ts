import { Router } from 'express'
import { ServiceController } from '../controllers/ServiceController'

const serviceRoutes = Router()
const serviceController = new ServiceController()

serviceRoutes.get('/services', serviceController.index)
serviceRoutes.get('/services/:idService', serviceController.show)
serviceRoutes.post('/services', serviceController.create)
serviceRoutes.put(
    '/services/:idService/edit/status/cancel',
    serviceController.editStatusToCancel
)
serviceRoutes.put(
    '/services/:idService/edit/status/finished',
    serviceController.editStatusToFinished
)
serviceRoutes.put(
    '/services/:idService/edit/comments/',
    serviceController.editComments
)

export default serviceRoutes
