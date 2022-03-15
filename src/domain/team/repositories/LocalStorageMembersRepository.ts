import { MemberEntity, MembersValue, MembersRepository } from 'domain/team/models'

import { nanoid } from 'nanoid'

export default class LocalStorageMembersRepository extends MembersRepository {
  private readonly storage: WindowLocalStorage['localStorage']
  private readonly generateId: () => string

  constructor () {
    super()
    this.storage = window.localStorage
    this.generateId = nanoid
  }

  async list (): Promise<MembersValue> {
    const rawExistingMembers = this.storage.getItem(this.config.STORAGE_KEY_MEMBERS)
    return JSON.parse(rawExistingMembers ?? '[]')
  }

  async add (name: string): Promise<MembersValue> {
    const newMember: MemberEntity = { id: this.generateId(), name }

    const existingMembers = await this.list()
    const membersWithNewOne = [...existingMembers, newMember]
    this.storage.setItem(this.config.STORAGE_KEY_MEMBERS, JSON.stringify(membersWithNewOne))

    return membersWithNewOne
  }

  async remove (targetId: string): Promise<MembersValue> {
    const existingMembers = await this.list()
    const membersWithoutTarget = existingMembers.filter(member => member.id !== targetId)
    this.storage.setItem(this.config.STORAGE_KEY_MEMBERS, JSON.stringify(membersWithoutTarget))

    return membersWithoutTarget
  }
}
