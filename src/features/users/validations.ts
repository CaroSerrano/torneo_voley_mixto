import { z } from 'zod';

export const createUserDataDto = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserData = z.infer<typeof createUserDataDto>;

export const updateUserDataDto = createUserDataDto
  .partial();

export type UpdateUserData = z.infer<typeof updateUserDataDto>;
