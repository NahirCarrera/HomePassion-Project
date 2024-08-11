import { AppBar, Toolbar, Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';

const MenuSuperior = () => {
  // Obtiene el tema del Material-UI
  const theme = useTheme();
  // Media query para manejar el diseño en pantallas pequeñas
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sections = [
    'Inicio', 'Sobre nosotros', 'Servicios', 'Envíos', 'Catalogo', 'Noticias', 'Contacto', 'Comentarios'
  ];

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#000000', color: '#f5f5dc' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Box component="img" src="/logo.png" alt="Home Passion Logo" sx={{ height: 40, mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Home Passion
        </Typography>
        
        {/* Menú de navegación para todas las resoluciones */}
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: isMobile ? 'center' : 'flex-end', flexWrap: 'wrap' }}>
          {sections.map((section) => (
            <Button
              key={section}
              component="a"
              href={`#${section.toLowerCase().replace(/ /g, '-')}`}
              color="inherit"
              sx={{ mx: 1, my: 0.5, '&:hover': { bgcolor: '#f5f5dc', color: '#000000' } }}
            >
              {section}
            </Button>
          ))}
          <Button
            component={Link}
            href="/login"
            color="inherit"
            sx={{ mx: 1, my: 0.5, '&:hover': { bgcolor: '#f5f5dc', color: '#000000' } }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuSuperior;
