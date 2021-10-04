// GET ('/services') => retorna todos os serviços
// POST ('/services') => cria um novo serviço
// GET ('/services/:id') => retorna somente um serviço de acordo com o id
// PUT ('/services/:id/cancelar') => cancelar o serviço de acordo com o id
// PUT ('/services/:id/finalizar') => finalizar o serviço de acordo com o id
// PUT ('/services/:id/comentar') => cria um novo comentário no serviço de acordo com id
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

export default serviceRoutes
