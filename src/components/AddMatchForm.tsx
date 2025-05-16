import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ReturnedTeam } from '@/features/teams/types';

interface AddMatchFormProps {
  cancelAddMatch: () => void;
  setMessage: (message: string | null) => void;
  teams: ReturnedTeam[];
}

interface FormData {
  teamA: string;
  teamB: string;
  teamAscore: number;
  teamBscore: number;
  date: Date;
}

const AddMatchForm: React.FC<AddMatchFormProps> = ({
  cancelAddMatch,
  setMessage,
  teams,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [teamA, setTeamA] = useState<string>('');
  const [teamB, setTeamB] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      setIsLoading(true);
      const res = await fetch(`/api/matches`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await res.json();
      console.log(jsonData);
      if (res.ok) {
        setIsLoading(false);
        setMessage('Partido agregado correctamente');
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
    }
    cancelAddMatch();
  };

  return (
    <DialogContent sx={{ bgcolor: '#00313e' }}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        {error && <Alert severity='error'>{error}</Alert>}
        {isLoading && <CircularProgress color='secondary' />}
      </Container>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputLabel id='teamA-select-label'>Equipo A</InputLabel>
        <Select
          fullWidth
          labelId='teamA-select-label'
          {...register('teamA')}
          error={!!errors.teamA}
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
        >
          {teams.map((t) => (
            <MenuItem value={t._id} key={t._id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id='teamB-select-label'>Equipo B</InputLabel>
        <Select
          labelId='teamB-select-label'
          fullWidth
          {...register('teamB')}
          error={!!errors.teamB}
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
        >
          {teams.map((t) => (
            <MenuItem value={t._id} key={t._id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id='date-label'>Fecha y hora</InputLabel>
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
          <Button
            onClick={cancelAddMatch}
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
  );
};

export default AddMatchForm;
