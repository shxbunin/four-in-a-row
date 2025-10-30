import { useEffect, useRef } from 'react'

type UseFallAnimationProps = {
  player: string | null
  start: number
  target: number
  gravity?: number
  damping?: number
  onUpdate: (position: number) => void
}

export function useFallAnimation(props: UseFallAnimationProps) {
  const { player, start, target, gravity = 3500, damping = 0, onUpdate } = props

  const onUpdateRef = useRef(onUpdate)

  useEffect(() => {
    onUpdateRef.current = onUpdate
  }, [onUpdate])

  useEffect(() => {
    if (!player) return

    let currentPosition = start
    let velocity = 0
    let lastTime = performance.now()
    let animationFrameId: number | null = null

    const step = () => {
      const now = performance.now()
      const deltaTime = (now - lastTime) / 1000
      lastTime = now

      velocity += gravity * deltaTime
      currentPosition += velocity * deltaTime

      if (currentPosition >= target) {
        currentPosition = target
        velocity = -velocity * damping

        if (Math.abs(velocity) < 50) {
          onUpdateRef.current(target)
          return
        }
      }

      onUpdateRef.current(currentPosition)
      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [player, start, target, gravity, damping])
}
