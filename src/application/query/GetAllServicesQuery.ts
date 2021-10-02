import { ServiceEntity } from '../../domain/entities/ServiceEntity'
import { ServiceRepositoty } from '../../domain/repositories/ServiceRepository'

export class GetAllServicesQuery {
    private serviceRepository: ServiceRepositoty

    constructor(serviceRepository: ServiceRepositoty) {
        this.serviceRepository = serviceRepository
    }

    public async execute(): Promise<ServiceEntity[]> {
        return this.serviceRepository.all()
    }
}
