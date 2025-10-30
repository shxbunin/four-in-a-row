import styles from './cell.module.css'
import { useState } from 'react'
import { useFallAnimation } from '@/hooks/use-fall-animation/use-fall-animation.tsx'

const COLORS = {
  'player-1': '#fa1e6c',
  'player-2': '#1560ec',
}

type CellProps = {
  position: number
  player: 'player-1' | 'player-2' | null
}

export default function Cell({ position, player }: CellProps) {
  const [currentTop, setCurrentTop] = useState(-70)

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
          <div
            className={styles.circle}
            style={{ backgroundColor: COLORS[player] }} />
        </div>
      )}
    </>
  )
}
