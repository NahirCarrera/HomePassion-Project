// src/pages/user-dashboard.tsx
'use client'; // Asegúrate de agregar esta línea al principio del archivo

import { Container, Typography, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const UserDashboard = () => {
    return (
        <ProtectedRoute>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Bienvenido al Dashboard de Usuario
                    </Typography>
                    {/* Aquí puedes agregar más contenido o componentes */}
                </Box>
            </Container>
        </ProtectedRoute>
    );
};

export default UserDashboard;
