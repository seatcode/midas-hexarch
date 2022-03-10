import { UseCase } from 'domain/base'

class AddTeamMemberUseCase extends UseCase {
  async execute ({ name }: {name: string}): Promise<void> {
    console.log('AddTeamMemberUseCase:', name)
  }
}

export default AddTeamMemberUseCase
