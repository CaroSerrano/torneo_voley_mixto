import { ReturnedMatch } from '@/features/matches/types';
import { CreateMatchData } from '@/features/matches/validations';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

function useMatches() {
  const endpoint = `/api/matches`;
  const { data, error, isLoading, mutate } = useSWR<ReturnedMatch[], Error>(
    endpoint,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );
  const createMatch = async (data: CreateMatchData) => {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        if (!res.ok) throw new Error('Error al crear el partido');
        await mutate(); // Refresca la caché
    };
  
    const updateMatch = async (
      id: string,
      updatedData: Partial<CreateMatchData>
    ) => {
        const res = await fetch(`${endpoint}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        });
  
        if (!res.ok) throw new Error('Error al actualizar el partido');
        await mutate();
    };
  
    const deleteMatch = async (id: string) => {
        const res = await fetch(`${endpoint}/${id}`, {
          method: 'DELETE',
        });
  
        if (!res.ok) throw new Error('Error al eliminar el partido');
        await mutate();
    };

  return {
    matches: data,
    isLoadingMatches: isLoading,
    isErrorMatches: !!error,
    createMatch,
    updateMatch,
    deleteMatch
  };
}

export default useMatches;
