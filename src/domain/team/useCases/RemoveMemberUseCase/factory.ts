import { Config } from 'domain/models'

import localStorageMembersRepositoryFactory from '../../repositories/LocalStorageMembersRepository/factory'
import RemoveMemberUseCase from './index'

export default function ({ config }: {config: Config}): RemoveMemberUseCase {
  return new RemoveMemberUseCase({
    config,
    membersRepository: localStorageMembersRepositoryFactory({ config })
  })
}
