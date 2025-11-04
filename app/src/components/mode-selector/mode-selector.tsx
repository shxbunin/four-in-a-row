import styles from './mode-selector.module.css'

export default function ModeSelector() {
  return (
    <>
      <div className={styles.info}>Choose game mode</div>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <img src="/user-svgrepo-com.svg" alt="user" />
            vs
            <img src="/user-svgrepo-com.svg" alt="user" />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <img src="/user-svgrepo-com.svg" alt="user" />
            vs
            <img src="/robot-svgrepo-com.svg" alt="robot" />
          </div>
        </div>
      </div>
    </>
  )
}