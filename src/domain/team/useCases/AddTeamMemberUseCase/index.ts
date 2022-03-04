import type { Config, UseCase } from 'domain/types'

interface AddTeamMemberUseCase extends UseCase {}

class AddTeamMemberUseCase {
  constructor ({ config }: {config: Config}) {
    this.config = config
  }

  async execute (): Promise<void> {
    console.log('AddTeamMemberUseCase executed!')
  }
}

export default AddTeamMemberUseCase
