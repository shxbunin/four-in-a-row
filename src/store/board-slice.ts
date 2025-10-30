import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index.ts'

interface BoardState {
  moves: number[]
}

const initialState: BoardState = {
  moves: [],
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
    },
  },
})

export const { makeMove, resetBoard } = boardSlice.actions
export const selectMoves = (state: RootState) => state.board.moves
export const selectCurrentPlayer =
  (state: RootState) => state.board.moves.length % 2 === 0 ? 'player-1' : 'player-2'
export default boardSlice.reducer
