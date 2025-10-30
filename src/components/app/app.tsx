import GameField from '@/components/game-field/game-field.tsx'

export default function App() {
  const board = [1, 2, 3, 1, 3, 0, 0, 1, 1, 1, 0, 4, 5, 4]

  return <GameField board={board} />;
}