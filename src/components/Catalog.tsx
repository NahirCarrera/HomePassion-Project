import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_cost: number;
  product_rating_stars: number;
  category: number;
}

interface Category {
  category_id: number;
  category_name: string;
}

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | 'Todos'>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/categories/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<number | 'Todos'>) => {
    setSelectedCategory(event.target.value as number | 'Todos');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product =>
    (selectedCategory === 'Todos' || product.category === selectedCategory) &&
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                label="Categoría"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Catálogo de productos */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.product_id}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' },
                cursor: 'pointer',
              }}
              onClick={() => handleProductClick(product)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/banner-image.jpeg"
                  alt={product.product_name}
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
                >
                  ${product.product_price.toFixed(2)}
                </Box>
              </Box>
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.product_description}
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
              <Typography variant="h5">
                {selectedProduct.product_name}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedProduct.product_description}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Precio: ${selectedProduct.product_price.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Costo: ${selectedProduct.product_cost.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Rating: {selectedProduct.product_rating_stars} estrellas
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
