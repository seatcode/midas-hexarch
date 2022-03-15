import { Config } from 'domain/models'

import localStorageMembersRepositoryFactory from '../../repositories/LocalStorageMembersRepository/factory'
import RemoveMemberUseCase from '.'

export default function ({ config }: {config: Config}): RemoveMemberUseCase {
  return new RemoveMemberUseCase({
    config,
    membersRepository: localStorageMembersRepositoryFactory({ config })
  })
}
