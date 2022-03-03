import type { UseCaseParams, UseCaseFactory } from './types'

import config from './config'
import { TEAM_C_ADD_TEAM_MEMBER_USE_CASE } from './symbols'

const USE_CASES: {[key: symbol]: () => Promise<{default: UseCaseFactory}>} = {
  [TEAM_C_ADD_TEAM_MEMBER_USE_CASE]: async () =>
    await import('./team/useCases/AddTeamMemberUseCase/factory')
}

const entryPoint = {
  config,
  get: (key: symbol) => {
    return {
      async execute (params: UseCaseParams) {
        const { default: useCaseFactory } = await USE_CASES[key]()
        return await useCaseFactory({ config }).execute(params)
      }
    }
  }
}

export default entryPoint
