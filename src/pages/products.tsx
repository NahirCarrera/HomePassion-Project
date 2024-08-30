import { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import Navbar from '../components/Navbar';

interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_cost: number;
  product_rating_stars: number;
  category: number; // ID de la categoría
}

interface Category {
  category_id: number; // ID de la categoría
  category_name: string; // Nombre de la categoría
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState<number | ''>('');
  const [productCost, setProductCost] = useState<number | ''>('');
  const [productRatingStars, setProductRatingStars] = useState<number | ''>('');
  const [categoryId, setCategoryId] = useState<number | ''>(''); // Inicializa como cadena vacía
  const [editId, setEditId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Fetch products and categories in parallel
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/products/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/categories/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(Array.isArray(productsData) ? productsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = async () => {
    if (productName.trim() === '' || productDescription.trim() === '' || productPrice === '' || productCost === '' || productRatingStars === '' || categoryId === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const token = localStorage.getItem('token');
    const newProduct = { 
      product_name: productName, 
      product_description: productDescription, 
      product_price: Number(productPrice),
      product_cost: Number(productCost),
      product_rating_stars: Number(productRatingStars),
      category: Number(categoryId) // Asegúrate de que categoryId sea un número
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const data = await response.json();
      setProducts([...products, data]);
      resetForm();
      setIsModalOpen(false);
    } else {
      console.error('Error adding product:', response.statusText);
    }
  };

  const handleEditProduct = (product: Product) => {
    setProductName(product.product_name);
    setProductDescription(product.product_description);
    setProductPrice(product.product_price);
    setProductCost(product.product_cost);
    setProductRatingStars(product.product_rating_stars);
    setCategoryId(product.category); // Asegúrate de que esto sea un número o cadena vacía
    setEditId(product.product_id);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (productName.trim() === '' || productDescription.trim() === '' || productPrice === '' || productCost === '' || productRatingStars === '' || categoryId === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const token = localStorage.getItem('token');
    const updatedProduct = { 
      product_name: productName, 
      product_description: productDescription, 
      product_price: Number(productPrice),
      product_cost: Number(productCost),
      product_rating_stars: Number(productRatingStars),
      category: Number(categoryId) // Asegúrate de que categoryId sea un número
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/products/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      const data = await response.json();
      setProducts(products.map(p => (p.product_id === editId ? data : p)));
      resetForm();
      setIsModalOpen(false);
    } else {
      console.error('Error updating product:', response.statusText);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const userConfirmed = confirm("Are you sure you want to delete this product?");
    
    if (!userConfirmed) {
      return;
    }
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });    

    if (response.ok) {
      setProducts(products.filter(p => p.product_id !== id));
    } else {
      console.error('Error deleting product:', response.statusText);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductCost('');
    setProductRatingStars('');
    setCategoryId(''); // Restablece como cadena vacía
    setEditId(null);
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    const userConfirmed = confirm("Are you sure you want to cancel?");
    
    if (!userConfirmed) {
      return;
    }
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Productos</Typography>
        <Button
          data-testid="agregar-producto"
          variant="contained"
          color="primary"
          onClick={openModal}
          sx={{
            mb: 2,
            '&:hover': {
              backgroundColor: 'purple',
            },
          }}
        >
          Agregar Producto
        </Button>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Array.isArray(products) && products.length > 0 ? (
            products.map(product => (
              <Card key={product.product_id} sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.product_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.product_description}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    ${product.product_price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary" onClick={() => handleEditProduct(product)} sx={{
                    mb: 2,
                    '&:hover': {
                      backgroundColor: 'purple',
                      color: 'white'
                    },
                  }}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleDeleteProduct(product.product_id)} sx={{
                    mb: 2,
                    '&:hover': {
                      backgroundColor: 'red',
                      color: 'white'
                    },
                  }}>Eliminar</Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No hay productos disponibles.</Typography>
          )}
        </Box>
      </Box>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>{editId ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre del Producto"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción del Producto"
            value={productDescription}
            onChange={e => setProductDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Precio"
            type="number"
            value={productPrice}
            onChange={e => setProductPrice(Number(e.target.value) || '')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Costo"
            type="number"
            value={productCost}
            onChange={e => setProductCost(Number(e.target.value) || '')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Estrellas de Valoración"
            type="number"
            value={productRatingStars}
            onChange={e => setProductRatingStars(Number(e.target.value) || '')}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value as unknown as number)}
              label="Categoría"
            >
              {categories.map(category => (
                <MenuItem key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={editId ? handleUpdateProduct : handleAddProduct} color="primary">
            {editId ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
