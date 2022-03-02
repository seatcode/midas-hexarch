import { useState } from 'react'

import ActionButton from '../../../components/ActionButton'
import MemberCard from '../../../components/MemberCard'

import type { Member } from './types'
import styles from './index.module.css'

const DEFAULT_MEMBERS: Member[] = [
  { name: 'Ismael' },
  { name: 'Alba' },
  { name: 'Jordi' },
  { name: 'Anis' },
  { name: 'Jesica' }
]

export default function MembersList (): JSX.Element {
  const [members, setMembers] = useState<Member[]>(DEFAULT_MEMBERS)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = (): void => {
    setIsEditing(prev => !prev)
  }

  const handleAddClick = (): void => {
    const name = window.prompt("Introduce the new member's name:")
    if (name === null) return
    setMembers(prev => [...prev, { name }])
  }

  const handleMemberRemoveClick = (targetName: string): void => {
    setMembers(prev => prev.filter(member => member.name !== targetName))
  }

  return (
    <>
      <div className={styles.memberList}>
        {members.map(member => (
          <MemberCard
            key={member.name}
            name={member.name}
            onRemoveClick={
              isEditing
                ? () => handleMemberRemoveClick(member.name)
                : null
            }
          />
        ))}
      </div>
      <div className={styles.actionButtons}>
        <ActionButton onClick={handleEditClick}>{isEditing ? 'Done' : 'Edit'}</ActionButton>
        <ActionButton onClick={handleAddClick}>Add</ActionButton>
      </div>
    </>
  )
}