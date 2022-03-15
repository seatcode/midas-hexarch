import { UseCase } from 'domain/models'
import { MembersValue } from 'domain/team/models'
import LocalStorageMembersRepository from '../repositories/LocalStorageMembersRepository'

export default class AddMemberUseCase extends UseCase {
  private readonly membersRepository

  constructor () {
    super()
    this.membersRepository = new LocalStorageMembersRepository()
  }

  async execute (name: string): Promise<MembersValue> {
    return await this.membersRepository.add(name)
  }
}
