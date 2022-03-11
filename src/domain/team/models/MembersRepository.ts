import MembersValue from './MembersValue'

export default abstract class MembersRepository {
  abstract list (): Promise<MembersValue>
  abstract add (name: string): Promise<MembersValue>
  abstract remove (id: string): Promise<MembersValue>
}
