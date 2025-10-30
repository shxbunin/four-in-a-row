import styles from './column.module.css'
import Cell from '@/components/cell/cell.tsx'
import { useBoardActions, useIsAnimating } from '@/store/board/board-hooks.ts'
import type { Player } from '@/types/player.ts'

type ColumnProps = {
  position: number
  column: Player[]
}

export default function Column({ position, column }: ColumnProps) {

  const { makeMove } = useBoardActions()
  const isAnimating = useIsAnimating()

  const handleClick = (column: number) => {
    if (isAnimating) return
    makeMove(column)
  }
  const cells =
    Array.from({ length: 6 }, (_, i) => column[i] ?? null).reverse()

  return (
    <div className={styles.column} onClick={() => handleClick(position)}>
      {cells.map((player, i) =>
        <Cell key={`cell-${i}`} position={i} player={player} />,
      )}
    </div>
  )
}
