import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';
import { ReturnedTeam } from '@/features/teams/types';

interface UpdateTeamFormProps {
  team: ReturnedTeam;
  cancelUpdate: () => void;
  refreshTeams: () => void;
  setMessage: (message: string | null) => void;
}

interface FormData {
  name: string;
  score: number;
}

const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({
  team,
  cancelUpdate,
  refreshTeams,
  setMessage,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: team.name,
      score: team.score,
    },
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const res = await fetch(`/api/teams/${team._id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await res.json();
      console.log(jsonData);
      if (res.ok) {
        setMessage('Equipo actualizado correctamente');
        refreshTeams();
        cancelUpdate();
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
      cancelUpdate();
    }
  };

  return (
    <DialogContent>
      {error && <Alert severity='error'>{error}</Alert>}
      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label='Nombre'
          fullWidth
          margin='normal'
          {...register('name', {
            minLength: {
              value: 2,
              message: 'El nombre del equipo debe tener al menos 2 caracteres',
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label='Puntaje'
          type='number'
          fullWidth
          margin='normal'
          {...register('score', {
            valueAsNumber: true,
          })}
          error={!!errors.score}
          helperText={errors.score?.message}
        />

        <DialogActions>
          <Button onClick={cancelUpdate}>Cancelar</Button>
          <Button type='submit' color='success' variant='contained'>
            Actualizar
          </Button>
        </DialogActions>
      </Box>
    </DialogContent>
  );
};

export default UpdateTeamForm;
