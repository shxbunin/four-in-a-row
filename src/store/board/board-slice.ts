import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

type BoardState = {
  moves: number[]
  animationCount: number
  isAnimating: boolean
}

const initialState: BoardState = {
  moves: [],
  animationCount: 0,
  isAnimating: false,
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
    },
    incrementAnimation: (state) => {
      state.animationCount = (state.animationCount ?? 0) + 1
      state.isAnimating = state.animationCount > 0
    },
    decrementAnimation: (state) => {
      state.animationCount = Math.max((state.animationCount ?? 0) - 1, 0)
      state.isAnimating = state.animationCount > 0
    },
  },
})

export const {
  makeMove,
  resetBoard,
  incrementAnimation,
  decrementAnimation,
} = boardSlice.actions

export const selectMoves = (state: RootState) =>
  state.board.moves

export const selectIsAnimating = (state: RootState) =>
  state.board.isAnimating

export default boardSlice.reducer
