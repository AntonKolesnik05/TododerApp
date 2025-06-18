import { useState } from 'react';
import './Register.css';

function Login({ onLogin, switchToRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        name="username"
        type="text"
        placeholder="Логін"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Увійти</button>
      <p>
        Немає акаунта?{' '}
        <button type="button" onClick={switchToRegister}>
          Зареєструватись
        </button>
      </p>
    </form>
  );
}

export default Login;