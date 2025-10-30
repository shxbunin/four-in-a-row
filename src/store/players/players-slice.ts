import { createSlice } from '@reduxjs/toolkit'
import { selectMoves } from '@/store/board/board-slice.ts'
import type { Player } from '@/types/player.ts'
import type { RootState } from '@/store'

type PlayersState = {
  list: Player[]
}

const initialState: PlayersState = {
  list: [
    { id: 'player-1', name: 'Player 1', color: '#fa1e6c' },
    { id: 'player-2', name: 'Player 2', color: '#1560ec' },
  ],
}

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
})

export const selectPlayers = (state: RootState) =>
  state.players.list

export const selectPlayerById = (id: string) => (state: RootState) =>
  state.players.list.find((p) => p.id === id)

export const selectCurrentPlayer = (state: RootState) => {
  const movesCount = selectMoves(state).length
  const players = state.players.list
  return players[movesCount % players.length]
}

export default playersSlice.reducer