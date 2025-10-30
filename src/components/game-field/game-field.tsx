import styles from './game-field.module.css'
import Column from '@/components/column/column.tsx'
import { useMoves } from '@/store/board/board-hooks.ts'
import { usePlayers } from '@/store/players/players-hooks.ts'
import type { Player } from '@/types/player.ts'

export default function GameField() {
  const moves = useMoves()
  const players = usePlayers()
  const columns = Array.from({ length: 7 }, () => [] as Player[])

  moves.forEach((columnIndex, moveIndex) => {
    const currentPlayer = players[moveIndex % players.length]
    columns[columnIndex].push(currentPlayer)
  })

  return (
    <div className={styles.gameField}>
      {columns.map((column, i) => (
        <Column key={`column-${i}`} position={i} column={column} />
      ))}
    </div>
  )
}
