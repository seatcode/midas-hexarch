import { UseCase } from 'domain/base'

class AddMemberUseCase extends UseCase {
  async execute ({ name }: {name: string}): Promise<void> {
    console.log('AddMemberUseCase:', name)
  }
}

export default AddMemberUseCase
