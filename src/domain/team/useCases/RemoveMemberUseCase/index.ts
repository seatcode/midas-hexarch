import { Config, UseCase } from 'domain/models'
import MembersRepository from 'domain/team/models/MembersRepository'
import MembersValue from 'domain/team/models/MembersValue'

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
