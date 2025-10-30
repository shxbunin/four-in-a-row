import GameField from '@/components/game-field/game-field.tsx'
import { useWinner } from '@/store/board/board-hooks.ts'

export default function App() {

  const winner = useWinner()
  console.log(winner)

  return <GameField />
}