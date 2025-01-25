import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

function Tasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleOpenDialog = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    } else {
      setEditingTask(null);
      setTaskForm({
        title: '',
        description: '',
        status: 'pending',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTask(null);
    setTaskForm({
      title: '',
      description: '',
      status: 'pending',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(
          `http://localhost:8000/api/tasks/${editingTask.id}/`,
          taskForm,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      } else {
        await axios.post(
          'http://localhost:8000/api/tasks/',
          taskForm,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
      handleCloseDialog();
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis Tareas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2 }}
        >
          Nueva Tarea
        </Button>
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                mb: 1,
                border: 1,
                borderColor: 'grey.300',
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={task.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Estado: {task.status}
                    </Typography>
                    <br />
                    {task.description}
                  </>
                }
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton edge="end" onClick={() => handleOpenDialog(task)} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingTask ? 'Editar Tarea' : 'Nueva Tarea'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Título"
              name="title"
              value={taskForm.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Descripción"
              name="description"
              multiline
              rows={4}
              value={taskForm.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="status"
              label="Estado"
              name="status"
              select
              value={taskForm.status}
              onChange={handleChange}
            >
              <MenuItem value="pending">Pendiente</MenuItem>
              <MenuItem value="in_progress">En Progreso</MenuItem>
              <MenuItem value="completed">Completada</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingTask ? 'Guardar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Tasks; 