import { Request, Response } from 'express'
import { GetAllServicesQuery } from '../../application/query/GetAllServicesQuery'
import { GetServiceQuery } from '../../application/query/GetServiceQuery'
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
        const firestoreServiceRepository = new FirestoreServiceRepository()
        // const query = new (firestoreServiceRepository)

        return response.status(201).json()
    }
}
