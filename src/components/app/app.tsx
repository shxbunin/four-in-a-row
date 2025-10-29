import GameField from '@/components/game-field/game-field.tsx'

export default function App() {
  const board = [1, 2, 3, 1, 3, 0, 0, 0]

  return <GameField board={board} />;
}