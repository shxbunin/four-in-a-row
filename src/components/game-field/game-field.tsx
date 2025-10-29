import styles from './game-field.module.css'
import Column from '@/components/column/column.tsx'

export default function GameField({ board }: { board: number[] }) {

  const startAcc: Record<number, ('player-1' | 'player-2')[]> =
    Object.fromEntries(Array.from({ length: 7 }, (_, i) => [i, []]))

  const boardGrouped = board.reduce((acc, cur, index) => {
    const player = index % 2 === 0 ? 'player-1' : 'player-2'
    acc[cur].push(player)
    return acc
  }, startAcc as Record<string, ('player-1' | 'player-2')[]>)

  return (
    <div className={styles.gameField}>
      {Object.keys(boardGrouped).map((column) => (
        <Column key={`column-${column}`} column={boardGrouped[column]} />
      ))}
    </div>
  )
}