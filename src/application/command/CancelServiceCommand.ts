import { ServiceRepositoty } from '../../domain/repositories/ServiceRepository'

export class CancelServiceCommand {
    private serviceRepository: ServiceRepositoty

    constructor(serviceRepository: ServiceRepositoty) {
        this.serviceRepository = serviceRepository
    }

    public async execute(idService: string) {
        this.serviceRepository.cancel(idService)
    }
}
