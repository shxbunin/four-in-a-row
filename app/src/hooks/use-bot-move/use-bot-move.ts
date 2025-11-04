import { useEffect, useRef } from 'react'
import {
  useBoardActions,
  useIsAnimating,
  useLastProcessedMove,
  useMoves,
  usePendingBotMove,
} from '@/store/board/board-hooks.ts'

export function useBotMove() {
  const { makeBotMove } = useBoardActions()
  const isAnimating = useIsAnimating()
  const pendingBotMove = usePendingBotMove()
  const lastProcessedMove = useLastProcessedMove()
  const moves = useMoves()

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
}
