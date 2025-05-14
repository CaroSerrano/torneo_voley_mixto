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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // ✅ ícono de edición
import DeleteIcon from '@mui/icons-material/Delete'; // ✅ ícono de eliminado
import IconButton from '@mui/material/IconButton'; // ✅ botón icónico

interface FixtureProps {
  matches: ReturnedMatch[];
  refreshMatches: () => void;
}

const Fixture: React.FC<FixtureProps> = ({ matches, refreshMatches }) => {
  const { data: session } = useSession();
  const isLoggedIn = !!session; // ✅ true si hay sesión
  const [open, setOpen] = useState(false);
  const [idToFetch, setIdToFetch] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    console.log('Editar equipo', id);
    // Acá iría la lógica de abrir modal o redirigir
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/matches/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      refreshMatches();
    } else {
      alert('Error al eliminar el partido');
    }
  };

  const confirmDelete = async () => {
    if (idToFetch) {
      console.log('Eliminar partido', idToFetch);
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/matches/${idToFetch}`,
        {
          method: 'DELETE',
        }
      );
    }
    setOpen(false);
    setIdToFetch(null);
  };

  const cancelDelete = () => {
    setOpen(false);
    setIdToFetch(null);
  };
  return (
    <Box sx={{ p: 2, mb: 5 }}>
      <Typography
        variant='h4'
        gutterBottom
        align='center'
        color='primary.contrastText'
      >
        Fixture
      </Typography>
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
