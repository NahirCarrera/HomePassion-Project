'use client'; // Asegúrate de agregar esta línea al principio del archivo

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button, Box, Alert, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      await axios.post('/api/register', { email, password });
      router.push('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error('Error al registrarse:', error);
      setError('Error al registrarse. Inténtalo de nuevo.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', width: '100%', maxWidth: 1200, borderRadius: 2, boxShadow: 3, bgcolor: '#ffffff', overflow: 'hidden' }}>
        {/* Imagen de Fondo */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Image 
            src="/register-background.jpeg" // Asegúrate de colocar la ruta correcta de tu imagen
            alt="Register Background"
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
            Registrarse
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
            <TextField
              label="Confirmar contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Registrarse
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
