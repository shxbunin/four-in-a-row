import styles from './mode-selector.module.css'
import { useBoardActions } from '@/store/board/board-hooks.ts'

export default function ModeSelector() {
  const { changeMode } = useBoardActions()
  const handleClickOnPlayerMode = () => changeMode('1vs1')
  const handleClickOnBotMode = () => changeMode('bot')
  return (
    <>
      <div className={styles.info}>Choose game mode</div>
      <div className={styles.wrapper}>
        <button className={styles.card} onClick={handleClickOnPlayerMode}>
          <div className={styles.cardInner}>
            <img src="/user-svgrepo-com.svg" alt="user" />
            vs
            <img src="/user-svgrepo-com.svg" alt="user" />
          </div>
        </button>
        <button className={styles.card} onClick={handleClickOnBotMode}>
          <div className={styles.cardInner}>
            <img src="/user-svgrepo-com.svg" alt="user" />
            vs
            <img src="/robot-svgrepo-com.svg" alt="robot" />
          </div>
        </button>
      </div>
    </>
  )
}