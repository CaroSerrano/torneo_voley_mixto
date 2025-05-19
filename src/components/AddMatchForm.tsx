import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ReturnedTeam } from '@/features/teams/types';
import useMatches from '@/hooks/useMatches';
import { CreateMatchData } from '@/features/matches/validations';

interface AddMatchFormProps {
  open: boolean;
  cancelAddMatch: () => void;
  setMessage: (message: string | null) => void;
  teams: ReturnedTeam[];
}

interface FormData {
  teamA: string;
  teamB: string;
  teamAscore: number;
  teamBscore: number;
  date?: string;
  matchday: number;
}

const AddMatchForm: React.FC<AddMatchFormProps> = ({
  open,
  cancelAddMatch,
  setMessage,
  teams,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      teamA: '',
      teamB: '',
      teamAscore: 0,
      teamBscore: 0,
      date: undefined,
      matchday: 1,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createMatch } = useMatches();

  const onSubmit = async (data: FormData) => {
    try {
      const payload: CreateMatchData = {
        teamA: data.teamA,
        teamB: data.teamB,
        matchday: data.matchday,
        teamAscore: data.teamAscore,
        teamBscore: data.teamBscore,
        ...(data.date ? { date: new Date(data.date) } : {}),
      };
      setIsLoading(true);
      await createMatch(payload);
      setIsLoading(false);
      cancelAddMatch();
      setMessage('Partido agregado correctamente');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
    cancelAddMatch();
  };

  return (
    <Dialog open={open} onClose={cancelAddMatch}>
      <DialogTitle sx={{ bgcolor: '#134755' }}>Añadir partido</DialogTitle>

      <DialogContent sx={{ bgcolor: '#00313e' }}>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          {error && <Alert severity='error'>{error}</Alert>}
          {isLoading && <CircularProgress color='secondary' />}
        </Container>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputLabel id='teamA-select-label'>Equipo A</InputLabel>
          <Controller
            name='teamA'
            control={control}
            rules={{ required: 'Selecciona un equipo A' }}
            render={({ field }) => (
              <Select
                {...field}
                labelId='teamA-select-label'
                fullWidth
                error={!!errors.teamA}
              >
                <MenuItem value=''>
                  <em>-- Seleccionar --</em>
                </MenuItem>
                {teams.map((t) => (
                  <MenuItem value={t._id} key={t._id}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.teamA && (
            <Alert severity='error'>{errors.teamA.message}</Alert>
          )}
          <InputLabel id='teamB-select-label'>Equipo B</InputLabel>
          <Controller
            name='teamB'
            control={control}
            rules={{ required: 'Selecciona un equipo B' }}
            render={({ field }) => (
              <Select
                {...field}
                labelId='teamB-select-label'
                fullWidth
                error={!!errors.teamB}
              >
                <MenuItem value=''>
                  <em>-- Seleccionar --</em>
                </MenuItem>
                {teams.map((t) => (
                  <MenuItem value={t._id} key={t._id}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.teamB && (
            <Alert severity='error'>{errors.teamB.message}</Alert>
          )}

          <InputLabel id='date-label'>Fecha y hora del encuentro</InputLabel>
          <TextField
            type='datetime-local'
            fullWidth
            margin='none'
            {...register('date')}
            error={!!errors.date}
            helperText={errors.date?.message}
          />
          <InputLabel id='matchday-label'>Fecha</InputLabel>
          <TextField
            type='number'
            fullWidth
            margin='none'
            {...register('matchday', {
              valueAsNumber: true,
              min: 1,
              max: 9,
            })}
            error={!!errors.matchday}
            helperText={errors.matchday?.message}
          />
          <DialogActions>
            <Button
              onClick={() => {
                cancelAddMatch();
                reset();
              }}
              color='secondary'
              variant='contained'
            >
              Cancelar
            </Button>
            <Button type='submit' color='success' variant='contained'>
              Añadir
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddMatchForm;
