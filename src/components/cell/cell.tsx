import styles from './cell.module.css'

const COLORS = {
  'player-1': '#fa1e6c',
  'player-2': '#1560ec',
}

type CellProps = {
  player: 'player-1' | 'player-2' | null
}

export default function Cell({ player }: CellProps) {
  return (
    <div className={styles.cellWrapper}>
      <div className={styles.cell}>
      </div>

      {player && (
        <div className={styles.circleWrapper}>
          <div
            className={styles.circle}
            style={{ backgroundColor: COLORS[player] }} />
        </div>
      )}
    </div>
  )
}