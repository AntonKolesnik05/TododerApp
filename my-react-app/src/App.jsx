import { useState, useEffect } from 'react';
import './App.css';

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() === '') return;
    const newTask = { id: Date.now(), text: inputValue, done: false };
    setTasks(prev => [...prev, newTask]);
    setInputValue('');
  };

  const toggleDone = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>Tododer List</h1>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Введіть нову задачу"
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Додати</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              <span>{task.text}</span>
            </label>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
