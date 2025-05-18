import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { ReturnedChampion, Tournament } from '@/features/champions/types';
import useChampions from '@/hooks/useChampions';

interface UpdateChampionFormProps {
  open: boolean;
  cancelUpdateChampion: () => void;
  setMessage: (message: string | null) => void;
  teams: ReturnedTeam[] | undefined;
  champion: ReturnedChampion;
}

interface FormData {
  team?: string;
  tournament?: Tournament;
  year?: number;
}

const UpdateChampionForm: React.FC<UpdateChampionFormProps> = ({
  open,
  cancelUpdateChampion,
  setMessage,
  teams,
  champion,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      team: champion.team,
      tournament: champion.tournament,
      year: champion.year,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<string>('');
  const [tournament, setTournament] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateChampion } = useChampions();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      setIsLoading(true);
      const res = updateChampion(champion._id, data);
      console.log(res);
      setIsLoading(false);
      setMessage('Campeón actualizado correctamente');
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
    cancelUpdateChampion();
  };
  if (!teams) {
    return <Alert severity='warning'>Datos no disponibles</Alert>;
  }

  return (
    <Dialog open={open} onClose={cancelUpdateChampion}>
      <DialogTitle sx={{ bgcolor: '#134755' }}>Actualizar campeón</DialogTitle>
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
              onClick={cancelUpdateChampion}
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

export default UpdateChampionForm;
