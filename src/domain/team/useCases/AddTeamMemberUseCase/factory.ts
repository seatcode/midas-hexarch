import { Config } from 'domain/base'

import AddTeamMemberUseCase from './index'

const factory = ({ config }: {config: Config}): AddTeamMemberUseCase => {
  return new AddTeamMemberUseCase({ config })
}

export default factory
