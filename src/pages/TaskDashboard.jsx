import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const TaskDashboard = () => {
  const [currentTask, setCurrentTask] = useState(null);

  return (
    <div>
      <h1>Task Management Dashboard</h1>
      <TaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} />
      <TaskList setCurrentTask={setCurrentTask} />
    </div>
  );
};

export default TaskDashboard;
