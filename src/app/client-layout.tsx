'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from '@/theme';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            className={`${geistSans.variable} ${geistMono.variable}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              height: '100%',
              margin: 0,
            }}
          >
            <Navbar />
            <Box component='main' sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}
