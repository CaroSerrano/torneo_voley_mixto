'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ITeam } from '@/features/teams/types';
import { ReturnedMatch } from '@/features/matches/types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddMatchForm from './AddMatchForm';
import UpdateMatchForm from './UpdateMatchForm';
import useMatches from '@/hooks/useMatches';
import useTeams from '@/hooks/useTeams';

const Fixture: React.FC = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idToFetch, setIdToFetch] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { matches, isLoadingMatches, isErrorMatches } = useMatches();
  const { teams, isLoadingTeams, isErrorTeams } = useTeams();

  const handleEdit = (id: string) => {
    console.log('Editar equipo', id);
    setIdToFetch(id);
    setUpdateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setOpen(true);
    setIdToFetch(id);
  };

  const confirmDelete = async () => {
    if (idToFetch) {
      try {
        await fetch(`/api/matches/${idToFetch}`, {
          method: 'DELETE',
        });
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setTimeout(() => {
            setError(null);
          }, 3000);
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
    setUpdateModalOpen(false);
    setIdToFetch(null);
  };

  const cancelAddMatch = () => {
    setModalOpen(false);
    setIdToFetch(null);
  };

  if (isLoadingMatches || isLoadingTeams) {
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

  if (isErrorMatches || isErrorTeams) {
    return <Alert severity='error'>Ocurrió un error al cargar los datos</Alert>;
  }

  if (!matches || !teams) {
    return <Alert severity='warning'>Datos no disponibles</Alert>;
  }

  return (
    <Box sx={{ p: 2, mb: 5 }}>
      {error && <Alert severity='error'>{error}</Alert>}
      {message && <Alert severity='success'>{message}</Alert>}
      <Box sx={{ justifyItems: 'center' }}>
        <Typography
          variant='h4'
          gutterBottom
          align='center'
          color='primary.contrastText'
        >
          Fixture
        </Typography>
        {isLoggedIn && (
          <Button
            color='secondary'
            variant='contained'
            sx={{ color: 'secondary.contrastText', my: 2 }}
            onClick={() => setModalOpen(true)}
          >
            Agregar partido
          </Button>
        )}
      </Box>
      {matches.length === 0 && (
        <Typography variant='h6' align='center' color='primary.contrastText'>
          Aún no hay partidos
        </Typography>
      )}
      {matches.length > 0 && (
        <Grid container spacing={2}>
          {matches.map((match: ReturnedMatch) => (
            <Grid
              size={{ xs: 12 }}
              display='flex'
              justifyContent='center'
              key={match._id}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 1200,
                  position: 'relative',
                  backgroundColor: '#00313e',
                  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
                }}
              >
                {isLoggedIn && (
                  <Box
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                  >
                    <IconButton
                      onClick={() => handleEdit(match._id)}
                      size='small'
                    >
                      <EditIcon fontSize='small' sx={{ color: '#cddde2' }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(match._id)}
                      size='small'
                    >
                      <DeleteIcon fontSize='small' sx={{ color: '#cddde2' }} />
                    </IconButton>
                  </Box>
                )}
                <CardContent>
                  <Typography variant='subtitle1' gutterBottom>
                    {new Date(match.date).toLocaleString('es-AR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                  <Grid
                    container
                    alignItems='center'
                    justifyContent='center'
                    sx={{ position: 'relative' }}
                  >
                    <Box sx={{ position: 'absolute', left: 0 }}>
                      <TeamDisplay team={match.teamA} />
                    </Box>

                    <Typography variant='h6' sx={{ mx: 2 }}>
                      {match.teamAscore || 0} - {match.teamBscore || 0}
                    </Typography>

                    <Box sx={{ position: 'absolute', right: 0 }}>
                      <TeamDisplay team={match.teamB} reverse />
                    </Box>
                  </Grid>
                </CardContent>
              </Card>
              <Dialog open={updateModalOpen} onClose={cancelUpdate}>
                <DialogTitle sx={{ bgcolor: '#134755' }}>
                  Actualizar partido
                </DialogTitle>
                <UpdateMatchForm
                  match={match}
                  cancelUpdate={cancelUpdate}
                  setMessage={setMessage}
                />
              </Dialog>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={open} onClose={cancelDelete}>
        <DialogTitle sx={{ bgcolor: '#134755' }}>¿Estás seguro?</DialogTitle>
        <DialogContent sx={{ bgcolor: '#00313e' }}>
          Esta acción eliminará el partido permanentemente.
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#00313e' }}>
          <Button onClick={cancelDelete} color='secondary' variant='contained'>
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color='error' variant='contained'>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={modalOpen} onClose={cancelAddMatch}>
        <DialogTitle sx={{ bgcolor: '#134755' }}>Añadir partido</DialogTitle>
        <AddMatchForm
          teams={teams}
          cancelAddMatch={cancelAddMatch}
          setMessage={setMessage}
        />
      </Dialog>
    </Box>
  );
};

function TeamDisplay({
  team,
  reverse = false,
}: {
  team: ITeam;
  reverse?: boolean;
}) {
  return (
    <Box
      display='flex'
      alignItems='center'
      flexDirection={reverse ? 'row-reverse' : 'row'}
    >
      <Avatar
        src={team.badge}
        alt={team.name}
        sx={{ width: 40, height: 40, mx: 1, bgcolor: '#d4d8da' }}
      />
      <Typography variant='subtitle1' sx={{ mx: 1 }}>
        {team.name}
      </Typography>
    </Box>
  );
}

export default Fixture;
