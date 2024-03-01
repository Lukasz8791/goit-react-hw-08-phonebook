import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { contactsActions } from '../../redux/contactsSlice';
import axios from 'axios';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.contacts.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://connections-api.herokuapp.com/users/current',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(contactsActions.setUser(response.data));
      } catch (error) {
        console.error('Error during fetching user data:', error.message);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [dispatch, user]);

  const handleLogout = async () => {
    try {
      await dispatch(contactsActions.logoutAsync());
      dispatch(contactsActions.clearContacts());
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      {user && (
        <>
          {user.email && <p className={styles.email}>{user.email}</p>}
          <button className={styles['logout-button']} onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default UserMenu;
