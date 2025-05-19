import { ReturnedChampion } from '@/features/champions/types';
import useChampions from '@/hooks/useChampions';
import { useSession } from 'next-auth/react';

import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useTeams from '@/hooks/useTeams';
import { useState } from 'react';
import AddChampionForm from './AddChampionForm';
import DeleteModal from './DeleteModal';
import UpdateChampionForm from './UpdateChampionForm';

const ChampionsTable: React.FC = () => {
  const { champions, isErrorChampions, isLoadingChampions, deleteChampion } =
    useChampions();
  const { teams } = useTeams();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [championToEdit, setChampionToEdit] = useState<ReturnedChampion | null>(
    null
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const handleEdit = (id: string) => {
    const championToEdit = champions?.find((c) => c._id === id);
    if (championToEdit) {
      setChampionToEdit(championToEdit);
      setOpenUpdateModal(true);
    }
  };

  const handleDelete = (id: string) => {
    setIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const cancelDelete = () => {
    setOpenDeleteModal(false);
    setIdToDelete(null);
  };

  const cancelUpdate = () => {
    setOpenUpdateModal(false);
    setChampionToEdit(null);
  };

  const confirmDelete = async () => {
    if (idToDelete) {
      try {
        await deleteChampion(idToDelete);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      }
    }
    setOpenDeleteModal(false);
    setIdToDelete(null);
  };

  if (isLoadingChampions) {
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

  if (isErrorChampions) {
    return <Alert severity='error'>Ocurrió un error al cargar los datos</Alert>;
  }

  if (!champions) {
    return <Alert severity='warning'>Datos no disponibles</Alert>;
  }
  return (
    <Box px={{ xs: 2, sm: 4, md: 0 }}>
      {error && <Alert severity='error'>{error}</Alert>}
      {message && <Alert severity='success'>{message}</Alert>}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#00313e',
          maxWidth: isMobile ? '100%' : 700,
          margin: 'auto',
          mt: 20,
          p: isMobile ? 1 : 2,
          boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
          overflowX: 'auto',
        }}
      >
        {isLoggedIn && (
          <IconButton
            sx={{
              color: 'secondary.contrastText',
              backgroundColor: '#9b7b1b',
              '&:hover': {
                backgroundColor: '#675212',
              },
              mb: 1,
            }}
            onClick={() => setOpenModal(true)}
          >
            <AddIcon />
          </IconButton>
        )}
        <Typography
          variant='h5'
          align='center'
          sx={{ p: 1, backgroundColor: '#9b7b1b', borderRadius: 1 }}
        >
          Campeones por Torneo
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Equipo</strong>
              </TableCell>
              <TableCell>
                <strong>Torneo</strong>
              </TableCell>
              <TableCell>
                <strong>Año</strong>
              </TableCell>
              {isLoggedIn && (
                <TableCell>
                  <strong>Acciones</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {champions.map((champion: ReturnedChampion) => (
              <TableRow key={champion._id}>
                <TableCell>
                  <Box display='flex' alignItems='center' gap={1}>
                    {champion.team.badge && (
                      <Avatar
                        src={champion.team.badge}
                        alt={champion.team.name}
                        sx={{ width: 28, height: 28, bgcolor: '#d4d8da' }}
                      />
                    )}
                    <span>{champion.team.name}</span>
                  </Box>
                </TableCell>
                <TableCell>{champion.tournament}</TableCell>
                <TableCell>{champion.year}</TableCell>
                {isLoggedIn && (
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(champion._id)}
                      size='small'
                      sx={{ color: '#cddde2' }}
                    >
                      <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(champion._id)}
                      size='small'
                      sx={{ color: '#cddde2' }}
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle sx={{ bgcolor: '#134755' }}>
          Agregar un campeón
        </DialogTitle>
        <AddChampionForm
          teams={teams}
          cancelAddChampion={() => setOpenModal(false)}
          setMessage={setMessage}
        />
      </Dialog>
      {championToEdit && (
        <Dialog
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
        >
          <DialogTitle sx={{ bgcolor: '#134755' }}>
            Actualizar campeón
          </DialogTitle>
          <UpdateChampionForm
            open={openUpdateModal}
            teams={teams}
            cancelUpdateChampion={cancelUpdate}
            setMessage={setMessage}
            champion={championToEdit}
          />
        </Dialog>
      )}
      <DeleteModal
        open={openDeleteModal}
        cancelDelete={cancelDelete}
        confirmMessage='Esta acción eliminará definitivamente este campeón'
        confirmDelete={confirmDelete}
      />
    </Box>
  );
};

export default ChampionsTable;
