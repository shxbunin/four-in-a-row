import { COLUMNS, ROWS } from '@/constants/game.ts'
import { validate } from '@/lib/validator.ts'

export function getBotMove(moves: number[]): number | null {
  const result = validate(moves)

  if (result.board_state === 'win' || result.board_state === 'draw') {
    return null
  }

  const heights = Array(COLUMNS).fill(0)
  for (const move of moves) {
    if (move >= 0 && move < COLUMNS && heights[move] < ROWS) {
      heights[move]++
    }
  }

  const availableColumns: number[] = []
  for (let col = 0; col < COLUMNS; col++) {
    if (heights[col] < ROWS) {
      availableColumns.push(col)
    }
  }

  if (availableColumns.length === 0) {
    return null
  }

  for (const col of availableColumns) {
    const testMoves = [...moves, col]
    const testResult = validate(testMoves)
    if (testResult.board_state === 'win') {
      return col
    }
  }

  for (const ourMove of availableColumns) {
    const afterOurMove = [...moves, ourMove]
    const ourResult = validate(afterOurMove)

    if (ourResult.board_state === 'pending') {
      const newHeights = [...heights]
      newHeights[ourMove]++

      for (const oppMove of availableColumns) {
        if (newHeights[oppMove] < ROWS) {
          const afterOppMove = [...afterOurMove, oppMove]
          const oppResult = validate(afterOppMove)

          if (oppResult.board_state === 'win') {
            if (heights[oppMove] < ROWS) {
              return oppMove
            }
          }
        }
      }
      break
    }
  }

  const randomIndex = Math.floor(Math.random() * availableColumns.length)
  return availableColumns[randomIndex]
}
