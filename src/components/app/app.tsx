import GameField from '@/components/game-field/game-field.tsx'
import { useIsAnimating, useWinner } from '@/store/board/board-hooks.ts'

export default function App() {
  const winner = useWinner()
  const isAnimating = useIsAnimating()

  return (
    <>
      {!isAnimating && winner && <div>Победил {winner.player?.name}</div>}
      <GameField />
    </>
  )
}