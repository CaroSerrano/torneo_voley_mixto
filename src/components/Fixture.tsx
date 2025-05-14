'use client';
import { ITeam } from '@/features/teams/types';
import { ReturnedMatch } from '@/features/matches/types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Box,
} from '@mui/material';

interface FixtureProps {
  matches: ReturnedMatch[];
}

const Fixture: React.FC<FixtureProps> = ({ matches }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h4' gutterBottom align='center' color='primary.contrastText'>
        Fixture
      </Typography>
      {matches.length === 0 && (
        <Typography variant='h6' align='center'>Aún no hay partidos</Typography>
      )}
      {matches.length > 0 && (
        <Grid container spacing={2}>
          {matches.map((match) => (
            <Grid size={{ xs: 12}} display='flex' justifyContent='center' key={match._id}>
              <Card sx={{ width: '100%', maxWidth: 1200 }}>
                <CardContent>
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    gutterBottom
                  >
                    {new Date(match.date).toLocaleString('es-AR', {weekday: 'long', year:'numeric', month: 'long', day:'numeric', hour12: false, hour:'2-digit', minute: '2-digit'})}
                  </Typography>
                  <Grid
                    container
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <TeamDisplay team={match.teamA} />
                    <Typography variant='h6' sx={{ mx: 2 }}>
                      {match.teamAscore || 0} -{' '}
                      {match.teamBscore || 0}
                    </Typography>
                    <TeamDisplay team={match.teamB} reverse />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
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
