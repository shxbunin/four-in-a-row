import styles from './game-field.module.css'
import Column from '@/components/column/column.tsx'

type GameFieldProps = {
  board: number[]
}

export default function GameField({ board }: GameFieldProps) {

  const boardGrouped = Array.from({ length: 7 }, () => [] as ('player-1' | 'player-2')[])

  board.forEach((column, i) => {
    const player = i % 2 === 0 ? 'player-1' : 'player-2'
    boardGrouped[column].push(player)
  })

  return (
    <div className={styles.gameField}>
      {boardGrouped.map((column, i) => (
        <Column key={`column-${i}`} column={column} />
      ))}
    </div>
  )
}
