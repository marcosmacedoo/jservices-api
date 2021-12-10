import { ServiceEntity } from '../../domain/entities/ServiceEntity'
import { ServiceRepositoty } from '../../domain/repositories/ServiceRepository'

export class GetServicesPerStatus {
    private serviceRepository: ServiceRepositoty

    constructor(serviceRepository: ServiceRepositoty) {
        this.serviceRepository = serviceRepository
    }

    public async execute(status: string): Promise<ServiceEntity[]> {
        return this.serviceRepository.getPerStatus(status)
    }
}
