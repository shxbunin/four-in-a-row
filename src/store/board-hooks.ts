import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './hooks.ts'
import { makeMove, resetBoard, selectCurrentPlayer, selectMoves } from './board-slice.ts'

export const useMoves = () => useAppSelector(selectMoves)

export const useCurrentPlayer = () => useAppSelector(selectCurrentPlayer)

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
  }
}
