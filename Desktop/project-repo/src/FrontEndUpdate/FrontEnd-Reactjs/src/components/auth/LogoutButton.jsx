import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');  
    localStorage.removeItem('user');  
    navigate('/auth/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
