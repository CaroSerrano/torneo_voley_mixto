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
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChampion),
      });

      if (!res.ok) throw new Error('Error al crear el campeón');
      await mutate(); // Refresca la caché
    } catch (err) {
      console.error(err);
    }
  };

  const updateChampion = async (
    id: string,
    updatedData: UpdateChampionData
  ) => {
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Error al actualizar el campeón');
      await mutate(); // Refresca la caché
    } catch (err) {
      console.error(err);
    }
  };

  const deleteChampion = async (id: string) => {
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar el campeón');
      await mutate(); // Refresca la caché
    } catch (err) {
      console.error(err);
    }
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
