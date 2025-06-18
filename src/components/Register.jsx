import { useState } from 'react';
import './Register.css';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    username: '',
    password: '',
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input
        name="firstName"
        type="text"
        placeholder="Ім'я"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        type="text"
        placeholder="Прізвище"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        name="birthDate"
        type="date"
        placeholder="Дата народження"
        value={formData.birthDate}
        onChange={handleChange}
        required
      />
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
      <button type="submit">Зареєструватись</button>
    </form>
  );
}

export default Register;