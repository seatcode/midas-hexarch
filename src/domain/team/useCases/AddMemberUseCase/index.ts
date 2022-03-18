import { Config, UseCase } from 'domain/models'
import { MembersValue, MembersRepository } from 'domain/team/models'

type Output = MembersValue

declare module 'domain/types/team' {
  type AddMemberUseCaseOutput = Output
}

export default class AddMemberUseCase extends UseCase {
  private readonly membersRepository

  constructor (dependencies: {
    config: Config
    membersRepository: MembersRepository
  }) {
    super(dependencies)
    this.membersRepository = dependencies.membersRepository
  }

  async execute (name: string): Promise<Output> {
    return await this.membersRepository.add(name)
  }
}
