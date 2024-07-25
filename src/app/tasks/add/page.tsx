'use client'; // Asegúrate de incluir esta línea al principio del archivo

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { Box, Typography, TextField, Button, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TaskFormPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams(); // Obtén el ID de la tarea si existe
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
      router.push('/tasks'); // Redirige de nuevo a la lista de tareas
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#000', color: '#f5f5f5', minHeight: '100vh' }}>
      <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', color: '#000', boxShadow: 3 }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => router.push('/tasks')}
          sx={{ mb: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          {id ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {id ? 'Guardar Cambios' : 'Añadir Tarea'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default TaskFormPage;
