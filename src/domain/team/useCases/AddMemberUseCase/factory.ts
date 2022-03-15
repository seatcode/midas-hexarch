import { Config } from 'domain/models'

import localStorageMembersRepositoryFactory from '../../repositories/LocalStorageMembersRepository/factory'
import AddMemberUseCase from '.'

export default function ({ config }: {config: Config}): AddMemberUseCase {
  return new AddMemberUseCase({
    config,
    membersRepository: localStorageMembersRepositoryFactory({ config })
  })
}
