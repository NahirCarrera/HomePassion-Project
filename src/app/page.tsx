'use client'; // Asegúrate de agregar esta línea al principio del archivo

import Link from 'next/link';
import { Container, Typography, Box, Button, AppBar, Toolbar, Card, CardContent, CardMedia, TextField } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Menú Superior */}
      <AppBar position="static" sx={{ bgcolor: '#000000', color: '#f5f5dc' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Home Passion
          </Typography>
          <Button component="a" href="#inicio" color="inherit">
            Inicio
          </Button>
          <Button component="a" href="#about" color="inherit">
            Sobre nosotros
          </Button>
          <Button component="a" href="#services" color="inherit">
            Servicios
          </Button>
          <Button component="a" href="#shipping" color="inherit">
            Envíos
          </Button>
          <Button component="a" href="#catalog" color="inherit">
            Catálogo
          </Button>
          <Button component="a" href="#news" color="inherit">
            Noticias
          </Button>
          <Button component="a" href="#contact" color="inherit">
            Contacto
          </Button>
          <Button component="a" href="#comments" color="inherit">
            Comentarios
          </Button>
          <Button component={Link} href="/login" color="inherit">
            Iniciar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Banner */}
      <Box
        id="inicio"
        sx={{
          height: '60vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <Carousel
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          autoPlay
          interval={2000}
          infiniteLoop
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <img src="/banner-image.jpeg" alt={`Gallery Image ${index + 1}`} style={{ height: '60vh', width: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </Carousel>
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            p: 3,
          }}
        >
          <Typography variant="h2" sx={{ mb: 2 }}>
            Bienvenido a Home Passion
          </Typography>
          <Typography variant="h5">
            Comer sano es comer rico.
          </Typography>
        </Box>
      </Box>

      {/* Sección de Información */}
      <Container id="about" maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Sobre nosotros
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <img
            src="/banner-image.jpeg"
            alt="Sobre nosotros"
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
          <Typography variant="h5" sx={{ mt: 2 }}>
            Texto sobre nosotros.
          </Typography>
        </Box>
      </Container>

      {/* Sección Explicativa sobre Servicios */}
      <Container
        id="services"
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
          <Card sx={{ maxWidth: 300, textAlign: 'center' }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Servicio 1"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Servicio 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción del servicio 1.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 300, textAlign: 'center' }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Servicio 2"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Servicio 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción del servicio 2.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 300, textAlign: 'center' }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Servicio 3"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Servicio 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción del servicio 3.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 300, textAlign: 'center' }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Servicio 4"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Servicio 4
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción del servicio 4.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Sección de Envíos */}
      <Container id="shipping" maxWidth="md" sx={{ mt: 8 }}>
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
          <Card sx={{ maxWidth: 345, position: 'relative' }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Envío Nacional"
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
              <Typography variant="h5">Envío Nacional</Typography>
            </Box>
          </Card>
          <Card sx={{ maxWidth: 345, position: 'relative' }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Envío Internacional"
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
              <Typography variant="h5">Envío Internacional</Typography>
            </Box>
          </Card>
          <Card sx={{ maxWidth: 345, position: 'relative' }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Envío Express"
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
              <Typography variant="h5">Envío Express</Typography>
            </Box>
          </Card>
        </Box>
      </Container>

      {/* Sección del Catálogo */}
<Container id="catalog" maxWidth="md" sx={{ mt: 8 }}>
  <Typography variant="h4" gutterBottom textAlign="center">
    Catálogo
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
    <Button
      onClick={() => {/* Función para cambiar productos */}}
      sx={{ mb: 2 }}
    >
      Categoría 1
    </Button>
    <Button
      onClick={() => {/* Función para cambiar productos */}}
      sx={{ mb: 2 }}
    >
      Categoría 2
    </Button>
    <Button
      onClick={() => {/* Función para cambiar productos */}}
      sx={{ mb: 2 }}
    >
      Categoría 3
    </Button>
  </Box>
  <Box
    sx={{
      display: 'flex',
      gap: 4,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}
  >
    {[1, 2, 3].map((product, index) => (
      <Card key={index} sx={{ width: 345, mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image="/banner-image.jpeg"
            alt={`Producto ${product}`}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '4px',
            }}
          >
            $Precio {product}
          </Box>
        </Box>
        <CardContent>
          <Typography variant="h5" component="div">
            Producto {product}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Descripción del producto {product}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
</Container>


      {/* Sección de Noticias */}
      <Container id="news" maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Noticias
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
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Noticia 1"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Noticia 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha: 01/01/2024
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detalles de la noticia 1.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Noticia 2"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Noticia 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha: 02/01/2024
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detalles de la noticia 2.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="/banner-image.jpeg"
              alt="Noticia 3"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Noticia 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha: 03/01/2024
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detalles de la noticia 3.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Sección de Contacto */}
      <Container id="contact" maxWidth="md" sx={{ mt: 8 }}>
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
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Envíanos un mensaje
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                margin="normal"
              
              />
              <TextField
                fullWidth
                label="Correo Electrónico"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Mensaje"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
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

      {/* Sección de Comentarios */}
      <Container id="comments" maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Comentarios
        </Typography>
        <Typography variant="h6" gutterBottom textAlign="center">
          Número de Comentarios: 5
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
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Cliente 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ★★★★☆
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comentario del cliente 1.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Cliente 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ★★★☆☆
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comentario del cliente 2.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
