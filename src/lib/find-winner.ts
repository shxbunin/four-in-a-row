import type { Winner } from '@/types/winner.ts'
import { inBounds } from '@/lib/in-bounds.ts'
import { COLUMNS, PLAYERS_COUNT, ROWS } from '@/constants/game.ts'

const DIRECTIONS = [[0, 1], [1, 0], [1, 1], [1, -1]]

export function findWinner(moves: number[]): Winner | null {
  const columnHeights = Array(COLUMNS).fill(0)
  const board: (number | null)[][] = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null))

  for (let i = 0; i < moves.length; i++) {
    const col = moves[i]
    const player = i % PLAYERS_COUNT

    if (col < 0 || col >= COLUMNS || columnHeights[col] >= ROWS) continue

    const row = ROWS - 1 - columnHeights[col]
    board[row][col] = player
    columnHeights[col]++

    const winner = checkWinnerAt(board, row, col, player)
    if (winner) return winner
  }

  return null
}

function checkWinnerAt(
  board: (number | null)[][],
  row: number,
  column: number,
  player: number,
): Winner | null {

  for (const [dr, dc] of DIRECTIONS) {
    const positions: [number, number][] = [[row, column]]

    for (const dir of [1, -1]) {
      for (let i = 1; i < 4; i++) {
        const r = row + dr * i * dir
        const c = column + dc * i * dir

        if (inBounds(r, c) && board[r][c] === player) {
          positions.push([r, c])
        } else break
      }
    }

    if (positions.length >= 4) {
      positions.sort((a, b) =>
        a[0] === b[0] ? a[1] - b[1] : a[0] - b[0],
      )

      return {
        who: `player-${player + 1}`,
        positions: positions.slice(0, 4),
      }
    }
  }

  return null
}