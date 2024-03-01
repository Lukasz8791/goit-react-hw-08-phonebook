import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    try {
      const response = await fetch('https://connections-api.herokuapp.com/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorMessage = await response.text();
        setError(`Błąd rejestracji: ${errorMessage}`);
      }
    } catch (error) {
      setError(`Błąd rejestracji: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Wyczyść poprzedni błąd przed kolejną próbą rejestracji
    registerUser();
  };

  return (
    <div>
      <Navigation /> 
      <h2>Rejestracja</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Imię i nazwisko:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>Hasło:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Register;
