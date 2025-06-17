import { useState, useEffect } from 'react';
import './App.css';
import Register from './components/Register';

function TodoApp() {
  const [isRegistered, setIsRegistered] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

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

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const data = await response.json();
      const newTodos = data.map(todo => ({
        id: todo.id + 1000000,
        text: todo.title,
        done: todo.completed,
      }));
      setTasks(prev => [...prev, ...newTodos]);
    } catch (error) {
      console.error('Помилка при отриманні тудушок:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    setIsRegistered(true);
    console.log('User registered, switching to todo');
  };
  if (!isRegistered) {
    return <Register onRegister={handleRegister} />;
  }

  return (
    <div className="todo-app">
      <div className="theme-toggle-container">
        <button className="theme-toggle" onClick={toggleTheme}>
          <img
            src={
              theme === 'dark'
                ? 'https://img.icons8.com/?size=100&id=648&format=png&color=000000'
                : 'https://img.icons8.com/?size=100&id=45475&format=png&color=000000'
            }
            alt={theme === 'dark' ? 'Sun icon' : 'Moon icon'}
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      </div>

      <div className="header">
        <h1>Tododer List</h1>
      </div>

      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Введіть нову задачу"
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Додати</button>
        <button onClick={fetchTodos} disabled={loading}>
          {loading ? 'Завантаження...' : 'Fetch Todos'}
        </button>
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
