import { useState } from 'react';
import './Register.css'

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Реєстрація:', formData);
    onRegister();
  };

  return (
    <div className="register-container">
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="firstName"
          placeholder="Ім’я"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Прізвище"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="register-btn">Зареєструватись</button>
      </form>
    </div>
  );
}

export default Register;