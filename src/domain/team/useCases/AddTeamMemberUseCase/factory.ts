import type { UseCaseFactory } from '../../../types'

import AddTeamMemberUseCase from './index'

const factory: UseCaseFactory = ({ config }): AddTeamMemberUseCase => {
  return new AddTeamMemberUseCase({ config })
}

export default factory
