'use client'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { ReturnedChampion } from '@/features/champions/types';
import { UpdateChampionData } from '@/features/champions/validations';
import useChampions from '@/hooks/useChampions';

interface UpdateChampionFormProps {
  open: boolean;
  cancelUpdateChampion: () => void;
  setMessage: (message: string | null) => void;
  teams: ReturnedTeam[] | undefined;
  champion: ReturnedChampion;
}

const UpdateChampionForm: React.FC<UpdateChampionFormProps> = ({
  open,
  cancelUpdateChampion,
  setMessage,
  teams,
  champion,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UpdateChampionData>({
    defaultValues: {
      team: champion.team.name,
      tournament: champion.tournament,
      year: champion.year,
    },
  });
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateChampion } = useChampions();

  const onSubmit = async (data: UpdateChampionData) => {
    try {
      setIsLoading(true);
      await updateChampion(champion._id, data);
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
    reset();
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
          <Controller
            name='team'
            control={control}
            rules={{ required: 'El equipo es obligatorio' }}
            render={({ field }) => (
              <Select
                fullWidth
                labelId='team-select-label'
                {...field}
                error={!!errors.team}
                MenuProps={{
                  slotProps: { paper: { sx: { backgroundColor: '#00313e' } } },
                }}
              >
                {teams.map((t) => (
                  <MenuItem value={t._id} key={t._id}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <InputLabel id='tournament-select-label'>Torneo</InputLabel>
          <Controller
            name='tournament'
            control={control}
            rules={{ required: 'El torneo es obligatorio' }}
            render={({ field }) => (
              <Select
                fullWidth
                labelId='tournament-select-label'
                {...field}
                error={!!errors.tournament}
                MenuProps={{
                  slotProps: { paper: { sx: { backgroundColor: '#00313e' } } },
                }}
              >
                <MenuItem value='Apertura'>Apertura</MenuItem>
                <MenuItem value='Clausura'>Clausura</MenuItem>
              </Select>
            )}
          />
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
