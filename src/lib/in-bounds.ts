import { COLUMNS, ROWS } from '@/constants/game.ts'

export function inBounds(r: number, c: number) {
  return r >= 0 && r < ROWS && c >= 0 && c < COLUMNS
}