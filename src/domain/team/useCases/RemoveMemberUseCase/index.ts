import { Config, UseCase } from 'domain/models'
import { MembersValue, MembersRepository } from 'domain/team/models'

export default class RemoveMemberUseCase extends UseCase {
  private readonly membersRepository

  constructor (dependencies: {config: Config, membersRepository: MembersRepository}) {
    super(dependencies)
    const { membersRepository } = dependencies
    this.membersRepository = membersRepository
  }

  async execute (id: string): Promise<MembersValue> {
    return await this.membersRepository.remove(id)
  }
}
