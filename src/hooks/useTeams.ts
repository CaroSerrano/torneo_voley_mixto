import { ReturnedTeam } from '@/features/teams/types';
import { CreateTeamData } from '@/features/teams/validations';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

function useTeams() {
  const endpoint = `/api/teams`;
  const { data, error, isLoading, mutate } = useSWR<ReturnedTeam[], Error>(
    endpoint,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const createTeam = async (data: CreateTeamData): Promise<void> => {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Error al crear el equipo');
      await mutate(); // Refresca la caché
  };

  const updateTeam = async (
    id: string,
    updatedData: Partial<CreateTeamData>
  ): Promise<void> => {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Error al actualizar el equipo');
      await mutate();
  };

  const deleteTeam = async (id: string): Promise<void> => {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar el equipo');
      await mutate();
  };

  return {
    teams: data,
    isLoadingTeams: isLoading,
    isErrorTeams: !!error,
    createTeam,
    updateTeam,
    deleteTeam
  };
}

export default useTeams;
