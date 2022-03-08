import config from './config'

const entryPoint = {
  config,
  AddTeamMemberUseCase: {
    get: async () => await import('./team/useCases/AddTeamMemberUseCase/factory')
      .then(module => module.default({ config }))
  }
}

export default entryPoint
