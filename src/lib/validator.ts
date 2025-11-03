import { COLUMNS, ROWS } from '@/constants/game.ts'
import { checkWinnerAt } from '@/lib/check-winner-at.ts'
import type { BoardState } from '@/types/boardState.ts'
import type { Winner } from '@/types/winner.ts'

type ValidateResult = {
  player_1: [number, number][]
  player_2: [number, number][]
  board_state: BoardState
  winner?: Winner
}

export function validate(moves: number[]): ValidateResult {
  if (moves.length === 0) {
    return {
      player_1: [],
      player_2: [],
      board_state: 'waiting',
    }
  }

  const heights = Array(COLUMNS).fill(0)
  const board: (number | null)[][] = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null))
  const player1Positions: [number, number][] = []
  const player2Positions: [number, number][] = []

  for (let i = 0; i < moves.length; i++) {
    const col = moves[i]
    const player = i % 2

    if (col < 0 || col >= COLUMNS || heights[col] >= ROWS)
      continue

    const row = ROWS - 1 - heights[col]
    board[row][col] = player
    heights[col]++

    if (player === 0) {
      player1Positions.push([col, row])
    } else {
      player2Positions.push([col, row])
    }

    const winner = checkWinnerAt(board, row, col, player)
    if (winner) {
      return {
        player_1: player1Positions,
        player_2: player2Positions,
        board_state: 'win',
        winner: {
          who: player === 0 ? 'player_1' : 'player_2',
          positions: winner.positions.map(([r, c]) => [c, r] as [number, number]),
        },
      }
    }
  }

  const isDraw = heights.every(height => height >= ROWS)

  return {
    player_1: player1Positions,
    player_2: player2Positions,
    board_state: isDraw ? 'draw' : 'pending',
  }
}


