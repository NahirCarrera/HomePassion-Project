'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams(); // Accede a los parámetros de la URL
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`/api/tasks/${id}`);
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
        } catch (error) {
          console.error('Error al obtener la tarea:', error);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/tasks/${id}`, { title, description });
      } else {
        await axios.post('/api/tasks', { title, description });
      }
      router.push('/tasks'); // Redirige a la lista de tareas después de añadir o editar
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Editar Tarea' : 'Añadir Tarea'}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Título"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Descripción"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            {id ? 'Guardar Cambios' : 'Añadir Tarea'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskForm;
