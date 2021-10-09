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

    public async get(idService: string): Promise<ServiceEntity | {}> {
        const serviceRef = this.collection

        const serviceDoc = await serviceRef.where('id', '==', idService).get()

        let service = {}

        serviceDoc.forEach(doc => {
            service = doc.data() as ServiceEntity
        })

        return service
    }

    public async save(service: ServiceEntity) {
        const serviceTemp = {
            ...service,
            created_at: new Date(),
            updated_at: new Date(),
            deadline: new Date(service.deadline),
            status: 'Aberto',
            comments: [],
        }

        await this.collection.add(serviceTemp)
    }

    public async cancel(idService: string) {
        await this.collection
            .doc(idService)
            .update({ status: 'cancelado', deadline: new Date() })
    }

    public async finished(idService: string) {
        await this.collection
            .doc(idService)
            .update({ status: 'finalizado', deadline: new Date() })
    }

    public async comment(idService: string, commentary: string) {
        const serviceRef = this.collection.doc(idService)

        const serviceGet = await serviceRef.get()

        const serviceData = serviceGet.data() as ServiceEntity

        if (serviceData.status?.toLowerCase() === 'aberto') {
            const { comments } = serviceData

            if (comments) {
                const newComments = [...comments, commentary]
                await serviceRef.update({ comments: newComments })
            } else {
                await serviceRef.update({ comments: [commentary] })
            }
        }
    }
}
