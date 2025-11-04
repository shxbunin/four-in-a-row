import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { selectPlayerById } from '@/store/players/players-slice.ts'
import { validate } from '@/lib/validator.ts'
import type { RootState } from '@/store'
import { ROWS } from '@/constants/game.ts'
import { getBotMove } from '@/lib/get-bot-move.ts'

type Mode = '1vs1' | 'bot'

type BoardState = {
  mode: Mode
  moves: number[]
  animationCount: number
  isAnimating: boolean
  recentUndoMoves: number[]
  pendingBotMove: boolean
  lastProcessedMove: number
}

const initialState: BoardState = {
  mode: 'bot',
  moves: [],
  animationCount: 0,
  isAnimating: false,
  recentUndoMoves: [],
  pendingBotMove: false,
  lastProcessedMove: 0,
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
        if (state.mode === 'bot') {
          state.pendingBotMove = true
        }
      }
    },

    makeBotMove: (state) => {
      const column = getBotMove(state.moves)
      if (column !== null) {
        state.moves.push(column)
      }
      state.pendingBotMove = false
      state.lastProcessedMove = state.moves.length
    },

    resetBoard: (state) => {
      state.moves = []
      state.animationCount = 0
      state.isAnimating = false
      state.recentUndoMoves = []
      state.pendingBotMove = false
      state.lastProcessedMove = 0
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
      if (state.moves.length === 0) return

      const isPlayerLast = state.moves.length % 2 !== 0

      const lastMove = state.moves.pop()
      if (lastMove !== undefined) {
        state.recentUndoMoves.push(lastMove)
      }

      if (state.mode === 'bot' && !isPlayerLast && state.moves.length > 0) {
        const lastBotMove = state.moves.pop()
        if (lastBotMove !== undefined) {
          state.recentUndoMoves.push(lastBotMove)
        }
      }

      state.pendingBotMove = false
      state.lastProcessedMove = state.moves.length
    },


    redoMove: (state) => {
      if (state.recentUndoMoves.length === 0) return

      const nextMove = state.recentUndoMoves.pop()
      if (nextMove !== undefined) {
        state.moves.push(nextMove)
      }

      if (state.mode === 'bot') {
        const isBotNext = state.moves.length % 2 !== 0

        if (isBotNext && state.recentUndoMoves.length > 0) {
          const nextBotMove = state.recentUndoMoves.pop()
          if (nextBotMove !== undefined) {
            state.moves.push(nextBotMove)
          }
          state.pendingBotMove = false
        } else if (isBotNext && state.recentUndoMoves.length === 0) {
          state.pendingBotMove = true
        }
      }

      state.lastProcessedMove = state.moves.length
    },


    changeMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload
      state.moves = []
      state.animationCount = 0
      state.isAnimating = false
      state.recentUndoMoves = []
      state.pendingBotMove = false
      state.lastProcessedMove = 0
    },
  },
})

export const {
  makeMove,
  makeBotMove,
  resetBoard,
  incrementAnimation,
  decrementAnimation,
  undoMove,
  redoMove,
  changeMode,
} = boardSlice.actions

export const selectMoves = (state: RootState) => state.board.moves
export const selectIsAnimating = (state: RootState) => state.board.isAnimating
export const selectIsUndoAvailable = (state: RootState) => state.board.moves.length > 0
export const selectIsRedoAvailable = (state: RootState) => state.board.recentUndoMoves.length > 0
export const selectPendingBotMove = (state: RootState) => state.board.pendingBotMove
export const selectLastProcessedMove = (state: RootState) => state.board.lastProcessedMove

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
