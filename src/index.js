import React from 'react';
import { createRoot } from 'react-dom/client'; // Update import
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from '../src/redux/store';
import App from './components/App';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<App />} />
          <Route path="/" element={<Login />} />
          <Route path="/goit-react-hw-07-phonebook" element={<Login />} />
        </Routes>
      </React.StrictMode>
    </Router>
  </Provider>
);
