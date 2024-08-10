import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSuccess('Correo enviado con éxito');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Extraer el mensaje de error desde la respuesta si es posible
        const errorData = await response.json();
        setError(errorData.message || 'Error al enviar el correo');
      }
    } catch (error) {
      setError('Error al enviar el correo');
    }
  };

  return (
    <Container id="contacto" maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Contacto
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flex: 1, pr: 4 }}>
          <Typography variant="h6" gutterBottom>
            Envíanos un mensaje
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="contact-name"
              fullWidth
              label="Nombre"
              variant="outlined"
              margin="normal"
              sx={{ bgcolor: 'white' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="contact-email"
              fullWidth
              label="Correo Electrónico"
              variant="outlined"
              margin="normal"
              sx={{ bgcolor: 'white' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="contact-message"
              fullWidth
              label="Mensaje"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              sx={{ bgcolor: 'white' }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Enviar
            </Button>
            {success && <Typography color="green">{success}</Typography>}
            {error && <Typography color="red">{error}</Typography>}
          </form>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="/banner-image.jpeg"
            alt="Contacto"
            style={{ width: '80%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
