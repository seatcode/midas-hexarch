import type { MemberCardProps } from './types'
import styles from './index.module.css'

export default function MemberCard ({ name }: MemberCardProps): JSX.Element {
  return (
    <article className={styles.wrapper}>
      {name}
    </article>
  )
}
