import { useEffect, useState } from 'react';
import { Button, Typography, Box, TextField, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Navbar from '../components/Navbar';

interface Product {
    product_id: number;
    product_name: string;
    product_description: string;
    product_price: number;
    product_cost: number;
    product_rating_stars: number;
    category: number;  // ID de la categoría
}

interface Category {
    category_id: number;  // ID de la categoría
    category_name: string;  // Nombre de la categoría
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState<number | ''>('');
    const [productCost, setProductCost] = useState<number | ''>('');
    const [productRatingStars, setProductRatingStars] = useState<number | ''>('');
    const [categoryId, setCategoryId] = useState<number | ''>('');
    const [editId, setEditId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Fetch products
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/products/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching products:', error));

        // Fetch categories
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/categories/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setCategories(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching categories:', error));
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
        setCategoryId(product.category); // Asegúrate de que esto sea un número
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
                        <Typography>No products available</Typography>
                    )}
                </Box>

                <Dialog open={isModalOpen} onClose={closeModal}>
                    <DialogTitle>{editId ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Nombre"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            margin="normal"
                            fullWidth
                            data-testid="nombre-input"
                        />
                        <TextField
                            label="Descripción"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            margin="normal"
                            fullWidth
                            data-testid="descripcion-input"
                        />
                        <TextField
                            label="Precio"
                            value={productPrice === '' ? '' : productPrice}
                            onChange={(e) => setProductPrice(e.target.value === '' ? '' : Number(e.target.value))}
                            margin="normal"
                            type="number"
                            fullWidth
                            data-testid="precio-input"
                        />
                        <TextField
                            label="Costo"
                            value={productCost === '' ? '' : productCost}
                            onChange={(e) => setProductCost(e.target.value === '' ? '' : Number(e.target.value))}
                            margin="normal"
                            type="number"
                            fullWidth
                            data-testid="costo-input"
                        />
                        <TextField
                            label="Calificación"
                            value={productRatingStars === '' ? '' : productRatingStars}
                            onChange={(e) => setProductRatingStars(e.target.value === '' ? '' : Number(e.target.value))}
                            margin="normal"
                            type="number"
                            fullWidth
                            data-testid="calificacion-input"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="category-label">Categoría</InputLabel>
                            <Select
                                labelId="category-label"
                                value={categoryId === '' ? '' : categoryId}
                                onChange={(e) => setCategoryId(Number(e.target.value))}
                                fullWidth
                                data-testid="categoria-select"
                            >
                                <MenuItem value="">
                                    <em>Seleccionar categoría</em>
                                </MenuItem>
                                {categories.map(cat => (
                                    <MenuItem key={cat.category_id} value={cat.category_id}>
                                        {cat.category_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">Previsualización del Producto</Typography>
                            <Typography><strong>Nombre:</strong> {productName}</Typography>
                            <Typography><strong>Descripción:</strong> {productDescription}</Typography>
                            <Typography><strong>Precio:</strong> ${productPrice}</Typography>
                            <Typography><strong>Costo:</strong> ${productCost}</Typography>
                            <Typography><strong>Calificación:</strong> {productRatingStars} estrellas</Typography>
                            <Typography><strong>Categoría ID:</strong> {categoryId || 'N/A'}</Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="secondary">Cancelar</Button>
                        <Button onClick={editId ? handleUpdateProduct : handleAddProduct} color="primary">
                            {editId ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}
