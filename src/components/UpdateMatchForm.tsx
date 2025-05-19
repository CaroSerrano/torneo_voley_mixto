import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { ReturnedMatch } from '@/features/matches/types';
import useMatches from '@/hooks/useMatches';
import toDatetimeLocalString from '@/utils/toDatetimeLocalString';

interface UpdateMatchFormProps {
  open: boolean;
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
  open,
  match,
  cancelUpdate,
  setMessage,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      teamAscore: match.teamAscore,
      teamBscore: match.teamBscore,
      date: match.date ? toDatetimeLocalString(match.date) : '',
    },
  });
  const [error, setError] = useState<string | null>(null);
  const { updateMatch } = useMatches();

  const onSubmit = async (data: FormData) => {
    try {
      const payload = { ...data, date: new Date(data.date) };
      await updateMatch(match._id, payload);
      setMessage('Partido actualizado correctamente');
      cancelUpdate();
      reset();
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
    cancelUpdate();
    reset();
  };

  return (
    <Dialog open={open} onClose={cancelUpdate}>
      <DialogTitle sx={{ bgcolor: '#134755' }}>Actualizar partido</DialogTitle>

      <DialogContent sx={{ bgcolor: '#00313e' }}>
        {error && <Alert severity='error'>{error}</Alert>}
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label={`Puntaje de ${match.teamA.name}`}
            type='number'
            fullWidth
            margin='normal'
            sx={{ label: { color: 'white' } }}
            {...register('teamAscore', {
              valueAsNumber: true,
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
            label='Fecha y hora del encuentro'
            fullWidth
            margin='normal'
            {...register('date')}
            error={!!errors.date}
            helperText={errors.date?.message}
          />

          <DialogActions>
            <Button
              color='secondary'
              variant='contained'
              onClick={() => {
                cancelUpdate();
                reset();
              }}
            >
              Cancelar
            </Button>
            <Button type='submit' color='success' variant='contained'>
              Actualizar
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMatchForm;
