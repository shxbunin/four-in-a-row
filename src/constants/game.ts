import type { Player } from '@/types/player.ts'

export const ROWS = 6
export const COLUMNS = 7
export const PLAYERS: Player[] = [
  { id: 'player_1', name: 'Player 1', color: '#EB4646' },
  { id: 'player_2', name: 'Player 2', color: '#EED73E' },
]
export const PLAYERS_COUNT = PLAYERS.length