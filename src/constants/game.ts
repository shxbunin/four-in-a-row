import type { Player } from '@/types/player.ts'

export const ROWS = 6
export const COLUMNS = 7
export const PLAYERS: Player[] = [
  { id: 'player-1', name: 'Player 1', color: '#fa1e6c' },
  { id: 'player-2', name: 'Player 2', color: '#1560ec' },
]
export const PLAYERS_COUNT = PLAYERS.length