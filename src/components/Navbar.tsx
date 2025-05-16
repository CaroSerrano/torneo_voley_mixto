'use client';
import { useSession, signOut } from 'next-auth/react';
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
  const { data: session } = useSession();
  const isLoggedIn = !!session; // true si hay sesión
  return (
    <AppBar position='fixed' sx={{backgroundColor:'#00313e', boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',}}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Torneo voley mixto
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color='inherit' component={Link} href='#positions'>
              Tabla
            </Button>
            <Button color='inherit' component={Link} href='#fixture'>
              Fixture
            </Button>
            {!isLoggedIn && (
              <Button color='inherit' component={Link} href='/api/auth/login'>
                Iniciar sesión
              </Button>
            )}
            {isLoggedIn && (
              <Button color='inherit' onClick={() => signOut()}>
                Cerrar sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
