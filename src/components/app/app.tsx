import GameField from '@/components/game-field/game-field.tsx'
import Menu from '@/components/menu/menu.tsx'
import Overlay from '@/components/overlay/overlay.tsx'
import { useState } from 'react'
export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Menu />
      <GameField />
    </>
  )
}