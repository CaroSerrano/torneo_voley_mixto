import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

export function auth() {
  return getServerSession(authOptions);
}