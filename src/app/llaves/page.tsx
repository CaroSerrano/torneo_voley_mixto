import Bracket from '@/components/Bracket';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Llaves'
}

const BracketPage: React.FC = () => {
  return <Bracket />;
};

export default BracketPage;
