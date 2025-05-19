'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ReturnedMatch } from '@/features/matches/types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
  Alert,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddMatchForm from './AddMatchForm';
import UpdateMatchForm from './UpdateMatchForm';
import TeamDisplay from './FixtureTeamDisplay';
import useMatches from '@/hooks/useMatches';
import useTeams from '@/hooks/useTeams';
import DeleteModal from './DeleteModal';

const Fixture: React.FC = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [open, setOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [matchToUpdate, setMatchToUpdate] = useState<ReturnedMatch | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);
  const [selectedMatchday, setSelectedMatchday] = useState(1);
  const { matches, isLoadingMatches, isErrorMatches, deleteMatch } =
    useMatches();
  const { teams, isLoadingTeams, isErrorTeams } = useTeams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleUpdate = async (id: string) => {
    const matchFound = matches?.find((m) => m._id === id);
    if (matchFound) {
      setMatchToUpdate(matchFound);
      setUpdateModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    setOpen(true);
    setIdToDelete(id);
  };

  const handlePrevMatchday = () => {
    if (selectedMatchday > 1) setSelectedMatchday((prev) => prev - 1);
  };

  const handleNextMatchday = () => {
    if (selectedMatchday < 9) setSelectedMatchday((prev) => prev + 1);
  };
  const confirmDelete = async () => {
    if (idToDelete) {
      try {
        await deleteMatch(idToDelete);
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
    setIdToDelete(null);
  };

  const cancelDelete = () => {
    setOpen(false);
    setIdToDelete(null);
  };

  const cancelUpdate = () => {
    setUpdateModalOpen(false);
    setMatchToUpdate(null);
  };

  const cancelAddMatch = () => {
    setAddModalOpen(false);
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

  const filteredMatches = matches.filter(
    (match) => match.matchday === selectedMatchday
  );

  return (
    <Box sx={{ p: 2, mb: 5 }}>
      {error && (
        <Box display='flex' justifyContent='center' mb={2}>
          <Alert severity='error' sx={{ maxWidth: 400, width: 'fit-content' }}>
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
      <Box sx={{ justifyItems: 'center' }}>
        <Typography
          variant={isMobile ? 'h6' : 'h4'}
          gutterBottom
          align='center'
          color='primary.contrastText'
        >
          Fixture
        </Typography>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          gap={2}
          my={2}
        >
          <IconButton
            onClick={handlePrevMatchday}
            disabled={selectedMatchday === 1}
          >
            <ArrowBackIosNewIcon sx={{ color: 'white' }} />
          </IconButton>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={selectedMatchday}
              onChange={(e) => setSelectedMatchday(Number(e.target.value))}
              displayEmpty
              size='small'
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#9b7b1b',
                    color: 'white',
                  },
                },
              }}
              sx={{
                backgroundColor: '#9b7b1b',
                color: 'white',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
                '& fieldset': {
                  border: 'none',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
            >
              {[...Array(9)].map((_, i) => (
                <MenuItem
                  key={i + 1}
                  value={i + 1}
                  sx={{
                    backgroundColor: '#9b7b1b',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#675212',
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#675212 !important',
                      color: 'white',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: '#675212',
                    },
                  }}
                >
                  <strong>Fecha {i + 1}</strong>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            onClick={handleNextMatchday}
            disabled={selectedMatchday === 9}
          >
            <ArrowForwardIosIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        {isLoggedIn && (
          <Button
            color='secondary'
            variant='contained'
            sx={{ color: 'secondary.contrastText', my: 2 }}
            onClick={() => setAddModalOpen(true)}
          >
            Agregar partido
          </Button>
        )}
      </Box>
      {filteredMatches.length === 0 && (
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          align='center'
          color='primary.contrastText'
        >
          Aún no hay partidos
        </Typography>
      )}
      {filteredMatches.length > 0 && (
        <Grid container spacing={2}>
          {filteredMatches.map((match: ReturnedMatch) => (
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
                      onClick={() => handleUpdate(match._id)}
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
                    {match.date
                      ? new Date(match.date).toLocaleString('es-AR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour12: false,
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'A confirmar'}
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
            </Grid>
          ))}
        </Grid>
      )}
      <DeleteModal
        open={open}
        cancelDelete={cancelDelete}
        confirmMessage='Esta acción eliminará el partido definitivamente'
        confirmDelete={confirmDelete}
      />
      <AddMatchForm
        open={addModalOpen}
        teams={teams}
        cancelAddMatch={() => cancelAddMatch()}
        setMessage={setMessage}
      />
      {matchToUpdate && (
        <UpdateMatchForm
          open={updateModalOpen}
          match={matchToUpdate}
          cancelUpdate={cancelUpdate}
          setMessage={setMessage}
        />
      )}
    </Box>
  );
};

export default Fixture;
