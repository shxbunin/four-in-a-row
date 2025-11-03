import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { selectPlayerById } from '@/store/players/players-slice.ts'
import { validate } from '@/lib/validator.ts'
import type { RootState } from '@/store'
import { ROWS } from '@/constants/game.ts'

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
  recentUndoMoves: [],
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<number>) => {
      const count = state.moves.filter(i => i === action.payload).length
      if (count < ROWS) {
        state.moves.push(action.payload)
        state.recentUndoMoves = []
      }
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
    },
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


export const selectStatus = createSelector(
  [(state: RootState) => state, selectMoves],
  (state, moves) => {
    const status = validate(moves)

    if (status.winner) {
      const winnerPlayer = selectPlayerById(status.winner.who)(state)
      if (winnerPlayer) {
        return {
          player_1: status.player_1,
          player_2: status.player_2,
          board_state: status.board_state,
          winner: {
            who: winnerPlayer,
            positions: status.winner.positions,
          },
        }
      }
    }

    return {
      player_1: status.player_1,
      player_2: status.player_2,
      board_state: status.board_state,
    }
  },
)


export default boardSlice.reducer
