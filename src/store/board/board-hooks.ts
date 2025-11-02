import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts'
import {
  decrementAnimation,
  incrementAnimation,
  makeMove,
  redoMove,
  resetBoard,
  selectIsAnimating,
  selectIsRedoAvailable,
  selectIsUndoAvailable,
  selectMoves,
  selectWinner,
  undoMove,
} from './board-slice.ts'

export const useMoves = () => useAppSelector(selectMoves)
export const useIsAnimating = () => useAppSelector(selectIsAnimating)
export const useWinner = () => useAppSelector(selectWinner)
export const useIsUndoAvailable = () => useAppSelector(selectIsUndoAvailable)
export const useIsRedoAvailable = () => useAppSelector(selectIsRedoAvailable)

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
    undoMove: useCallback(
      () => dispatch((undoMove())),
      [dispatch],
    ),
    redoMove: useCallback(
      () => dispatch((redoMove())),
      [dispatch],
    ),
  }
}
