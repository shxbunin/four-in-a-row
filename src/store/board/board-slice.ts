import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { selectPlayerById } from '@/store/players/players-slice.ts'
import { findWinner } from '@/lib/find-winner.ts'
import type { RootState } from '@/store'

type BoardState = {
  moves: number[]
  animationCount: number
  isAnimating: boolean
  resetKey: number
}

const initialState: BoardState = {
  moves: [],
  animationCount: 0,
  isAnimating: false,
  resetKey: 0,
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<number>) => {
      state.moves.push(action.payload)
    },
    resetBoard: (state) => {
      state.moves = []
      state.animationCount = 0
      state.isAnimating = false
      state.resetKey += 1
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
      state.moves.pop()
    },
  },
})

export const {
  makeMove,
  resetBoard,
  incrementAnimation,
  decrementAnimation,
  undoMove,
} = boardSlice.actions

export const selectMoves = (state: RootState) =>
  state.board.moves

export const selectIsAnimating = (state: RootState) =>
  state.board.isAnimating

export const selectResetKey = (state: RootState) =>
  state.board.resetKey

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
