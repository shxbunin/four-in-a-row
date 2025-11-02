import styles from './menu.module.css'
import {
  useBoardActions,
  useIsAnimating,
  useIsRedoAvailable,
  useIsUndoAvailable,
  useWinner,
} from '@/store/board/board-hooks.ts'

export default function Menu() {
  const winner = useWinner()
  const isAnimating = useIsAnimating()
  const { resetBoard, undoMove, redoMove } = useBoardActions()

  const isUndoAvailable = useIsUndoAvailable()
  const isRedoAvailable = useIsRedoAvailable()

  const handleClickOnRestart = () => resetBoard()
  const handleClickOnUndo = () => undoMove()
  const handleClickOnRedo = () => redoMove()

  return (
    <div className={styles.container}>
      <div className={styles.winner}>
        {!isAnimating && winner &&
          <div style={{ color: winner.player?.color }}>
            {winner.player?.name} wins!
          </div>}
      </div>
      <div className={styles.menu}>
        <button className={styles.button} disabled>
          <img src="/menu-dots-square-svgrepo-com.svg" alt="menu" />
        </button>
        <button className={styles.button} disabled={!isUndoAvailable} onClick={handleClickOnUndo}>
          <img src="/square-arrow-left-svgrepo-com.svg" alt="undo" />
        </button>
        <button className={styles.button} onClick={handleClickOnRestart}>
          <img src="/restart-circle-svgrepo-com.svg" alt="restart" />
        </button>
        <button className={styles.button} disabled={!isRedoAvailable} onClick={handleClickOnRedo}>
          <img src="/square-arrow-right-svgrepo-com.svg" alt="forward" />
        </button>
      </div>
    </div>
  )
}