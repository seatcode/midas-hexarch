import type { ActionButtonProps } from './types'

import styles from './index.module.css'

export default function ({ children, onClick }: ActionButtonProps): JSX.Element {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      {children}
    </button>
  )
}
