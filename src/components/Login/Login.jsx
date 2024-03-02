import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    try {
      const response = await fetch(
        'https://connections-api.herokuapp.com/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem('token', data.token);
        // Zamiast korzystać z authSlice, możemy bezpośrednio wywołać akcję logowania
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.token });
        navigate('/contacts');
      } else {
        setError(`Wrong Login or password`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    loginUser();
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <h2>Log in</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
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
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
