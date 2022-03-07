import type { Config } from 'domain/types'

import AddTeamMemberUseCase from './index'

const factory = ({ config }: {config: Config}): AddTeamMemberUseCase => {
  return new AddTeamMemberUseCase({ config })
}

export default factory
