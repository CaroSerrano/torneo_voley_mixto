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
  // TextField,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import UpdateTeamForm from './UpdateTeamForm';
import useTeams from '@/hooks/useTeams';
import DeleteModal from './DeleteModal';
import { ReturnedTeam } from '@/features/teams/types';

const PositionsTable: React.FC = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [idToFetch, setIdToFetch] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [teamToUpdate, setTeamToUpdate] = useState<ReturnedTeam | null>(null);
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const { teams, isLoadingTeams, isErrorTeams, deleteTeam } = useTeams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEdit = (id: string) => {
    const team = teams?.find((t) => t._id === id);
    if (team) {
      setTeamToUpdate(team);
      setModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setIdToFetch(id);
    setOpen(true);
  };
  const confirmDelete = async () => {
    if (idToFetch) {
      try {
        await deleteTeam(idToFetch);
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
    setTeamToUpdate(null);
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

  const filteredTeams = teams.filter(
    (team: ReturnedTeam) => team.status === 'ACTIVE'
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
        <Typography
          variant={isMobile ? 'h6' : 'h4'}
          align='center'
          sx={{ mb: 2 }}
        >
          Tabla de Posiciones
        </Typography>
        {error && (
          <Box display='flex' justifyContent='center' mb={2}>
            <Alert
              severity='error'
              sx={{ maxWidth: 400, width: 'fit-content' }}
            >
              {error}
            </Alert>
          </Box>
        )}
        {message && (
          <Box display='flex' justifyContent='center' mb={2}>
            <Alert
              severity='success'
              sx={{ maxWidth: 400, width: 'fit-content' }}
            >
              {message}
            </Alert>
          </Box>
        )}
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
                    <Avatar
                      src={team.badge}
                      alt={team.name}
                      sx={{ width: 28, height: 28, bgcolor: '#d4d8da' }}
                    >
                      {team.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <span>{team.name}</span>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white' }}>{team.score}</TableCell>
                {isLoggedIn && (
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(team._id)}
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
              </TableRow>
            ))}
            {filteredTeams.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  <Typography variant='body2' color='text.primary'>
                    No se encontraron equipos
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DeleteModal
          open={open}
          cancelDelete={() => cancelDelete()}
          confirmMessage='Esta acción eliminará el equipo definitivamente'
          confirmDelete={confirmDelete}
        />
        {teamToUpdate && (
          <UpdateTeamForm
            open={modalOpen}
            team={teamToUpdate}
            cancelUpdate={cancelUpdate}
            setMessage={setMessage}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default PositionsTable;
