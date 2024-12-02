import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === id));

  if (!task) return <p>Task not found!</p>;

  return (
    <div>
      <h1>Task Details</h1>
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
      <button onClick={() => navigate('/tasks')}>Back to Dashboard</button>
    </div>
  );
};

export default TaskDetails;
