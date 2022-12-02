import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const auth = localStorage.getItem('userData');
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
