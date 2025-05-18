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
import { Tournament } from '@/features/champions/types';
import useChampions from '@/hooks/useChampions';

interface AddChampionFormProps {
  cancelAddChampion: () => void;
  setMessage: (message: string | null) => void;
  teams: ReturnedTeam[] | undefined;
}

interface FormData {
  team: string;
  tournament: Tournament;
  year: number;
}

const AddChampionForm: React.FC<AddChampionFormProps> = ({
  cancelAddChampion,
  setMessage,
  teams,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<string>('');
  const [tournament, setTournament] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createChampion } = useChampions();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      setIsLoading(true);
      createChampion(data);
      setIsLoading(false);
      setMessage('Campeón agregado correctamente');
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
    cancelAddChampion();
  };
  if (!teams) {
    return <Alert severity='warning'>Datos no disponibles</Alert>;
  }

  return (
    <DialogContent sx={{ bgcolor: '#00313e' }}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        {error && <Alert severity='error'>{error}</Alert>}
        {isLoading && <CircularProgress color='secondary' />}
      </Container>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputLabel id='team-select-label'>Equipo</InputLabel>
        <Select
          fullWidth
          labelId='team-select-label'
          {...register('team')}
          error={!!errors.team}
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          MenuProps={{
            slotProps: { paper: { sx: { backgroundColor: '#00313e' } } },
          }}
        >
          {teams.map((t) => (
            <MenuItem value={t.name} key={t._id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id='tournament-select-label'>Torneo</InputLabel>
        <Select
          labelId='tournament-select-label'
          fullWidth
          {...register('tournament')}
          error={!!errors.tournament}
          value={tournament}
          onChange={(e) => setTournament(e.target.value)}
          MenuProps={{
            slotProps: { paper: { sx: { backgroundColor: '#00313e' } } },
          }}
        >
          <MenuItem value={'Apertura'}>Apertura</MenuItem>
          <MenuItem value={'Clausura'}>Clausura</MenuItem>
        </Select>
        <InputLabel id='year-label'>Año</InputLabel>
        <TextField
          type='number'
          fullWidth
          margin='normal'
          {...register('year', {
            valueAsNumber: true,
          })}
          error={!!errors.year}
          helperText={errors.year?.message}
        />

        <DialogActions>
          <Button
            onClick={cancelAddChampion}
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

export default AddChampionForm;
