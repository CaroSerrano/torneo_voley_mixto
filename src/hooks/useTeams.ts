import { ReturnedTeam } from '@/features/teams/types';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

function useTeams() {
  const { data, error, isLoading } = useSWR<ReturnedTeam[], Error>(`/api/teams`, fetcher, {
    refreshInterval: 5000,
  });

  return {
    teams: data,
    isLoadingTeams: isLoading,
    isErrorTeams: !!error,
  };
}

export default useTeams;
