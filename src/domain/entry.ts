import config from './config'

export default {
  config,
  team: {
    ListMembersUseCase: {
      get: async () => await import('./team/useCases/ListMembersUseCase')
        .then(({ default: UseCase }) => new UseCase())
    },
    AddMemberUseCase: {
      get: async () => await import('./team/useCases/AddMemberUseCase')
        .then(({ default: UseCase }) => new UseCase())
    },
    RemoveMemberUseCase: {
      get: async () => await import('./team/useCases/RemoveMemberUseCase')
        .then(({ default: UseCase }) => new UseCase())
    }
  }
}
