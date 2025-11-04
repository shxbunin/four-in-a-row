import { useAppSelector } from '@/store/hooks.ts'
import { selectCurrentPlayer, selectPlayerById, selectPlayers } from './players-slice.ts'

export const usePlayers = () => useAppSelector(selectPlayers)
export const useCurrentPlayer = () => useAppSelector(selectCurrentPlayer)
export const usePlayerById = (id: string) => useAppSelector(selectPlayerById(id))

