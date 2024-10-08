// src/components/Navbar.tsx
"use client";

import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Home Passion
                </Typography>
                <Button color="inherit" onClick={() => router.push('/user-dashboard')}>Inicio</Button>
                <Button color="inherit" onClick={() => router.push('/products')}>Productos</Button>
                <Button color="inherit" onClick={() => router.push('/campaigns')}>Noticias</Button>
                <Button color="inherit" onClick={() => router.push('/sales')}>Ventas</Button>
                <Button color="inherit" onClick={() => router.push('/customers')}>Clientes</Button>
                <Button color="inherit" onClick={() => router.push('/user-profile')}>Perfil</Button>
                <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
