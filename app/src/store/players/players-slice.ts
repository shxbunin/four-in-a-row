import { createSlice } from '@reduxjs/toolkit'
import { selectMoves } from '@/store/board/board-slice.ts'
import { PLAYERS } from '@/constants/game.ts'
import type { Player } from '@/types/player.ts'
import type { RootState } from '@/store'

type PlayersState = {
  list: Player[]
}

const initialState: PlayersState = {
  list: PLAYERS,
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