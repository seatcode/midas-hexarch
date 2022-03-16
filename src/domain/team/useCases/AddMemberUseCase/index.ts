import { Config, UseCase } from 'domain/models'
import { MembersValue, MembersRepository } from 'domain/team/models'

export default class AddMemberUseCase extends UseCase {
  private readonly membersRepository

  constructor (dependencies: {
    config: Config
    membersRepository: MembersRepository
  }) {
    super(dependencies)
    this.membersRepository = dependencies.membersRepository
  }

  async execute (name: string): Promise<MembersValue> {
    return await this.membersRepository.add(name)
  }
}
