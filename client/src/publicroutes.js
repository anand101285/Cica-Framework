import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const auth = localStorage.getItem('userData');
  return auth ? <Navigate to="/dashboard/app" /> : <Outlet />;
};
