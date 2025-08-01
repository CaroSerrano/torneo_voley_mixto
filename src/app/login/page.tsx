import LoginForm from '@/components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login'
}
export default async function FixturePage() {
  return <LoginForm />;
}
