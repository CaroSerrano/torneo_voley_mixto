'use client';

import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Torneo voley mixto
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} href="#positions">
              Tabla
            </Button>
            <Button color="inherit" component={Link} href="#fixture">
              Fixture
            </Button>
            <Button color="inherit" component={Link} href="#login">
              Iniciar sesión
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
