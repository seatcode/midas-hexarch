import { Config } from 'domain/models'
import { nanoid } from 'nanoid'

import LocalStorageMembersRepository from '.'

export default function ({ config }: { config: Config }): LocalStorageMembersRepository {
  return new LocalStorageMembersRepository({
    config,
    storage: window.localStorage,
    generateId: nanoid
  })
}
