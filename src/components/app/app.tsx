import GameField from '@/components/game-field/game-field.tsx'
import { useState } from 'react'

export default function App() {
  const [board, setBoard] = useState<number[]>([])

  const onDrop = (column: number) => {
    setBoard(prev => [...prev, column])
  }

  return <GameField board={board} onDrop={onDrop} />
}