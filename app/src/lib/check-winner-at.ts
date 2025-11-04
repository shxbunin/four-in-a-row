import { inBounds } from '@/lib/in-bounds.ts'

const DIRECTIONS = [[0, 1], [1, 0], [1, 1], [1, -1]]

export function checkWinnerAt(
  board: (number | null)[][],
  row: number,
  column: number,
  player: number,
): { positions: [number, number][] } | null {

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
        positions: positions.slice(0, 4),
      }
    }
  }

  return null
}