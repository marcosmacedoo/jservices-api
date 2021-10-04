import { ServiceRepositoty } from '../../domain/repositories/ServiceRepository'

export class FinishedServiceCommand {
    private serviceRepository: ServiceRepositoty

    constructor(serviceRepository: ServiceRepositoty) {
        this.serviceRepository = serviceRepository
    }

    public async execute(idService: string) {
        this.serviceRepository.finished(idService)
    }
}
