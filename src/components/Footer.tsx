'use client';

import React from 'react';
import { Box, Typography, Container, Link as MuiLink } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import { Mail } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component='footer' sx={{ backgroundColor: '#f5f5f5', py: 3, mt: 'auto' }}>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant='body2' color='textSecondary'>
           &copy; {new Date().getFullYear()} Desarrollado por Caro Serrano
        </Typography>
        <div style={{display: 'flex', justifyContent: 'end'}}>
        {/* <MuiLink
          href='https://www.linkedin.com/in/paula-carolina-serrano'
          target='_blank'
          rel='noopener noreferrer'
          color='inherit'
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 3 }}
        >
          <Mail fontSize='large'/>
        </MuiLink> */}
        <MuiLink
          href='https://www.linkedin.com/in/paula-carolina-serrano'
          target='_blank'
          rel='noopener noreferrer'
          color='primary'
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          <LinkedInIcon fontSize='large' />
        </MuiLink>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;
