import useSWR, { mutate } from 'swr';
import { ReturnedBracket } from '@/features/bracket/types';
import fetcher from '@/utils/fetcher';

function useBracket() {
  const { data, error, isLoading } = useSWR<ReturnedBracket[], Error>(
    `/api/bracket`,
    fetcher,
    {
      revalidateOnFocus:true,
    }
  );

  // Crear un nuevo bracket
  const createBracket = async (newBracket: Partial<ReturnedBracket>) => {
    const res = await fetch('/api/bracket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBracket),
    });

    if (!res.ok) {
      throw new Error('Error al crear el bracket');
    }

    await mutate('/api/bracket'); // refresca los datos
  };

  // Actualizar un bracket existente
  const updateBracket = async (
    id: string,
    updatedBracket: Partial<ReturnedBracket>
  ) => {
    const res = await fetch(`/api/bracket/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBracket),
    });

    if (!res.ok) {
      throw new Error('Error al actualizar el bracket');
    }

    await mutate('/api/bracket');
  };

  // Eliminar un bracket
  const deleteBracket = async (id: string) => {
    const res = await fetch(`/api/bracket/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Error al eliminar el bracket');
    }

    await mutate('/api/bracket');
  };

  return {
    bracket: data,
    isLoadingBracket: isLoading,
    isErrorBracket: !!error,
    createBracket,
    updateBracket,
    deleteBracket,
  };
}

export default useBracket;
