'use client'
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
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ReturnedTeam, Status } from '@/features/teams/types';
import useTeams from '@/hooks/useTeams';

interface UpdateTeamFormProps {
  open: boolean;
  team: ReturnedTeam;
  cancelUpdate: () => void;
  setMessage: (message: string | null) => void;
}

interface FormData {
  name: string;
  score: number;
  matchesPlayed?: number;
  status?: Status;
}

const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({
  open,
  team,
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
      name: team.name,
      score: team.score,
      matchesPlayed: team.matchesPlayed,
      status: team.status,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>(team.status);
  const { updateTeam } = useTeams();

  const onSubmit = async (data: FormData) => {
    try {
      await updateTeam(team._id, data);
      setMessage('Equipo actualizado correctamente');
      cancelUpdate();
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
      cancelUpdate();
    }
  };

  return (
    <Dialog open={open} onClose={cancelUpdate}>
      <DialogTitle sx={{ bgcolor: '#134755' }}>Actualizar equipo</DialogTitle>
      <DialogContent sx={{ bgcolor: '#00313e' }}>
        {error && <Alert severity='error'>{error}</Alert>}
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label='Nombre'
            fullWidth
            margin='normal'
            {...register('name', {
              minLength: {
                value: 2,
                message:
                  'El nombre del equipo debe tener al menos 2 caracteres',
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
          <TextField
            label='Partidos jugados'
            type='number'
            fullWidth
            margin='normal'
            {...register('matchesPlayed', {
              valueAsNumber: true,
            })}
            error={!!errors.score}
            helperText={errors.score?.message}
          />
          <Select
            fullWidth
            labelId='Status'
            {...register('status')}
            error={!!errors.status}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            MenuProps={{
              slotProps: { paper: { sx: { backgroundColor: '#00313e' } } },
            }}
          >
            <MenuItem value='ACTIVE'>Activo</MenuItem>
            <MenuItem value='INACTIVE'>Inactivo</MenuItem>
          </Select>

          <DialogActions>
            <Button
              onClick={() => {
                cancelUpdate();
                reset();
              }}
              variant='contained'
              color='secondary'
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

export default UpdateTeamForm;
