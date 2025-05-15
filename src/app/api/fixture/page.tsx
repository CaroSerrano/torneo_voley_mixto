'use client';
import Fixture from '@/components/Fixture';
import { ReturnedMatch } from '@/features/matches/types';
import { ReturnedTeam } from '@/features/teams/types';
interface FixturePageProps {
  matches: ReturnedMatch[];
  teams: ReturnedTeam[];
  refreshMatches: () => void;
}
const FixturePage: React.FC<FixturePageProps> = ({
  teams,
  matches,
  refreshMatches,
}) => {
  return <Fixture matches={matches} teams={teams} refreshMatches={refreshMatches} />;
};

export default FixturePage;
