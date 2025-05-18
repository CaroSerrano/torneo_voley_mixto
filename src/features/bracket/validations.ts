import { z } from 'zod';

export const createBracketDataDto = z.object({
  position: z.number().int(),
  teamName: z.string(),
});

export type CreateBracketData = z.infer<typeof createBracketDataDto>;

export const updateBracketDataDto = createBracketDataDto.partial();

export type UpdateBracketData = z.infer<typeof updateBracketDataDto>;
