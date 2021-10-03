import { Request, Response } from 'express'
import { GetAllServicesQuery } from '../../application/query/GetAllServicesQuery'
import { FirestoreServiceRepository } from '../../infrastructure/persistence/firestore/repositories/FirestoreServiceRepository'

export class ServiceController {
    public async index(request: Request, response: Response) {
        // Utilizar o IoC Container
        const firestoreServiceRepository = new FirestoreServiceRepository()
        const query = new GetAllServicesQuery(firestoreServiceRepository)

        const services = await query.execute()

        return response.status(200).json(services)
    }
}
