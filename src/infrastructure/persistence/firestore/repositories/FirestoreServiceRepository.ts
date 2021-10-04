import { firestore } from 'firebase-admin'
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
        const serviceRef = this.collection.doc(idService)

        const serviceDoc = await serviceRef.get()

        const service = serviceDoc.data()

        return service as ServiceEntity
    }

    public async save(service: ServiceEntity) {
        const serviceTemp = {
            ...service,
            created_at: new Date(),
            updated_at: new Date(),
            deadline: new Date(service.deadline),
            status: 'Aberto',
            comment: [],
        }

        await this.collection.add(serviceTemp)
    }

    public async cancel(idService: string) {
        await this.collection
            .doc(idService)
            .update({ status: 'Cancelado', deadline: new Date() })
    }

    public async finished(idService: string) {
        await this.collection
            .doc(idService)
            .update({ status: 'Finalizado', deadline: new Date() })
    }
}
