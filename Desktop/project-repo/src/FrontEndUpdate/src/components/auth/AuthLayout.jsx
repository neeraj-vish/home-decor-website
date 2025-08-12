import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../LandingPage/Navbar';

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;