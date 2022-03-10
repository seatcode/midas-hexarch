import config from './config'

const entryPoint = {
  config,
  team: {
    AddMemberUseCase: {
      get: async () => await import('./team/useCases/AddMemberUseCase/factory')
        .then(module => module.default({ config }))
    }
  }
}

export default entryPoint
