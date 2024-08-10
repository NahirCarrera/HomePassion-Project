import { Container, Typography, Box, Grid } from '@mui/material';

const AboutUs = () => {
  return (
    <Container id="sobre-nosotros" maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
        Sobre Nosotros
      </Typography>

      {/* Imagen Principal */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <img
          src="/banner-image.jpeg"
          alt="Sobre nosotros"
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Box>

      {/* Sección de Descripción e Historia */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Box id="descripcion" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Descripción del Negocio
            </Typography>
            <Typography variant="body1">
              Somos una empresa dedicada a proporcionar lo mejor en XXXXXXXXXXXX, comprometidos con la satisfacción de nuestros clientes. Con años de experiencia en el sector, nos enorgullece ofrecer productos que destacan por su calidad y durabilidad.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box id="historia" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Nuestra Historia
            </Typography>
            <Typography variant="body1">
              Fundados en el año 20XX, comenzamos como un pequeño negocio familiar con una visión clara: traer innovación y calidad al mercado. A lo largo de los años, hemos crecido y evolucionado, siempre manteniendo nuestros valores fundacionales y nuestro compromiso con la excelencia.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Sección de Valores */}
      <Box id="valores" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Nuestros Valores
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Calidad
              </Typography>
              <Typography variant="body2">
                Nos esforzamos por ofrecer productos que superen las expectativas.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Integridad
              </Typography>
              <Typography variant="body2">
                Operamos con transparencia y honestidad en todo lo que hacemos.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Innovación
              </Typography>
              <Typography variant="body2">
                Buscamos continuamente formas de mejorar y estar a la vanguardia del sector.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Satisfacción del Cliente
              </Typography>
              <Typography variant="body2">
                La felicidad de nuestros clientes es nuestra máxima prioridad.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
