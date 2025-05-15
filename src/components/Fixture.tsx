'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ITeam, ReturnedTeam } from '@/features/teams/types';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddMatchForm from './AddMatchForm';

interface FixtureProps {
  teams: ReturnedTeam[];
  matches: ReturnedMatch[];
  refreshMatches: () => void;
}

const Fixture: React.FC<FixtureProps> = ({
  matches,
  teams,
  refreshMatches,
}) => {
  const { data: session } = useSession();
  const isLoggedIn = !!session; // ✅ true si hay sesión
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idToFetch, setIdToFetch] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
        const res = await fetch(`/api/matches/${idToFetch}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          refreshMatches();
        }
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
          {matches.map((match) => (
            <Grid
              size={{ xs: 12 }}
              display='flex'
              justifyContent='center'
              key={match._id}
            >
              <Card
                sx={{ width: '100%', maxWidth: 1200, position: 'relative' }}
              >
                {isLoggedIn && (
                  <Box
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                  >
                    <IconButton
                      onClick={() => handleEdit(match._id)}
                      size='small'
                    >
                      <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(match._id)}
                      size='small'
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </Box>
                )}
                <CardContent>
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    gutterBottom
                  >
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
                    justifyContent='space-between'
                  >
                    <TeamDisplay team={match.teamA} />
                    <Typography variant='h6' sx={{ mx: 2 }}>
                      {match.teamAscore || 0} - {match.teamBscore || 0}
                    </Typography>
                    <TeamDisplay team={match.teamB} reverse />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={open} onClose={cancelDelete}>
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <DialogContent>
          Esta acción eliminará el partido permanentemente.
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancelar</Button>
          <Button onClick={confirmDelete} color='error' variant='contained'>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={modalOpen} onClose={cancelAddMatch}>
        <DialogTitle>Añadir partido</DialogTitle>
        <DialogContent>
          <AddMatchForm
            teams={teams}
            cancelAddMatch={cancelAddMatch}
            refreshMatches={refreshMatches}
            setMessage={setMessage}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={updateModalOpen} onClose={cancelUpdate}>
        <DialogTitle>Actualizar partido</DialogTitle>
        <DialogContent>Formulario</DialogContent>
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
        sx={{ width: 40, height: 40, mx: 1 }}
      />
      <Typography variant='subtitle1' sx={{ mx: 1 }}>
        {team.name}
      </Typography>
    </Box>
  );
}

export default Fixture;
