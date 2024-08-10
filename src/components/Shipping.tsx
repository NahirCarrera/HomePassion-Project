import { Container, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';

const ShippingSection = () => {
  const shippingOptions = [
    { title: 'Envío Nacional', alt: 'Envío Nacional' },
    { title: 'Envío Internacional', alt: 'Envío Internacional' },
    { title: 'Envío Express', alt: 'Envío Express' },
  ];

  return (
    <Container id="envíos" maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Envíos
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {shippingOptions.map((option, index) => (
          <Card key={index} sx={{ maxWidth: 345, position: 'relative' }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt={option.alt}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h5">{option.title}</Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ShippingSection;
