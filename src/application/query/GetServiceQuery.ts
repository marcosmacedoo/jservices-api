import { ServiceEntity } from '../../domain/entities/ServiceEntity'
import { ServiceRepositoty } from '../../domain/repositories/ServiceRepository'

export class GetServiceQuery {
    private serviceRepository: ServiceRepositoty

    constructor(serviceRepository: ServiceRepositoty) {
        this.serviceRepository = serviceRepository
    }

    public async execute(idService: string): Promise<ServiceEntity> {
        return this.serviceRepository.get(idService)
    }
}
