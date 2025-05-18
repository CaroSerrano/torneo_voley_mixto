'use client';
import { useSession, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const menuItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Campeones', href: '/champions' },
    { label: 'Llaves', href: '/bracket' },
    !isLoggedIn
      ? { label: 'Iniciar sesión', href: '/login' }
      : { label: 'Cerrar sesión', action: () => signOut() },
  ];

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: '#00313e',
        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Button component={Link} href='/' sx={{ color: 'white' }}>
            <Box display='flex' alignItems='center' gap={1}>
              <Image
                src='/images/ball2.webp'
                alt='Logo'
                width={32}
                height={32}
              />
              <Typography
                sx={{
                  fontSize: {
                    xs: '1rem', // para pantallas pequeñas
                    sm: '1.25rem', // tablets
                    md: '1.5rem', // desktop
                  },
                  fontWeight: 500,
                }}
              >
                Torneo Voley Mixto
              </Typography>
            </Box>
          </Button>

          {/* Menú normal en pantallas medianas/grandes */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map((item, idx) =>
              item.href ? (
                <Button
                  key={idx}
                  color='inherit'
                  component={Link}
                  href={item.href}
                >
                  {item.label}
                </Button>
              ) : (
                <Button key={idx} color='inherit' onClick={item.action}>
                  {item.label}
                </Button>
              )
            )}
          </Box>

          {/* Ícono hamburguesa en pantallas chicas */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color='inherit' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='top'
              open={open}
              onClose={toggleDrawer(false)}
              slotProps={{
                paper: {
                  sx: {
                    width: '100%',
                    maxHeight: 'fit-content',
                    backgroundColor: '#00313e',
                    paddingY: 2,
                  },
                },
              }}
            >
              <List>
                {menuItems.map((item, idx) =>
                  item.href ? (
                    <ListItemButton
                      key={idx}
                      component={Link}
                      href={item.href}
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemText
                        primary={item.label}
                        sx={{ color: 'white' }}
                      />
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      key={idx}
                      onClick={() => {
                        item.action?.();
                        setOpen(false);
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        sx={{ color: 'white' }}
                      />
                    </ListItemButton>
                  )
                )}
              </List>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
