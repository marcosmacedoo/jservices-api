import { ServiceRepositoty } from '../../domain/repositories/ServiceRepository'

export class CommentServiceCommand {
    private serviceRepository: ServiceRepositoty

    constructor(serviceRepository: ServiceRepositoty) {
        this.serviceRepository = serviceRepository
    }

    public async execute(idService: string, commentary: string) {
        this.serviceRepository.comment(idService, commentary)
    }
}
