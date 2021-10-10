import { ServiceEntity } from '../../domain/entities/ServiceEntity'
import { ServiceRepositoty } from '../../domain/repositories/ServiceRepository'

export class SaveServiceCommand {
    private serviceRepository: ServiceRepositoty

    constructor(serviceRepository: ServiceRepositoty) {
        this.serviceRepository = serviceRepository
    }

    public async execute(service: ServiceEntity): Promise<{ id: string }> {
        return this.serviceRepository.save(service)
    }
}
