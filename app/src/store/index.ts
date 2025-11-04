import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './board/board-slice.ts'
import playersReducer from './players/players-slice.ts'

export const store = configureStore({
  reducer: {
    board: boardReducer,
    players: playersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
