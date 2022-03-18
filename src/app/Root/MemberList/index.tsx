import { ListMembersUseCaseOutput as Members } from 'domain/types/team'

import { useEffect, useState } from 'react'
import { useDomain } from 'domain/react'
import ActionButton from '../../../components/ActionButton'
import MemberCard from '../../../components/MemberCard'
import styles from './index.module.css'

export default function MembersList (): JSX.Element {
  const [members, setMembers] = useState<Members>([])
  const [isEditing, setIsEditing] = useState(false)
  const domain = useDomain()

  useEffect(() => {
    (async () => {
      const ListMembersUseCase = await domain.team.ListMembersUseCase.get()
      const result = await ListMembersUseCase.execute()
      setMembers(result)
    })().catch(console.error)
  }, [domain])

  const handleEditClick = (): void => {
    setIsEditing(prev => !prev)
  }

  const handleAddClick = async (): Promise<void> => {
    const name = window.prompt("Introduce the new member's name:")
    if (name === null) return

    const AddMemberUseCase = await domain.team.AddMemberUseCase.get()
    const result = await AddMemberUseCase.execute(name)
    setMembers(result)
  }

  const handleMemberRemoveClick = async (targetId: string): Promise<void> => {
    const RemoveMemberUseCase = await domain.team.RemoveMemberUseCase.get()
    const result = await RemoveMemberUseCase.execute(targetId)
    setMembers(result)
  }

  return (
    <>
      <div className={styles.memberList}>
        {members.map(member => (
          <MemberCard
            key={member.id}
            name={member.name}
            onRemoveClick={
              isEditing
                ? async () => await handleMemberRemoveClick(member.id)
                : null
            }
          />
        ))}
      </div>
      <div className={styles.actionButtons}>
        <ActionButton onClick={handleEditClick}>{isEditing ? 'Done' : 'Edit'}</ActionButton>
        {!isEditing && <ActionButton onClick={handleAddClick}>Add</ActionButton>}
      </div>
    </>
  )
}
