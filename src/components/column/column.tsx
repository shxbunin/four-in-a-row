import styles from './column.module.css'
import Cell from '@/components/cell/cell.tsx'
import { useBoardActions, useIsAnimating, useWinner } from '@/store/board/board-hooks.ts'
import type { Player } from '@/types/player.ts'

type ColumnProps = {
  position: number
  column: Player[]
}

const isVictorious = (winnerPositions: [number, number][] | undefined, i: number, j: number) => {
  if (winnerPositions) {
    return winnerPositions.some(([r, c]) => r === i && c === j)
  }
  return false
}

export default function Column({ position, column }: ColumnProps) {

  const { makeMove } = useBoardActions()
  const isAnimating = useIsAnimating()
  const winner = useWinner()

  const handleClick = (column: number) => {
    if (isAnimating || winner) return
    makeMove(column)
  }
  const cells =
    Array.from({ length: 6 }, (_, i) => column[i] ?? null).reverse()

  return (
    <div className={styles.column} onClick={() => handleClick(position)}>
      {cells.map((player, i) =>
        <Cell key={`cell-${i}`}
              position={i}
              player={player}
              isVictorious={isVictorious(winner?.positions, i, position)} />,
      )}
    </div>
  )
}
