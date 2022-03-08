import type { Config, UseCase } from 'domain/types'

interface AddTeamMemberUseCase extends UseCase {}

class AddTeamMemberUseCase {
  constructor ({ config }: {config: Config}) {
    this.config = config
  }

  async execute ({ debug = false } = {}): Promise<void> {
    console.log('AddTeamMemberUseCase executed!', debug, this.config)
  }
}

export default AddTeamMemberUseCase
