"use client";

import { useEffect, useState } from 'react';
import { Button, Typography, Box, TextField, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from '../components/Navbar';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [editId, setEditId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/products/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleAddProduct = async () => {
        // Validación de los campos
    if (name.trim() === '' || description.trim() === '' || price === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
        const token = localStorage.getItem('token');
        const newProduct = { name, description, price };
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
            setName('');
            setDescription('');
            setPrice('');
            setIsModalOpen(false);
        } else {
            console.error('Error adding product:', response.statusText);
        }
    };

    const handleEditProduct = (product: Product) => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setEditId(product.id);
        setIsModalOpen(true);
    };

    const handleUpdateProduct = async () => {
        if (name.trim() === '' || description.trim() === '' || price === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const token = localStorage.getItem('token');
        const updatedProduct = { name, description, price };
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
            setProducts(products.map(p => (p.id === editId ? data : p)));
            setName('');
            setDescription('');
            setPrice('');
            setEditId(null);
            setIsModalOpen(false);
        } else {
            console.error('Error updating product:', response.statusText);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        const userConfirmed = confirm("Are you sure you want to delete this product?");
        
        if (!userConfirmed) {
            return; // If the user cancels, exit the function
        }
    
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/products/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });    

        if (response.ok) {
            setProducts(products.filter(p => p.id !== id));
        } else {
            console.error('Error deleting product:', response.statusText);
        }
    };

    const openModal = () => {
        setName('');
        setDescription('');
        setPrice('');
        setEditId(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        const userConfirmed = confirm("Are you sure you want to cancel?");
        
        if (!userConfirmed) {
            return; // If the user cancels, exit the function
        }
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
                        backgroundColor: 'purple', // Cambia el color de fondo a morado cuando haya hover
                        },
                    }}
                    >
                    Agregar Producto
                    </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {products.map(product => (
                        <Card key={product.id} sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    ${product.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="secondary" onClick={() => handleEditProduct(product)} sx={{
                        mb: 2,
                        '&:hover': {
                        backgroundColor:'purple',
                        color: 'white' // Cambia el color de fondo a morado cuando haya hover
                        },
                    }}
                                    
                                    >Editar</Button>
                                <Button size="small" color="error" onClick={() => handleDeleteProduct(product.id)} sx={{
                        mb: 2,
                        '&:hover': {
                        backgroundColor:'red',
                        color: 'white' // Cambia el color de fondo a morado cuando haya hover
                        },
                    }}
                                    
                                    >Eliminar</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>

                <Dialog open={isModalOpen} onClose={closeModal}>
                    <DialogTitle>{editId ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
                    <DialogContent>
                                            <TextField
                            label="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                            fullWidth
                            data-testid="nombre-input"
                        />
                        <TextField
                            label="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            margin="normal"
                            fullWidth
                            data-testid="descripcion-input"
                        />
                        <TextField
                            label="Precio"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            margin="normal"
                            fullWidth
                            type="number"
                            data-testid="precio-input"
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button data-testid="cancelar" onClick={closeModal} color="secondary" sx={{
                        mb: 2,
                        '&:hover': {
                        backgroundColor: 'purple',
                        color: 'white' // Cambia el color de fondo a morado cuando haya hover
                        },
                    }}>Cancelar</Button>
                        <Button data-testid="agregar" onClick={editId ? handleUpdateProduct : handleAddProduct} color="primary" sx={{
                        mb: 2,
                        '&:hover': {
                        backgroundColor:'skyblue',
                        color: 'white' // Cambia el color de fondo a morado cuando haya hover
                        },
                    }}>
                            {editId ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}
