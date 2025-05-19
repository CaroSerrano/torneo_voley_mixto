import { z } from 'zod';
import mongoose from 'mongoose';

export const zObjectId = z
  .string()
  .length(24)
  .refine((val) => mongoose.isValidObjectId(val), {
    message: 'Invalid ObjectId',
  });

export const createMatchDataDto = z.object({
  teamA: zObjectId,
  teamAscore: z.number().int().optional(),
  teamB: zObjectId,
  teamBscore: z.number().int().optional(),
  date: z.coerce.date(),
  matchday: z.number().int(),
});

export type CreateMatchData = z.infer<typeof createMatchDataDto>;

export const updateMatchDataDto = createMatchDataDto
  .omit({ teamA: true, teamB: true, date: true })
  .extend({
    teamA: zObjectId.optional(),
    teamB: zObjectId.optional(),
    date: z.coerce.date().optional(),
    matchday: z.number().int().optional(),
  })
  .partial();

export type UpdateMatchData = z.infer<typeof updateMatchDataDto>;
