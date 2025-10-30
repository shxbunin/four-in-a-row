import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './hooks.ts'
import {
  decrementAnimation,
  incrementAnimation,
  makeMove,
  resetBoard,
  selectCurrentPlayer,
  selectIsAnimating,
  selectMoves,
} from './board-slice.ts'

export const useMoves = () => useAppSelector(selectMoves)
export const useCurrentPlayer = () => useAppSelector(selectCurrentPlayer)
export const useIsAnimating = () => useAppSelector(selectIsAnimating)

export const useBoardActions = () => {
  const dispatch = useAppDispatch()

  return {
    makeMove: useCallback(
      (column: number) => dispatch(makeMove(column)),
      [dispatch],
    ),
    resetBoard: useCallback(
      () => dispatch(resetBoard()),
      [dispatch],
    ),
    incrementAnimation: useCallback(
      () => dispatch(incrementAnimation()),
      [dispatch],
    ),
    decrementAnimation: useCallback(
      () => dispatch(decrementAnimation()),
      [dispatch],
    ),
  }
}
