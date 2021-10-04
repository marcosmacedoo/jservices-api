import { Request, Response } from 'express'
import { CancelServiceCommand } from '../../application/command/CancelServiceCommand'
import { CommentServiceCommand } from '../../application/command/CommentServiceCommand'
import { FinishedServiceCommand } from '../../application/command/FinishedServiceCommand'
import { SaveServiceCommand } from '../../application/command/SaveServiceCommand'
import { GetAllServicesQuery } from '../../application/query/GetAllServicesQuery'
import { GetServiceQuery } from '../../application/query/GetServiceQuery'
import { ServiceEntity } from '../../domain/entities/ServiceEntity'
import { FirestoreServiceRepository } from '../../infrastructure/persistence/firestore/repositories/FirestoreServiceRepository'

interface ResponseMessage {
    success?: string
    error?: string
}

export class ServiceController {
    public async index(request: Request, response: Response) {
        // Utilizar o IoC Container
        const firestoreServiceRepository = new FirestoreServiceRepository()
        const query = new GetAllServicesQuery(firestoreServiceRepository)

        const services = await query.execute()

        return response.status(200).json(services)
    }

    public async show(request: Request, response: Response) {
        const { idService } = request.params as { idService: string }

        const firestoreServiceRepository = new FirestoreServiceRepository()
        const query = new GetServiceQuery(firestoreServiceRepository)

        const service = await query.execute(idService)

        return response.status(200).json(service)
    }

    public async create(request: Request, response: Response) {
        const service = request.body as ServiceEntity
        const responseMessage: ResponseMessage = {}

        const firestoreServiceRepository = new FirestoreServiceRepository()
        const commandSaveService = new SaveServiceCommand(
            firestoreServiceRepository
        )

        try {
            await commandSaveService.execute(service)

            responseMessage.success = 'Created service'

            return response.status(201).json(responseMessage)
        } catch {
            responseMessage.error = 'Failed to create service'

            return response.status(400).json(responseMessage)
        }
    }

    public async editStatusToCancel(request: Request, response: Response) {
        const { idService } = request.params as { idService: string }
        const responseMessage: ResponseMessage = {}

        const firestoreServiceRepository = new FirestoreServiceRepository()
        const commandCancelService = new CancelServiceCommand(
            firestoreServiceRepository
        )

        try {
            await commandCancelService.execute(idService)

            responseMessage.success = 'Created service'

            return response.status(200).json(responseMessage)
        } catch {
            responseMessage.error = 'Failed to create service'

            return response.status(400).json(responseMessage)
        }
    }

    public async editStatusToFinished(request: Request, response: Response) {
        const { idService } = request.params as { idService: string }
        const responseMessage: ResponseMessage = {}

        const firestoreServiceRepository = new FirestoreServiceRepository()
        const commandFinishedService = new FinishedServiceCommand(
            firestoreServiceRepository
        )

        try {
            await commandFinishedService.execute(idService)

            responseMessage.success = 'Created service'

            return response.status(200).json(responseMessage)
        } catch {
            responseMessage.error = 'Failed to create service'

            return response.status(400).json(responseMessage)
        }
    }

    public async editComments(request: Request, response: Response) {
        const { idService } = request.params as { idService: string }
        const { commentary } = request.body as { commentary: string }
        const responseMessage: ResponseMessage = {}

        const firestoreServiceRepository = new FirestoreServiceRepository()
        const commandCommentService = new CommentServiceCommand(
            firestoreServiceRepository
        )

        try {
            await commandCommentService.execute(idService, commentary)

            responseMessage.success = 'Created service'

            return response.status(200).json(responseMessage)
        } catch {
            responseMessage.error = 'Failed to create service'

            return response.status(400).json(responseMessage)
        }
    }
}
