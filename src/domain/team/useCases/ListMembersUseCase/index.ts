import { Config, UseCase } from 'domain/models'
import { MembersValue, MembersRepository } from 'domain/team/models'

type Output = MembersValue

declare module 'domain/types/team' {
  type ListMembersUseCaseOutput = Output
}

export default class ListMembersUseCase extends UseCase {
  private readonly membersRepository

  constructor (dependencies: {
    config: Config
    membersRepository: MembersRepository
  }) {
    super(dependencies)
    this.membersRepository = dependencies.membersRepository
  }

  async execute (): Promise<Output> {
    return await this.membersRepository.list()
  }
}
