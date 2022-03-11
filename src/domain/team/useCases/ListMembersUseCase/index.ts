import { Config, UseCase } from 'domain/models'
import { MembersValue, MembersRepository } from 'domain/team/models'

interface Dependencies {
  config: Config
  membersRepository: MembersRepository
}

export default class ListMembersUseCase extends UseCase {
  private readonly membersRepository

  constructor (dependencies: Dependencies) {
    super(dependencies)
    this.membersRepository = dependencies.membersRepository
  }

  async execute (): Promise<MembersValue> {
    return await this.membersRepository.list()
  }
}
