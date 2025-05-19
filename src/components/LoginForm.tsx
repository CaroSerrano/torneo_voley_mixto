'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.ok) {
        router.push('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', mt: 20, p: 4, backgroundColor:'#00313e' }}>
      {error && <Alert severity='error'>{error}</Alert>}
      <Typography variant='h5' color='primary.contrastText' component='h1' gutterBottom align='center'>
        Iniciar Sesión
      </Typography>

      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label='Email'
          fullWidth
          margin='normal'
          {...register('email', {
            required: 'El email es obligatorio',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Formato de email inválido',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label='Contraseña'
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin='normal'
          {...register('password', {
            required: 'La contraseña es obligatoria',
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff color='secondary'/> : <Visibility color='secondary' />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          type='submit'
          variant='contained'
          color='secondary'
          fullWidth
          sx={{ mt: 2 }}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
