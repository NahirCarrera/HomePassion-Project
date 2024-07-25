'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Task } from '../types/Task';
import { List, ListItem, ListItemText, IconButton, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Tareas
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            secondaryAction={
              <IconButton edge="end" color="error" onClick={() => handleDelete(task._id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={task.title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
