import useTeams from '@/hooks/useTeams';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import useBracket from '@/hooks/useBracket';
import { ReturnedTeam } from '@/features/teams/types';

function Bracket() {
  const { teams, isLoadingTeams, isErrorTeams } = useTeams();
  const { bracket, createBracket, updateBracket } = useBracket();
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const [selections, setSelections] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (bracket && bracket.length > 0) {
      const initialSelections: Record<number, string> = {};
      bracket.forEach((b) => {
        initialSelections[b.position] = b.teamName;
      });
      setSelections(initialSelections);
    }
  }, [bracket]);

  const handleSelectChange =
    (index: number) => async (event: SelectChangeEvent<string>) => {
      const selectedTeam = event.target.value;

      setSelections((prev) => ({ ...prev, [index]: selectedTeam }));

      const existing = bracket?.find((b) => b.position === index);

      try {
        if (existing) {
          await updateBracket(existing._id, {
            position: index,
            teamName: selectedTeam,
          });
        } else {
          await createBracket({
            position: index,
            teamName: selectedTeam,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

  const renderSelect = (index: number, marginTop: number = 0) => {
    const selectedValue = selections[index] || '';
    const teamName = teams?.find((team) => team.name === selectedValue)?.name;

    return (
      <Box key={index} display='flex' alignItems='center' mt={marginTop} mb={1}>
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
        {isLoggedIn ? (
          <FormControl size='small' sx={{ minWidth: 200 }}>
            <Select
              displayEmpty
              value={selectedValue}
              onChange={handleSelectChange(index)}
              renderValue={(selected) => selected || ''}
              sx={{ backgroundColor: '#00313e' }}
            >
              <MenuItem value=''>
                <em>Seleccionar</em>
              </MenuItem>
              {teams?.map((team: ReturnedTeam) => (
                <MenuItem key={team._id} value={team.name}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Typography
            sx={{
              minWidth: 200,
              py: 1,
              px: 2,
              border: '1px solid white',
              borderRadius: 1,
              backgroundColor: '#00313e',
            }}
          >
            {teamName || '-'}
          </Typography>
        )}
      </Box>
    );
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

  return (
    <Box
      sx={{
        overflowX: 'auto',
        maxWidth: 'calc(100vw - 40px)',
        width: 'auto',
        px: 2,
        mx: 'auto',
        mb: 10,
      }}
    >
      <Box
        display='flex'
        flexDirection='row'
        flexWrap='nowrap'
        justifyContent='center'
        gap={4}
        p={2}
        mt={20}
        sx={{ minWidth: 900 }}
      >
        {/* Cuartos de final: 8 equipos (0-7) */}
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography
            variant='h6'
            sx={{
              minWidth: 150,
              textAlign: 'center',
              borderRadius: 2,
              backgroundColor: '#9b7b1b',
            }}
          >
            Cuartos
          </Typography>
          {[...Array(8)].map((_, idx) =>
            renderSelect(idx, idx % 2 === 0 ? 2 : 0)
          )}
        </Box>

        {/* Semifinal: 4 equipos (8-11) */}
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Typography
            variant='h6'
            sx={{
              minWidth: 150,
              textAlign: 'center',
              borderRadius: 2,
              backgroundColor: '#9b7b1b',
            }}
          >
            Semis
          </Typography>
          {[...Array(4)].map((_, idx) =>
            renderSelect(idx + 8, idx % 2 === 0 ? 2 : 0)
          )}
        </Box>

        {/* Final: 2 equipos (12-13) */}
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Typography
            variant='h6'
            sx={{
              minWidth: 150,
              textAlign: 'center',
              borderRadius: 2,
              backgroundColor: '#9b7b1b',
            }}
          >
            Final
          </Typography>
          {[...Array(2)].map((_, idx) =>
            renderSelect(idx + 12, idx % 2 === 0 ? 2 : 0)
          )}
        </Box>

        {/* Ganador: 1 equipo (14) */}
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Typography
            variant='h6'
            sx={{
              minWidth: 150,
              textAlign: 'center',
              borderRadius: 2,
              backgroundColor: '#9b7b1b',
            }}
          >
            Ganador
          </Typography>
          {renderSelect(14, 3)}
        </Box>
      </Box>
    </Box>
  );
}

export default Bracket;
