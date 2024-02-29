// Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
      <UserMenu />
    </nav>
  );
};

export default Navigation;
