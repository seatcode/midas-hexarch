import MemberList from './MemberList'
import styles from './index.module.css'

export default function App (): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <header>
        <h1 className={styles.title}>The Midas Crew</h1>
      </header>
      <main className={styles.main}>
        <MemberList />
      </main>
      <footer className={styles.footer}>
        Hexagonal Architecture basic app for reference pruposes
      </footer>
    </div>
  )
}
