import { Request, Response } from 'express'
import { CancelServiceCommand } from '../../application/command/CancelServiceCommand'
import { SaveServiceCommand } from '../../application/command/SaveServiceCommand'
import { GetAllServicesQuery } from '../../application/query/GetAllServicesQuery'
import { GetServiceQuery } from '../../application/query/GetServiceQuery'
import { ServiceEntity } from '../../domain/entities/ServiceEntity'
import { FirestoreServiceRepository } from '../../infrastructure/persistence/firestore/repositories/FirestoreServiceRepository'

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

        const firestoreServiceRepository = new FirestoreServiceRepository()
        const commandSaveService = new SaveServiceCommand(
            firestoreServiceRepository
        )

        await commandSaveService.execute(service)

        return response.status(201).json(service)
    }

    public async editStatusToCancel(request: Request, response: Response) {
        const { idService } = request.params as { idService: string }

        const firestoreServiceRepository = new FirestoreServiceRepository()
        const commandCancelService = new CancelServiceCommand(
            firestoreServiceRepository
        )

        const service = await commandCancelService.execute(idService)

        return response.status(200).json(service)
    }
}
