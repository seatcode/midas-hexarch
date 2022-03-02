import { useState } from 'react'

import ActionButton from '../../components/ActionButton'
import MemberCard from '../../components/MemberCard'

import type { Member } from './types'
import styles from './index.module.css'

const DEFAULT_MEMBERS: Member[] = [
  { name: 'Ismael' },
  { name: 'Alba' },
  { name: 'Jordi' },
  { name: 'Anis' },
  { name: 'Jesica' }
]

export default function App (): JSX.Element {
  const [members, setMembers] = useState<Member[]>(DEFAULT_MEMBERS)

  const handleAddClick = (): void => {
    const name = window.prompt("Introduce the new member's name:")
    if (name === null) return
    setMembers(prev => [...prev, { name }])
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <h1 className={styles.title}>The Midas Crew</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.memberList}>
          {members.map(member => (
            <MemberCard key={member.name} name={member.name} />
          ))}
        </div>
        <div className={styles.actionButtons}>
          <ActionButton onClick={() => {}}>Edit</ActionButton>
          <ActionButton onClick={handleAddClick}>Add</ActionButton>
        </div>
      </main>
      <footer className={styles.footer}>
        Hexagonal Architecture basic app for reference pruposes
      </footer>
    </div>
  )
}
