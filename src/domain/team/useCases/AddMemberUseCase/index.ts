import { Config, UseCase } from 'domain/models'
import { MembersValue, MembersRepository } from 'domain/team/models'

interface Dependencies {
  config: Config
  membersRepository: MembersRepository
}

export default class AddMemberUseCase extends UseCase {
  private readonly membersRepository

  constructor (dependencies: Dependencies) {
    super(dependencies)
    this.membersRepository = dependencies.membersRepository
  }

  async execute (name: string): Promise<MembersValue> {
    return await this.membersRepository.add(name)
  }
}
