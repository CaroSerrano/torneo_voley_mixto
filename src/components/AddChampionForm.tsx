'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
// import { IChampions } from '@/features/champions/types';
import useChampions from '@/hooks/useChampions';
export interface IForm {
  team: string;
  tournament: string;
  year: number;
}
interface AddChampionFormProps {
  cancelAddChampion: () => void;
  setMessage: (message: string | null) => void;
  teams: ReturnedTeam[] | undefined;
}

const AddChampionForm: React.FC<AddChampionFormProps> = ({
  cancelAddChampion,
  setMessage,
  teams,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    defaultValues: {
      team: '',
      tournament: '',
      year: new Date().getFullYear(),
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createChampion } = useChampions();

  const onSubmit = async (data: IForm) => {
    try {
      setIsLoading(true);
      createChampion(data);
      setIsLoading(false);
      setMessage('Campeón agregado correctamente');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      reset(); // limpia el formulario
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

  const handleCancel = () => {
    reset(); // limpia el formulario
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
        <Controller
          name='team'
          control={control}
          rules={{ required: 'El equipo es obligatorio' }}
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              labelId='team-select-label'
              error={!!errors.team}
              MenuProps={{
                slotProps: {
                  paper: { sx: { backgroundColor: '#00313e' } },
                },
              }}
            >
              {teams.map((t) => (
                <MenuItem key={t._id} value={t._id}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.team && <p style={{ color: 'red' }}>{errors.team.message}</p>}
        <InputLabel id='tournament-select-label'>Torneo</InputLabel>
        <Controller
          name='tournament'
          control={control}
          rules={{ required: 'El torneo es obligatorio' }}
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              labelId='tournament-select-label'
              error={!!errors.tournament}
              MenuProps={{
                slotProps: {
                  paper: { sx: { backgroundColor: '#00313e' } },
                },
              }}
            >
              <MenuItem value='Apertura'>Apertura</MenuItem>
              <MenuItem value='Clausura'>Clausura</MenuItem>
            </Select>
          )}
        />
        {errors.tournament && (
          <p style={{ color: 'red' }}>{errors.tournament.message}</p>
        )}
        <InputLabel id='year-label'>Año</InputLabel>
        <Controller
          name='year'
          control={control}
          rules={{
            required: 'El año es obligatorio',
            min: { value: 1900, message: 'El año debe ser mayor a 1900' },
            max: {
              value: new Date().getFullYear(),
              message: 'El año no puede ser futuro',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type='number'
              fullWidth
              margin='normal'
              error={!!errors.year}
              helperText={errors.year?.message}
            />
          )}
        />

        <DialogActions>
          <Button onClick={handleCancel} color='secondary' variant='contained'>
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
