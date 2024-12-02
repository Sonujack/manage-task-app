import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../slices/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Typography } from '@mui/material';

const TaskForm = ({ currentTask, setCurrentTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // Update form fields when currentTask changes
  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title || '');
      setDescription(currentTask.description || '');
      setDueDate(currentTask.dueDate || '');
    }
  }, [currentTask]);

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return; // Stop if validation fails

    if (currentTask) {
      dispatch(editTask({ ...currentTask, title, description, dueDate }));
    } else {
      dispatch(addTask({ id: uuidv4(), title, description, dueDate, completed: false }));
    }
    setCurrentTask(null); // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setErrors({});
  };

  return (
    <div>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!!errors.title}
        helperText={errors.title}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        error={!!errors.dueDate}
        helperText={errors.dueDate}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {currentTask ? 'Update Task' : 'Add Task'}
      </Button>
      {Object.keys(errors).length > 0 && (
        <Typography color="error" style={{ marginTop: '1rem' }}>
          Please fix the above errors before submitting.
        </Typography>
      )}
    </div>
  );
};

export default TaskForm;
