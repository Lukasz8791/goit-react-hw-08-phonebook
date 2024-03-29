import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    try {
      const response = await fetch(
        'https://connections-api.herokuapp.com/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate('/login');
      } else {
        const errorMessage = await response.json();
        setError(`Register error: ${errorMessage.message}`);
      }
    } catch (error) {
      setError(`Register error: ${error}`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    registerUser();
  };

  return (
    <div>
      <Navigation />
      <h2 className={styles.title}>Register</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          User name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <br />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
