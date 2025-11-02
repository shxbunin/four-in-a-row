import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { selectPlayerById } from '@/store/players/players-slice.ts'
import { findWinner } from '@/lib/find-winner.ts'
import type { RootState } from '@/store'

type BoardState = {
  moves: number[]
  animationCount: number
  isAnimating: boolean
  recentUndoMoves: number[]
}

const initialState: BoardState = {
  moves: [],
  animationCount: 0,
  isAnimating: false,
  recentUndoMoves: []
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<number>) => {
      state.moves.push(action.payload)
      state.recentUndoMoves = []
    },
    resetBoard: (state) => {
      state.moves = []
      state.animationCount = 0
      state.isAnimating = false
      state.recentUndoMoves = []
    },
    incrementAnimation: (state) => {
      state.animationCount = (state.animationCount ?? 0) + 1
      state.isAnimating = state.animationCount > 0
    },
    decrementAnimation: (state) => {
      state.animationCount = Math.max((state.animationCount ?? 0) - 1, 0)
      state.isAnimating = state.animationCount > 0
    },
    undoMove: (state) => {
      if (state.moves.length > 0) {
        const lastMove = state.moves.pop()
        if (lastMove !== undefined) {
          state.recentUndoMoves.push(lastMove)
        }
      }
    },
    redoMove: (state) => {
      if (state.recentUndoMoves.length > 0) {
        const lastUndoMove = state.recentUndoMoves.pop()
        if (lastUndoMove !== undefined) {
          state.moves.push(lastUndoMove)
        }
      }
    }
  },
})

export const {
  makeMove,
  resetBoard,
  incrementAnimation,
  decrementAnimation,
  undoMove,
  redoMove,
} = boardSlice.actions

export const selectMoves = (state: RootState) =>
  state.board.moves

export const selectIsAnimating = (state: RootState) =>
  state.board.isAnimating

export const selectIsUndoAvailable = (state: RootState) =>
  state.board.moves.length > 0

export const selectIsRedoAvailable = (state: RootState) =>
  state.board.recentUndoMoves.length > 0

export const selectWinner = createSelector(
  [(state: RootState) => state, selectMoves],
  (state, moves) => {
    const winner = findWinner(moves)
    if (winner) {
      return {
        player: selectPlayerById(winner.who)(state),
        positions: winner.positions,
      }
    }
    return null
  },
)

export default boardSlice.reducer
