import ChampionsTable from '@/components/ChampionsTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campeones'
}

const ChampionsPage: React.FC = () => {
  return <ChampionsTable />;
};

export default ChampionsPage;
