import { z } from 'zod';
import { Status } from './types';

export const createTeamDataDto = z.object({
  name: z.string().min(1),
  score: z.number().min(0).optional(),
  badge: z.string().max(50).optional(),
  matchesPlayed: z.number().int().optional(),
  status: z.nativeEnum(Status).optional(),
});

export type CreateTeamData = z.infer<typeof createTeamDataDto>;

export const updateTeamDataDto = createTeamDataDto.partial();

export type UpdateTeamData = z.infer<typeof updateTeamDataDto>;
