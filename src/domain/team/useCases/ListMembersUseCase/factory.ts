import { Config } from 'domain/models'

import localStorageMembersRepositoryFactory from '../../repositories/LocalStorageMembersRepository/factory'
import ListMembersUseCase from '.'

export default function ({ config }: {config: Config}): ListMembersUseCase {
  return new ListMembersUseCase({
    config,
    membersRepository: localStorageMembersRepositoryFactory({ config })
  })
}
