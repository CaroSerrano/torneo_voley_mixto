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
import { ReturnedMatch } from '@/features/matches/types';

interface UpdateMatchFormProps {
  match: ReturnedMatch;
  cancelUpdate: () => void;
  setMessage: (message: string | null) => void;
}

interface FormData {
  teamAscore: number;
  teamBscore: number;
  date: string;
}

const UpdateMatchForm: React.FC<UpdateMatchFormProps> = ({
  match,
  cancelUpdate,
  setMessage,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      teamAscore: match.teamAscore,
      teamBscore: match.teamBscore,
      date: match.date
    },
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const res = await fetch(`/api/matches/${match._id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await res.json();
      console.log(jsonData);
      if (res.ok) {
        setMessage('Partido actualizado correctamente');
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
    <DialogContent sx={{bgcolor: '#00313e'}}>
      {error && <Alert severity='error'>{error}</Alert>}
      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label={`Puntaje de ${match.teamA.name}`}
          type='number'
          fullWidth
          margin='normal'
          sx={{label: {color: 'white'}}}
          {...register('teamAscore', {
            valueAsNumber: true
          })}
          error={!!errors.teamAscore}
          helperText={errors.teamAscore?.message}
        />

        <TextField
          label={`Puntaje de ${match.teamB.name}`}
          type='number'
          fullWidth
          margin='normal'
          {...register('teamBscore', {
            valueAsNumber: true,
          })}
          error={!!errors.teamBscore}
          helperText={errors.teamBscore?.message}
        />

        <TextField
          type='datetime-local'
          fullWidth
          margin='normal'
          {...register('date', {
            valueAsDate: true,
          })}
          error={!!errors.date}
          helperText={errors.date?.message}
        />

        <DialogActions>
          <Button color='secondary' variant='contained' onClick={cancelUpdate}>Cancelar</Button>
          <Button type='submit' color='success' variant='contained'>
            Actualizar
          </Button>
        </DialogActions>
      </Box>
    </DialogContent>
  );
};

export default UpdateMatchForm;
