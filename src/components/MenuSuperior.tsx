import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

const MenuSuperior = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#000000', color: '#f5f5dc' }}>
      <Toolbar>
        <Box component="img" src="/logo.png" alt="Home Passion Logo" sx={{ height: 40, mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Home Passion
        </Typography>
        {['Inicio', 'Sobre nosotros', 'Servicios', 'Envíos', 'Catalogo', 'Noticias', 'Contacto', 'Comentarios'].map((section) => (
          <Button 
            key={section} 
            component="a" 
            href={`#${section.toLowerCase().replace(/ /g, '-')}`} 
            color="inherit" 
            sx={{ '&:hover': { bgcolor: '#f5f5dc', color: '#000000' } }}
          >
            {section}
          </Button>
        ))}
        <Button 
          component={Link} 
          href="/login" 
          color="inherit" 
          sx={{ '&:hover': { bgcolor: '#f5f5dc', color: '#000000' } }}
        >
          Iniciar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuSuperior;
