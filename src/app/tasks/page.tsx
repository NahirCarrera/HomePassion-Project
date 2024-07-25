'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, Typography, Button, Paper, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Task } from '../../types/Task'; // Asegúrate de importar la interfaz Task

const TaskListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleEdit = (taskId: string) => {
    router.push(`/tasks/edit/${taskId}`);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleLogout = () => {
    // Aquí puedes manejar el cierre de sesión
    console.log('Cerrar sesión');
    // redirecciona a la página de inicio o cierre de sesión
    router.push('/')
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Botón de salir */}
      <Box sx={{ p: 2, bgcolor: '#333', color: '#fff', display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>
      </Box>

      {/* Contenedor de la lista de tareas */}
      <Box sx={{ padding: 2, flexGrow: 1 }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#333' }}>
          Lista de Tareas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push('/tasks/add')}
          sx={{ mb: 2 }}
        >
          Añadir Tarea
        </Button>
        <Paper sx={{ padding: 2, boxShadow: 3, bgcolor: '#fff' }}>
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task._id}
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" onClick={() => handleEdit(task._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default TaskListPage;
