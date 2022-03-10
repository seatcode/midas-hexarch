import { Config } from 'domain/base'

import AddMemberUseCase from './index'

const factory = ({ config }: {config: Config}): AddMemberUseCase => {
  return new AddMemberUseCase({ config })
}

export default factory
