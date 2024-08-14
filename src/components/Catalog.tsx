import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useState } from 'react';

const categories = ['Todos', 'Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 4']; // Ejemplo de categorías

export default function Catalogo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null); // Estado para el producto seleccionado
  const [open, setOpen] = useState(false); // Estado para el diálogo

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductClick = (product: number) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container id="catalogo" maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Catálogo
      </Typography>

      {/* Barra de búsqueda y filtro */}
      <Box sx={{ mb: 4, backgroundColor: 'white', p: 2, borderRadius: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Buscar productos"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ mb: 2 }}
              inputProps={{ 'data-testid': 'search-bar' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                label="Categoría"
                value={selectedCategory}
                onChange={handleCategoryChange}
                inputProps={{ 'data-testid': 'category-select' }}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                    data-testid={`category-option-${category}`} // Añadir data-testid a cada opción
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Catálogo de productos */}
      <Grid container spacing={4}>
        {[1, 2, 3, 4, 5, 6].map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
  sx={{
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s',
    '&:hover': { transform: 'scale(1.05)' },
    cursor: 'pointer',
  }}
  onClick={() => handleProductClick(product)}
  data-testid={`product-card-${product}`}  // Este es el data-testid que estás usando en React
>
  <Box sx={{ position: 'relative' }}>
    <CardMedia
      component="img"
      height="140"
      image="/banner-image.jpeg"
      alt={`Product ${product}`}
      data-testid={`product-image-${product}`}
    />
    <Box
      sx={{
        position: 'absolute',
        top: 8,
        left: 8,
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        px: 1,
        borderRadius: 1,
      }}
      data-testid={`product-price-${product}`}
    >
      $123.45
    </Box>
  </Box>
  <CardContent>
    <Typography variant="h6" component="div" data-testid={`product-name-${product}`}>
      Producto {product}
    </Typography>
    <Typography variant="body2" color="text.secondary" data-testid={`product-description-${product}`}>
      Descripción del producto {product}.
    </Typography>
  </CardContent>
</Card>

          </Grid>
        ))}
      </Grid>

      {/* Diálogo con detalles del producto */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Detalles del Producto</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box>
              <Typography variant="h5" data-testid={`dialog-product-name-${selectedProduct}`}>
                Producto {selectedProduct}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }} data-testid={`dialog-product-description-${selectedProduct}`}>
                Aquí se puede mostrar más detalles sobre el producto {selectedProduct}.
                
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
