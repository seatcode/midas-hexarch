import { Config } from 'domain/models'

import LocalStorageMembersRepository from '.'

export default function ({ config }: { config: Config }): LocalStorageMembersRepository {
  return new LocalStorageMembersRepository({
    config,
    storage: window.localStorage,
    generateId: () => crypto.randomUUID()
  })
}
