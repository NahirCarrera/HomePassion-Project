// src/app/login/page.tsx
'use client'; // Asegúrate de agregar esta línea al principio del archivo

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores
    try {
      const response = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', response.data.token); // Asegúrate de que el token esté en response.data.token
      router.push('/user-dashboard'); // Redirige al usuario a la página de inicio o al dashboard
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Correo electrónico o contraseña incorrectos.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', width: '100%', maxWidth: 1200, borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
        {/* Imagen de Fondo */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Image 
            alt="Login Background"
            src="/banner-image.jpeg"
            layout="fill"
            objectFit="cover"
            style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
          />
        </Box>

        {/* Contenido del Formulario */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: 'background.paper',
          }}
        >
          <IconButton
            onClick={() => router.push('/')}
            sx={{ alignSelf: 'flex-start', mb: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" gutterBottom>
            Iniciar sesión
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Correo electrónico"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Iniciar sesión
            </Button>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
