import config from './config'
import { TEAM_ADD_TEAM_MEMBER_USE_CASE } from './useCases'

const USE_CASE_FACTORY_MODULES = {
  [TEAM_ADD_TEAM_MEMBER_USE_CASE]: async () =>
    await import('./team/useCases/AddTeamMemberUseCase/factory')
}

const entryPoint = {
  config,
  get: async (key: typeof TEAM_ADD_TEAM_MEMBER_USE_CASE) => {
    const { default: useCaseFactory } = await USE_CASE_FACTORY_MODULES[key]()
    type OriginalExecuteType = ReturnType<typeof useCaseFactory>['execute']

    const executeWithFactoryInjectedConfig: OriginalExecuteType = async (params) => {
      return await useCaseFactory({ config }).execute(params)
    }

    return {
      execute: executeWithFactoryInjectedConfig
    }
  }
}

export default entryPoint
