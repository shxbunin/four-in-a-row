import styles from './cell.module.css'

export default function Cell({ player }: { player: 'player-1' | 'player-2' | null }) {
  return (
    <div className={styles.cellWrapper}>
      <div className={styles.cell}>
      </div>

      {player === 'player-1' && (
        <div className={styles.circleWrapper}>
          <div className={styles.circle} style={{backgroundColor: 'red'}} />
        </div>
      )}

      {player === 'player-2' && (
        <div className={styles.circleWrapper}>
          <div className={styles.circle} style={{backgroundColor: 'blue'}} />
        </div>
      )}
    </div>
  )
}