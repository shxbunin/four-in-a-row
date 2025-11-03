import styles from './column.module.css'
import type { Player } from '@/types/player.ts'
import { useBoardActions, useIsAnimating, useStatus } from '@/store/board/board-hooks.ts'
import { useCurrentPlayer } from '@/store/players/players-hooks.ts'
import { useState } from 'react'
import Cell from '@/components/cell/cell.tsx'

type ColumnProps = {
  position: number
  column: Player[]
}

const isVictorious = (winnerPositions: [number, number][] | undefined, i: number, j: number) =>
  winnerPositions
    ? winnerPositions.some(([r, c]) => r === i && c === j)
    : false

export default function Column({ position, column }: ColumnProps) {
  const { makeMove } = useBoardActions()
  const [isHover, setIsHover] = useState(false)
  const isAnimating = useIsAnimating()
  const currentPlayer = useCurrentPlayer()
  const status = useStatus()

  const handleClick = (column: number) => {
    if (isAnimating || ['win', 'draw'].includes(status.board_state))
      return
    makeMove(column)
  }

  const cells = Array.from({ length: 6 }, (_, i) => column[i] ?? null).reverse()

  return (
    <div className={styles.column}
         onClick={() => handleClick(position)}
         onMouseEnter={() => setIsHover(true)}
         onMouseLeave={() => setIsHover(false)}>
      {
        !isAnimating && isHover && !['win', 'draw'].includes(status.board_state) &&
        <div className={styles.circleWrapper}>
          <div className={styles.circle} style={{ backgroundColor: currentPlayer?.color }} />
        </div>
      }
      {
        cells.map((player, i) =>
          <Cell key={`cell-${i}-${player?.name}`}
                position={i}
                player={player}
                isVictorious={isVictorious(status.winner?.positions, position, i)} />,
        )}
    </div>
  )
}
