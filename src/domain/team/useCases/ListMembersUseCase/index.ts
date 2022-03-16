import { Config, UseCase } from 'domain/models'
import { MembersValue, MembersRepository } from 'domain/team/models'

export default class ListMembersUseCase extends UseCase {
  private readonly membersRepository

  constructor (dependencies: {
    config: Config
    membersRepository: MembersRepository
  }) {
    super(dependencies)
    this.membersRepository = dependencies.membersRepository
  }

  async execute (): Promise<MembersValue> {
    return await this.membersRepository.list()
  }
}
