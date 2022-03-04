import type { UseCaseParams, UseCaseFactory } from './types'

import config from './config'
import { TEAM_ADD_TEAM_MEMBER_USE_CASE } from './symbols'

const USE_CASES: {[key: symbol]: () => Promise<{default: UseCaseFactory}>} = {
  [TEAM_ADD_TEAM_MEMBER_USE_CASE]: async () =>
    await import('./team/useCases/AddTeamMemberUseCase/factory')
}

const entryPoint = {
  config,
  get: async (key: symbol) => {
    const { default: useCaseFactory } = await USE_CASES[key]()
    return {
      async execute (params?: UseCaseParams) {
        return await useCaseFactory({ config }).execute(params)
      }
    }
  }
}

export default entryPoint
