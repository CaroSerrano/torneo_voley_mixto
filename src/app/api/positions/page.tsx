'use client';

import React, { useEffect, useState } from 'react';
import PositionsTable from '@/components/PositionsTable';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function PosicionesPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch('/api/teams');
        if (!res.ok) throw new Error('Error al obtener los equipos');
        const data = await res.json();
        setTeams(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <Box mt={4} display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} textAlign='center'>
        <Typography color='error'>{error}</Typography>
      </Box>
    );
  }

  return <PositionsTable teams={teams} />;
}
