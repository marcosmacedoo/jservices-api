import { ServiceEntity } from '../entities/ServiceEntity'

export interface ServiceRepositoty {
    all: () => Promise<ServiceEntity[]>
    // get: (idService: string) => Promise<ServiceEntity>
    // save: (service: ServiceEntity) => Promise<ServiceEntity>
    // cancel: (idService: string) => Promise<ServiceEntity>
    // finished: (idService: string) => Promise<ServiceEntity>
    // comment: (idService: string, commentary: string) => Promise<ServiceEntity>
}
