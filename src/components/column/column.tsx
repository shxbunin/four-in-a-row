import styles from './column.module.css'
import Cell from '@/components/cell/cell.tsx'

export default function Column({ column }: { column: ('player-1' | 'player-2')[] }) {

  const cellsGrouped: Record<number, 'player-1' | 'player-2' | null> =
    Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i, null]))

  column.forEach((player: ('player-1' | 'player-2'), i: number) => {
    cellsGrouped[i] = player
  })

  return (
    <div className={styles.column}>
      {Object.entries(cellsGrouped).reverse().map(([i, player]) => (
        <Cell key={`cell-${i}`} player={player} />
      ))}
    </div>
  )
}