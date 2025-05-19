import { ITeam } from '@/features/teams/types';
import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material';

function TeamDisplay({
  team,
  reverse = false,
}: {
  team: ITeam;
  reverse?: boolean;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      display='flex'
      alignItems='center'
      flexDirection={reverse ? 'row-reverse' : 'row'}
    >
      <Avatar
        src={team.badge}
        alt={team.name}
        sx={{ width: isMobile ? 30 : 40, height: isMobile ? 30 : 40, mx: 1, bgcolor: '#d4d8da' }}
      >
        {team.name?.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant='subtitle1' sx={{ mx: 1 }}>
        {team.name}
      </Typography>
    </Box>
  );
}

export default TeamDisplay;
