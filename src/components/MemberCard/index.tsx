import type { MemberCardProps } from './types'

import styles from './index.module.css'

export default function MemberCard ({
  name,
  onRemoveClick = null
}: MemberCardProps): JSX.Element {
  return (
    <article className={styles.wrapper}>
      {name}
      {onRemoveClick !== null && (
        <button className={styles.removeButton} onClick={onRemoveClick} />
      )}
    </article>
  )
}
