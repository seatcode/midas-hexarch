import { Repository } from 'domain/models'

export interface MemberEntity {
  id: string
  name: string
}

export type MembersValue = MemberEntity[]

export abstract class MembersRepository extends Repository {
  abstract list (): Promise<MembersValue>
  abstract add (name: string): Promise<MembersValue>
  abstract remove (id: string): Promise<MembersValue>
}
