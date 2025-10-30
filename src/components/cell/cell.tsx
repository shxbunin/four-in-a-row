import { useState, useEffect } from 'react'
import styles from './cell.module.css'

const COLORS = {
  'player-1': '#fa1e6c',
  'player-2': '#1560ec',
}

type CellProps = {
  position: number
  player: 'player-1' | 'player-2' | null
}

export default function Cell({ position, player }: CellProps) {
  const [currentTop, setCurrentTop] = useState(-70)
  const targetTop = position * 70

  useEffect(() => {
    if (!player) return

    const targetPosition = targetTop
    const startTop = -70
    const gravity = 4000
    const damping = 0.3
    let currentPosition = startTop
    let lastTime = Date.now()
    let velocity = 0

    const animate = () => {
      const now = Date.now()
      const deltaTime = (now - lastTime) / 1000
      lastTime = now

      velocity += gravity * deltaTime
      currentPosition += velocity * deltaTime

      if (currentPosition >= targetPosition) {
        currentPosition = targetPosition
        velocity = -velocity * damping

        if (Math.abs(velocity) < 50) {
          velocity = 0
          setCurrentTop(targetPosition)
          return
        }
      }

      setCurrentTop(currentPosition)
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [player])


  return (
    <>
      <div className={styles.cell}></div>
      {player && (
        <div
          className={styles.circleWrapper}
          style={{ top: `${currentTop}px` }}>
          <div
            className={styles.circle}
            style={{ backgroundColor: COLORS[player] }} />
        </div>
      )}
    </>
  )
}
