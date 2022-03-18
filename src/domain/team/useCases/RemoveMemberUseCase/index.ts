import { Config, UseCase } from 'domain/models'
import { MembersValue, MembersRepository } from 'domain/team/models'

type Output = MembersValue

declare module 'domain/types/team' {
  type RemoveMemberUseCaseOutput = Output
}

export default class RemoveMemberUseCase extends UseCase {
  private readonly membersRepository

  constructor (dependencies: {
    config: Config
    membersRepository: MembersRepository
  }) {
    super(dependencies)
    this.membersRepository = dependencies.membersRepository
  }

  async execute (id: string): Promise<Output> {
    return await this.membersRepository.remove(id)
  }
}
