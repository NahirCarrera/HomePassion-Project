import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import Navbar from '../components/Navbar';

interface User {
  _id: string;
  user_name: string;
  user_email: string;
  user_rol: string;  // Añade otros campos que tu modelo de usuario tenga
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData: User[] = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Perfil de Usuario</Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {users.length > 0 ? (
            users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Nombre:</Typography>
                    <Typography variant="body1">{user.user_name}</Typography>

                    <Typography variant="h6" sx={{ mt: 2 }}>Correo Electrónico:</Typography>
                    <Typography variant="body1">{user.user_email}</Typography>

                    <Typography variant="h6" sx={{ mt: 2 }}>Rol:</Typography>
                    <Typography variant="body1">{user.user_rol}</Typography>
                  </CardContent>
                  <Button variant="contained" color="primary" sx={{ m: 2 }}>
                    Editar Perfil
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">Cargando usuario...</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
}
