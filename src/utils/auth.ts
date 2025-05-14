import bcrypt from 'bcrypt';
import { ReturnedUser } from '@/features/users/types';

export const createHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const compareHash = async (user: ReturnedUser, password: string) => {
  return await bcrypt.compare(password, user.password);
};