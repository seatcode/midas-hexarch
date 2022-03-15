import { UseCase } from 'domain/models'
import { MembersValue } from 'domain/team/models'
import LocalStorageMembersRepository from '../repositories/LocalStorageMembersRepository'

export default class RemoveMemberUseCase extends UseCase {
  private readonly membersRepository

  constructor () {
    super()
    this.membersRepository = new LocalStorageMembersRepository()
  }

  async execute (id: string): Promise<MembersValue> {
    return await this.membersRepository.remove(id)
  }
}
