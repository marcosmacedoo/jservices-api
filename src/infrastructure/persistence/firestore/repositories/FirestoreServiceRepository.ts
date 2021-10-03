import { response } from 'express'
import { db } from '..'
import { ServiceEntity } from '../../../../domain/entities/ServiceEntity'
import { ServiceRepositoty } from '../../../../domain/repositories/ServiceRepository'

export class FirestoreServiceRepository implements ServiceRepositoty {
    private readonly collection = db.collection('services')

    public async all(): Promise<ServiceEntity[]> {
        const servicesRef = this.collection

        // Tratar erro de conexão com o banco
        const servicesDoc = await servicesRef.get()

        const services = servicesDoc.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            }
        })

        return services as ServiceEntity[]
    }

    public async get(idService: string): Promise<ServiceEntity> {
        const servicesRef = this.collection.doc(idService)

        const servicesDoc = await servicesRef.get()

        const service = servicesDoc.data()

        return service as ServiceEntity
    }

    public async save(service: ServiceEntity) {
        service.created_at = new Date()
        service.status = 'Aberto'
        const servicesRef = await this.collection.add(service)
    }
}
