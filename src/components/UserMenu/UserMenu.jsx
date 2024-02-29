import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';

const UserMenu = () => {
  const userEmail = useSelector(state => state.auth.user.email);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
