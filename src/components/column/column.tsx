import styles from './column.module.css'
import Cell from '@/components/cell/cell.tsx'

type ColumnProps = {
  column: ('player-1' | 'player-2')[]
  onClick: () => void
}

export default function Column({ column, onClick }: ColumnProps) {
  const cells =
    Array.from({ length: 6 }, (_, i) => column[i] ?? null).reverse()

  return (
    <div className={styles.column} onClick={onClick}>
      {cells.map((player, i) =>
        <Cell key={`cell-${i}`} position={i} player={player} />,
      )}
    </div>
  )
}
