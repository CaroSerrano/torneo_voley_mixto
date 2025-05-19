import { ReturnedChampion, IChampions } from '@/features/champions/types';
import { UpdateChampionData } from '@/features/champions/validations';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

function useChampions() {
  const endpoint = `/api/champions`;

  const { data, error, isLoading, mutate } = useSWR<ReturnedChampion[], Error>(
    endpoint,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const createChampion = async (newChampion: IChampions) => {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChampion),
      });
      if (!res.ok) throw new Error('Error al crear el campeón');
      await mutate(); // Refresca la caché
  };

  const updateChampion = async (
    id: string,
    updatedData: UpdateChampionData
  ) => {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Error al actualizar el campeón');
      await mutate(); // Refresca la caché
  };

  const deleteChampion = async (id: string) => {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar el campeón');
      await mutate(); // Refresca la caché
  };

  return {
    champions: data,
    isLoadingChampions: isLoading,
    isErrorChampions: !!error,
    createChampion,
    updateChampion,
    deleteChampion,
  };
}

export default useChampions;
