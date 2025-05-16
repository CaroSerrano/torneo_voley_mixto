import { ReturnedMatch } from '@/features/matches/types';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

function useMatches() {
  const { data, error, isLoading } = useSWR<ReturnedMatch[], Error>(`/api/matches`, fetcher, {
    refreshInterval: 5000,
  });

  return {
    matches: data,
    isLoadingMatches: isLoading,
    isErrorMatches: !!error,
  };
}

export default useMatches;
