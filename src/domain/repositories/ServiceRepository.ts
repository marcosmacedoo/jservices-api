import { ServiceEntity } from '../entities/ServiceEntity'

export interface ServiceRepositoty {
    all: () => Promise<ServiceEntity[]>
    getPerStatus: (status: string) => Promise<ServiceEntity[]>
    get: (idService: string) => Promise<ServiceEntity | {}>
    save: (service: ServiceEntity) => Promise<{ id: string }>
    remove: (idService: string) => void
    finished: (idService: string) => void
    comment: (idService: string, commentary: string) => void
}
