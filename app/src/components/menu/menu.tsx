import styles from './menu.module.css'
import {
  useBoardActions,
  useIsAnimating,
  useIsRedoAvailable,
  useIsUndoAvailable,
  useStatus,
} from '@/store/board/board-hooks.ts'

import { useState } from 'react'
import Overlay from '@/components/overlay/overlay.tsx'
import ModeSelector from '@/components/mode-selector/mode-selector.tsx'

export default function Menu() {
  const status = useStatus()

  const isAnimating = useIsAnimating()

  const { resetBoard, undoMove, redoMove } = useBoardActions()

  const isUndoAvailable = useIsUndoAvailable()
  const isRedoAvailable = useIsRedoAvailable()

  const handleClickOnRestart = () => resetBoard()
  const handleClickOnUndo = () => undoMove()
  const handleClickOnRedo = () => redoMove()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.status}>
          {!isAnimating && (() => {
            switch (status.board_state) {
              case 'win':
                return <div style={{ color: status.winner?.who.color }}>
                  {status.winner?.who.name} wins!
                </div>
              case 'draw':
                return <div style={{ color: 'white' }}>Draw!</div>
              case 'waiting':
                return <div style={{ color: 'white' }}>Let’s start!</div>
              default:
                return null
            }
          })()}
        </div>
        <div className={styles.menu}>
          <button className={styles.button} onClick={() => setIsOpen(true)}>
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
      {isOpen &&
        <Overlay onClick={() => {setIsOpen(false)}}>
          <ModeSelector />
        </Overlay>}
    </>
  )
}