import config from './config'

export default {
  config,
  team: {
    ListMembersUseCase: {
      get: async () => await import('./team/useCases/ListMembersUseCase/factory')
        .then(module => module.default({ config }))
    },
    AddMemberUseCase: {
      get: async () => await import('./team/useCases/AddMemberUseCase/factory')
        .then(module => module.default({ config }))
    },
    RemoveMemberUseCase: {
      get: async () => await import('./team/useCases/RemoveMemberUseCase/factory')
        .then(module => module.default({ config }))
    }
  }
}
