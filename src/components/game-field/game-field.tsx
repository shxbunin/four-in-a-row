import styles from './game-field.module.css'
import type { Player } from '@/types/player.ts'
import {
  useBoardActions,
  useIsAnimating,
  useLastProcessedMove,
  useMoves,
  usePendingBotMove,
} from '@/store/board/board-hooks.ts'
import { usePlayers } from '@/store/players/players-hooks.ts'
import Column from '@/components/column/column.tsx'
import FieldMask from '@/components/field-mask/field-mask.tsx'
import { useEffect, useRef } from 'react'

export default function GameField() {
  const moves = useMoves()
  const players = usePlayers()
  const columns = Array.from({ length: 7 }, () => [] as Player[])
  const { makeBotMove } = useBoardActions()
  const isAnimating = useIsAnimating()
  const pendingBotMove = usePendingBotMove()
  const lastProcessedMove = useLastProcessedMove()

  const prevIsAnimatingRef = useRef(isAnimating)

  useEffect(() => {
    const wasAnimating = prevIsAnimatingRef.current
    const notAnimatingNow = !isAnimating
    const animationJustFinished = wasAnimating && notAnimatingNow
    const hasUnprocessedMoves = moves.length > lastProcessedMove

    if (animationJustFinished && pendingBotMove && hasUnprocessedMoves) {
      makeBotMove()
    }

    prevIsAnimatingRef.current = isAnimating
  }, [isAnimating, pendingBotMove, moves.length, lastProcessedMove, makeBotMove])

  moves.forEach((columnIndex, moveIndex) => {
    const currentPlayer = players[moveIndex % players.length]
    columns[columnIndex].push(currentPlayer)
  })
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <FieldMask />
        <div className={styles.gameField}>
          {columns.map((column, i) => (
            <Column key={`column-${i}`} position={i} column={column} />
          ))}
        </div>
      </div>
    </div>
  )
}
