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
  date: z
  .string()
  .optional()
  .refine((val) => {
    if (!val) return true; // Si no hay valor, es válido (opcional)
    const d = new Date(val);
    return !isNaN(d.getTime()); // Si hay valor, debe ser una fecha válida
  }, {
    message: "Invalid date format",
  })
  .transform((val) => (val ? new Date(val) : undefined)),
  matchday: z.number().int(),
});

export type CreateMatchData = z.infer<typeof createMatchDataDto>;

export const updateMatchDataDto = createMatchDataDto
  .partial();

export type UpdateMatchData = z.infer<typeof updateMatchDataDto>;
