'use client';

import React from 'react';
import PositionsTable from '@/components/PositionsTable';
import { ReturnedTeam } from '@/features/teams/types';
interface PositionsPageProps {
  teams: ReturnedTeam[];
  refreshMatches: () => void;
  refreshTeams: () => void;
}
const PositionsPage: React.FC<PositionsPageProps> = ({
  teams,
  refreshMatches,
  refreshTeams,
}) => {
  return (
    <PositionsTable
      teams={teams}
      refreshTeams={refreshTeams}
      refreshMatches={refreshMatches}
    />
  );
};

export default PositionsPage;
