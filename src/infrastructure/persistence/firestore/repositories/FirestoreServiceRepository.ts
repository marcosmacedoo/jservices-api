import { db } from '..'
import { ServiceEntity } from '../../../../domain/entities/ServiceEntity'
import { ServiceRepositoty } from '../../../../domain/repositories/ServiceRepository'
import { formatDate } from '../../../../utils/formatDate'

interface Timestamp {
    _seconds: number
    _nanoseconds: number
}

interface ServiceFirebase {
    deadline: Timestamp
    updated_at: Timestamp
    created_at: Timestamp
}

export class FirestoreServiceRepository implements ServiceRepositoty {
    private readonly collection = db.collection('services-test')

    public async getPerStatus(status: string): Promise<ServiceEntity[]> {
        const servicesRef = this.collection

        // Tratar erro de conexão com o banco
        const servicesDoc = await servicesRef
            .where('status', '==', status)
            .get()

        const services = servicesDoc.docs.map((doc) => {
            const data = doc.data() as ServiceFirebase

            return {
                ...doc.data(),
                id: doc.id,
                deadline: formatDate(data.deadline._seconds),
                updated_at: formatDate(data.updated_at._seconds),
                created_at: formatDate(data.created_at._seconds),
            }
        })

        const orderedServices = services.sort((serviceA, serviceB) =>
            serviceA.updated_at > serviceB.updated_at ? 1 : -1
        )

        return orderedServices as ServiceEntity[]
    }

    public async all(): Promise<ServiceEntity[]> {
        const servicesRef = this.collection

        // Tratar erro de conexão com o banco
        const servicesDoc = await servicesRef
            .orderBy('updated_at', 'desc')
            .get()

        const services = servicesDoc.docs.map((doc) => {
            const data = doc.data() as ServiceFirebase

            return {
                ...doc.data(),
                id: doc.id,
                deadline: formatDate(data.deadline._seconds),
                updated_at: formatDate(data.updated_at._seconds),
                created_at: formatDate(data.created_at._seconds),
            }
        })

        return services as ServiceEntity[]
    }

    public async get(idService: string): Promise<ServiceEntity | {}> {
        const serviceRef = this.collection.doc(idService)

        const serviceDoc = await serviceRef.get()

        const service = serviceDoc.data()

        return service as ServiceEntity
    }

    public async save(service: ServiceEntity): Promise<{ id: string }> {
        const serviceTemp = {
            ...service,
            created_at: new Date(),
            updated_at: new Date(),
            deadline: new Date(service.deadline),
            status: 'inProgress',
            comments: [],
        }

        const { id } = await this.collection.add(serviceTemp)

        return { id }
    }

    public async cancel(idService: string) {
        await this.collection
            .doc(idService)
            .update({ status: 'cancelado', updated_at: new Date() })
    }

    public async finished(idService: string) {
        await this.collection
            .doc(idService)
            .update({ status: 'finalizado', updated_at: new Date() })
    }

    public async comment(idService: string, commentary: string) {
        const serviceRef = this.collection.doc(idService)

        const serviceGet = await serviceRef.get()

        const serviceData = serviceGet.data() as ServiceEntity

        if (serviceData.status?.toLowerCase() === 'inProgress') {
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
