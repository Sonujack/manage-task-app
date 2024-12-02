import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleComplete } from '../slices/taskSlice';
import { Button, Checkbox, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TaskList = ({ setCurrentTask }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <Typography variant="h6">{task.title}</Typography>
          <Typography>{task.description}</Typography>
          <Typography>Due Date: {task.dueDate}</Typography>
          <Checkbox
            checked={task.completed}
            onChange={() => dispatch(toggleComplete(task.id))}
          />
          Completed
          <Button variant="outlined" color="primary" onClick={() => setCurrentTask(task)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => dispatch(deleteTask(task.id))}>
            Delete
          </Button>
          <Link to={`/tasks/${task.id}`}>
            <Button variant="outlined">View Details</Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
