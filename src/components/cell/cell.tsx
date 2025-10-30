import styles from './cell.module.css'
import { useState } from 'react'
import { useIsAnimating } from '@/store/board/board-hooks.ts'
import { useFallAnimation } from '@/hooks/use-fall-animation/use-fall-animation.ts'
import type { Player } from '@/types/player.ts'

type CellProps = {
  position: number
  player: Player | null
  isVictorious: boolean
}

export default function Cell({ position, player, isVictorious }: CellProps) {
  const [currentTop, setCurrentTop] = useState(-70)
  const isAnimating = useIsAnimating()

  useFallAnimation({
    player,
    start: -70,
    target: position * 70,
    onUpdate: setCurrentTop,
  })

  return (
    <>
      <div className={styles.cell}></div>
      {player && (
        <div
          className={styles.circleWrapper}
          style={{ top: `${currentTop}px` }}>
          <div className={styles.circle} style={{ backgroundColor: player.color }}>
            {!isAnimating && isVictorious && <div className={styles.cross} />}
          </div>
        </div>
      )}
    </>
  )
}
