import styles from './game-field.module.css'
import Column from '@/components/column/column.tsx'
import { useMoves } from '@/store/board-hooks.ts'

export default function GameField() {
  const moves = useMoves()
  const boardGrouped =
    Array.from({ length: 7 }, () => [] as ('player-1' | 'player-2')[])

  moves.forEach((column, i) => {
    const player = i % 2 === 0 ? 'player-1' : 'player-2'
    boardGrouped[column].push(player)
  })

  return (
    <div className={styles.gameField}>
      {boardGrouped.map((column, i) => (
        <Column key={`column-${i}`} position={i} column={column} />
      ))}
    </div>
  )
}
