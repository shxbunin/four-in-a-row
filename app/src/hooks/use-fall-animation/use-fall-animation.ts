import { useEffect, useRef } from 'react'
import { useBoardActions } from '@/store/board/board-hooks.ts'
import type { Player } from '@/types/player.ts'

type UseFallAnimationProps = {
  player: Player | null
  start: number
  target: number
  gravity?: number
  damping?: number
  onUpdate: (position: number) => void
}

export function useFallAnimation(props: UseFallAnimationProps) {
  const { player, start, target, gravity = 300, damping = 0.4, onUpdate } = props
  const { incrementAnimation, decrementAnimation } = useBoardActions()

  const onUpdateRef = useRef(onUpdate)
  const startedRef = useRef(false)
  const finishedRef = useRef(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    onUpdateRef.current = onUpdate
  }, [onUpdate])

  useEffect(() => {
    if (!player) return
    if (startedRef.current) return

    startedRef.current = true
    finishedRef.current = false
    incrementAnimation()

    let currentPosition = start
    let velocity = 0
    let lastTime = performance.now()

    const step = () => {
      const now = performance.now()
      const deltaTime = (now - lastTime) / 1000
      lastTime = now

      velocity += gravity * deltaTime
      currentPosition += velocity * deltaTime

      if (currentPosition >= target) {
        currentPosition = target
        velocity = -velocity * damping

        if (Math.abs(velocity) < 10) {
          onUpdateRef.current(target)
          if (!finishedRef.current) {
            finishedRef.current = true
            decrementAnimation()
          }
          return
        }
      }

      onUpdateRef.current(currentPosition)
      frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }

      if (startedRef.current && !finishedRef.current) {
        finishedRef.current = true
        decrementAnimation()
      }

      startedRef.current = false
    }
  }, [player, start, target, gravity, damping, incrementAnimation, decrementAnimation])
}
