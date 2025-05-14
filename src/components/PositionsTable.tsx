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
  TablePagination,
  TableRow,
  TableSortLabel,
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
} from '@mui/material';
import { useSession } from 'next-auth/react'; // ✅ para saber si hay sesión
import EditIcon from '@mui/icons-material/Edit'; // ✅ ícono de edición
import DeleteIcon from '@mui/icons-material/Delete'; // ✅ ícono de eliminado
import IconButton from '@mui/material/IconButton'; // ✅ botón icónico

interface Team {
  _id: string;
  name: string;
  badge?: string;
  score: number;
}

interface PositionsTableProps {
  teams: Team[];
  refreshTeams: () => void;
  refreshMatches: () => void;
}

type Order = 'asc' | 'desc';

const PositionsTable: React.FC<PositionsTableProps> = ({ teams, refreshTeams, refreshMatches }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Team>('score');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [idToFetch, setIdToFetch] = useState<string | null>(null);
  const { data: session } = useSession(); // ✅
  const isLoggedIn = !!session; // ✅ true si hay sesión

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleSort = (property: keyof Team) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id: string) => {
    console.log('Editar equipo', id);
    // Acá iría la lógica de abrir modal o redirigir
  };

  const handleDelete = (id: string) => {
    setIdToFetch(id);
    setOpen(true);
  };
  const confirmDelete = async () => {
    if (idToFetch) {
      console.log('Eliminar equipo', idToFetch);
      const res = await fetch(`/api/teams/${idToFetch}`, {
        method: 'DELETE'
      })
      if(res.ok){
        refreshTeams();
        refreshMatches();
      }
    }
    setOpen(false);
    setIdToFetch(null);
  };

  const cancelDelete = () => {
    setOpen(false);
    setIdToFetch(null);
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    const valA = a[orderBy];
    const valB = b[orderBy];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return order === 'asc' ? valA - valB : valB - valA;
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return order === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return 0;
  });

  const paginatedTeams = sortedTeams.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: isMobile ? '100%' : 700,
        margin: 'auto',
        mt: 4,
        p: isMobile ? 1 : 2,
        overflowX: 'auto',
      }}
    >
      <Typography variant='h4' align='center' sx={{ mb: 2 }}>
        Tabla de Posiciones
      </Typography>

      <TextField
        label='Buscar equipo'
        variant='outlined'
        size='small'
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      <Table size={isMobile ? 'small' : 'medium'}>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Posición</strong>
            </TableCell>
            <TableCell sortDirection={orderBy === 'name' ? order : false}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleSort('name')}
              >
                <strong>Equipo</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'score' ? order : false}>
              <TableSortLabel
                active={orderBy === 'score'}
                direction={orderBy === 'score' ? order : 'asc'}
                onClick={() => handleSort('score')}
              >
                <strong>Puntaje</strong>
              </TableSortLabel>
            </TableCell>
            {isLoggedIn && (
              <TableCell>
                <strong>Acciones</strong>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedTeams.map((team, index) => (
            <TableRow key={team._id}>
              <TableCell>{page * rowsPerPage + index + 1}</TableCell>
              <TableCell>
                <Box display='flex' alignItems='center' gap={1}>
                  {team.badge && (
                    <Avatar
                      src={team.badge}
                      alt={team.name}
                      sx={{ width: 24, height: 24 }}
                    />
                  )}
                  <span>{team.name}</span>
                </Box>
              </TableCell>
              <TableCell>{team.score}</TableCell>
              {isLoggedIn && (
                <TableCell>
                  <IconButton onClick={() => handleEdit(team._id)} size='small'>
                    <EditIcon fontSize='small' />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(team._id)}
                    size='small'
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
          {paginatedTeams.length === 0 && (
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

      <Box display='flex' justifyContent='flex-end'>
        <TablePagination
          component='div'
          count={sortedTeams.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage='Filas por página'
        />
      </Box>
      <Dialog open={open} onClose={cancelDelete}>
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <DialogContent>
          Esta acción eliminará el equipo permanentemente.
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancelar</Button>
          <Button onClick={confirmDelete} color='error' variant='contained'>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default PositionsTable;
