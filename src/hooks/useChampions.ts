import { ReturnedChampion } from '@/features/champions/types';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

function useChampions() {
  const { data, error, isLoading } = useSWR<ReturnedChampion[], Error>(
    `/api/champions`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  return {
    champions: data,
    isLoadingChampions: isLoading,
    isErrorChampions: !!error,
  };
}

export default useChampions;
