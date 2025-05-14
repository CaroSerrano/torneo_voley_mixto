'use client';
import Fixture from '@/components/Fixture';
import { ReturnedMatch } from '@/features/matches/types';
interface FixturePageProps {
  matches: ReturnedMatch[];
  refreshMatches: () => void;
}
const FixturePage: React.FC<FixturePageProps> = ({
  matches,
  refreshMatches,
}) => {
  return <Fixture matches={matches} refreshMatches={refreshMatches} />;
};

export default FixturePage;
