import { useCallback } from 'react'
import type { Mode } from '@/types/mode.ts'
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts'
import {
  decrementAnimation,
  incrementAnimation,
  makeBotMove,
  makeMove,
  redoMove,
  resetBoard,
  selectIsAnimating,
  selectIsRedoAvailable,
  selectIsUndoAvailable,
  selectLastProcessedMove,
  selectMoves,
  selectPendingBotMove,
  selectStatus,
  undoMove,
  changeMode
} from './board-slice.ts'

export const useMoves = () => useAppSelector(selectMoves)
export const useIsAnimating = () => useAppSelector(selectIsAnimating)
export const useStatus = () => useAppSelector(selectStatus)
export const useIsUndoAvailable = () => useAppSelector(selectIsUndoAvailable)
export const useIsRedoAvailable = () => useAppSelector(selectIsRedoAvailable)
export const usePendingBotMove = () => useAppSelector(selectPendingBotMove)
export const useLastProcessedMove = () => useAppSelector(selectLastProcessedMove)

export const useBoardActions = () => {
  const dispatch = useAppDispatch()

  return {
    makeMove: useCallback(
      (column: number) => dispatch(makeMove(column)),
      [dispatch],
    ),
    makeBotMove: useCallback(
      () => dispatch(makeBotMove()),
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
    changeMode: useCallback(
      (mode: Mode) => dispatch((changeMode(mode))),
      [dispatch],
    )
  }
}
