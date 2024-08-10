import { Box, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel

const Banner = () => {
  return (
    <Box
      id="inicio"
      sx={{
        height: '60vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Carousel
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        autoPlay
        interval={3000}
        infiniteLoop
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <img
              src="/banner-image.jpeg"
              alt={`Gallery Image ${index + 1}`}
              style={{ height: '60vh', width: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1,
          p: 3,
          textAlign: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            color: '#ffffff',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Bienvenido a Home Passion
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: '#ffffff' }}
        >
          Comer sano es comer rico.
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
