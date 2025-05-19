'use client';

import React from 'react';
import { Box, Typography, Container, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{ backgroundColor: '#c5d8de', py: 2, mt: 'auto' }}
    >
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
          &copy; {new Date().getFullYear()} Desarrollado por{' '}
          <MuiLink
            href='https://www.linkedin.com/in/paula-carolina-serrano'
            target='_blank'
            rel='noopener noreferrer'
            underline='hover'
          >
            Caro Serrano
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
