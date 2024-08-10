import { Container, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';

const Services = () => {
  const services = [
    { title: 'Servicio 1', description: 'Descripción del servicio 1.' },
    { title: 'Servicio 2', description: 'Descripción del servicio 2.' },
    { title: 'Servicio 3', description: 'Descripción del servicio 3.' },
    { title: 'Servicio 4', description: 'Descripción del servicio 4.' },
  ];

  return (
    <Container
      id="servicios"
      maxWidth={false}
      sx={{
        mt: 8,
        p: 4,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        color: '#ffffff',
        width: '100%',
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        Servicios
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {services.map((service, index) => (
          <Card key={index} sx={{ maxWidth: 300, textAlign: 'center' }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt={`Servicio ${index + 1}`}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {service.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Services;
