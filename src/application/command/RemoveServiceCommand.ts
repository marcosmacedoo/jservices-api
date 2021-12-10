import { ServiceRepositoty } from '../../domain/repositories/ServiceRepository'

export class RemoveServiceCommand {
    private serviceRepository: ServiceRepositoty

    constructor(serviceRepository: ServiceRepositoty) {
        this.serviceRepository = serviceRepository
    }

    public async execute(idService: string) {
        this.serviceRepository.remove(idService)
    }
}
