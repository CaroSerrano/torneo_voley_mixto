import { z } from 'zod';
import { Tournament } from './types';
import { zObjectId } from '../matches/validations';

export const createChampionDataDto = z.object({
  team: zObjectId,
  tournament: z.nativeEnum(Tournament),
  year: z.number().min(1900).max(new Date().getFullYear()),
});

export type CreateChampionData = z.infer<typeof createChampionDataDto>;

export const updateChampionDataDto = createChampionDataDto
  .partial();

export type UpdateChampionData = z.infer<typeof updateChampionDataDto>;
