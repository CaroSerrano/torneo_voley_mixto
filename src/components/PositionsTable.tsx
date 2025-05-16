'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import UpdateTeamForm from './UpdateTeamForm';
import { ReturnedTeam } from '@/features/teams/types';
import useTeams from '@/hooks/useTeams';

const PositionsTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [idToFetch, setIdToFetch] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const { teams, isLoadingTeams, isErrorTeams } = useTeams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setIdToFetch(id);
    setOpen(true);
  };
  const confirmDelete = async () => {
    if (idToFetch) {
      try {
        console.log('Eliminar equipo', idToFetch);
        await fetch(`/api/teams/${idToFetch}`, {
          method: 'DELETE',
        });
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
    setOpen(false);
    setIdToFetch(null);
  };

  const cancelDelete = () => {
    setOpen(false);
    setIdToFetch(null);
  };

  const cancelUpdate = () => {
    setModalOpen(false);
  };

  if (isLoadingTeams) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='60vh'
      >
        <CircularProgress color='secondary' />
      </Box>
    );
  }

  if (isErrorTeams) {
    return <Alert severity='error'>Ocurrió un error al cargar los datos</Alert>;
  }

  if (!teams) {
    return <Alert severity='warning'>Datos no disponibles</Alert>;
  }

  const filteredTeams = teams.filter((team: ReturnedTeam) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box px={{ xs: 2, sm: 4, md: 0 }}>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#00313e',
          maxWidth: isMobile ? '100%' : 700,
          margin: 'auto',
          mt: 4,
          p: isMobile ? 1 : 2,
          boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
          overflowX: 'auto',
        }}
      >
        <Typography variant='h4' align='center' sx={{ mb: 2 }}>
          Tabla de Posiciones
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        {message && <Alert severity='success'>{message}</Alert>}

        <TextField
          label='Buscar equipo'
          variant='outlined'
          size='small'
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            mb: 2,
            input: { color: 'white' },
            label: { color: 'white' },
            '& label.Mui-focused': { color: 'white' }, // label cuando está enfocado
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#d4d8da', // borde por defecto
              },
              '&:hover fieldset': {
                borderColor: 'white', // borde al hacer hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // borde cuando está enfocado
              },
            },
          }}
        />

        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Posición</strong>
              </TableCell>
              <TableCell>
                <strong>Equipo</strong>
              </TableCell>
              <TableCell>
                <strong>Puntaje</strong>
              </TableCell>
              {isLoggedIn && (
                <TableCell>
                  <strong>Acciones</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeams.map((team, index) => (
              <TableRow key={team._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box display='flex' alignItems='center' gap={1}>
                    {team.badge && (
                      <Avatar
                        src={team.badge}
                        alt={team.name}
                        sx={{ width: 24, height: 24, bgcolor: '#d4d8da' }}
                      />
                    )}
                    <span>{team.name}</span>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white' }}>{team.score}</TableCell>
                {isLoggedIn && (
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit()}
                      size='small'
                      sx={{ color: '#cddde2' }}
                    >
                      <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(team._id)}
                      size='small'
                      sx={{ color: '#cddde2' }}
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </TableCell>
                )}
                <Dialog open={modalOpen} onClose={cancelUpdate}>
                  <DialogTitle sx={{ bgcolor: '#134755' }}>
                    Actualizar equipo
                  </DialogTitle>
                  <UpdateTeamForm
                    team={team}
                    cancelUpdate={cancelUpdate}
                    setMessage={setMessage}
                  />
                </Dialog>
              </TableRow>
            ))}
            {filteredTeams.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  <Typography variant='body2' color='text.secondary'>
                    No se encontraron equipos
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Dialog open={open} onClose={cancelDelete}>
          <DialogTitle sx={{ bgcolor: '#134755' }}>¿Estás seguro?</DialogTitle>
          <DialogContent sx={{ bgcolor: '#00313e' }}>
            Esta acción eliminará el equipo permanentemente.
          </DialogContent>
          <DialogActions sx={{ bgcolor: '#00313e' }}>
            <Button
              onClick={cancelDelete}
              color='secondary'
              variant='contained'
            >
              Cancelar
            </Button>
            <Button onClick={confirmDelete} color='error' variant='contained'>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </Box>
  );
};

export default PositionsTable;
