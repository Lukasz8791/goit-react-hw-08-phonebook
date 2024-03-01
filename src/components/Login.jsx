import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'; 

const Login = () => {
  const [formData, setFormData] = useState({
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

  const loginUser = async () => {
    try {
      const response = await fetch('https://connections-api.herokuapp.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
      console.log('Token:', data.token); // Wyświetlenie tokenu w konsoli
      localStorage.setItem('token', data.token);
        navigate('/contacts');
      } else {
        const errorMessage = await response.text();
        setError(`Błąd logowania: ${errorMessage}`);
      }
    } catch (error) {
      setError(`Błąd logowania: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 
    loginUser();
  };

  return (
    <div>
        <Navigation /> 
      <h2>Logowanie</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default Login;
