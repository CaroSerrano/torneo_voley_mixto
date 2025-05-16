import { ReturnedChampion } from '@/features/champions/types';
import useChampions from '@/hooks/useChampions';
import { useSession } from 'next-auth/react';

import {
  Alert,
  Box,
  CircularProgress,
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

const ChampionsTable: React.FC = () => {
  const { champions, isErrorChampions, isLoadingChampions } = useChampions();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const handleEdit = () => {
    console.log('editando');
  };

  const handleDelete = (id: string) => {
    console.log('borrando', id);
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
            backgroundColor: '#831506',
            '&:hover': {
              backgroundColor: '#c04437',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      )}
      <Typography variant='h5' align='center' sx={{ p: 2 }}>
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
              <TableCell>{champion.team}</TableCell>
              <TableCell>{champion.tournament}</TableCell>
              <TableCell>{champion.year}</TableCell>
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
    </Box>
  );
};

export default ChampionsTable;
