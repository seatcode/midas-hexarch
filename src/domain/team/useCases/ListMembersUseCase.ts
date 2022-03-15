import { UseCase } from 'domain/models'
import { MembersValue } from 'domain/team/models'
import LocalStorageMembersRepository from '../repositories/LocalStorageMembersRepository'

export default class ListMembersUseCase extends UseCase {
  private readonly membersRepository

  constructor () {
    super()
    this.membersRepository = new LocalStorageMembersRepository()
  }

  async execute (): Promise<MembersValue> {
    return await this.membersRepository.list()
  }
}
