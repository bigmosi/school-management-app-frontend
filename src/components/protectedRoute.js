// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { checkAuthentication } from './auth';

const ProtectedRoute = ({ element }) => {
  const authenticated = checkAuthentication();

  // If not authenticated, redirect to the login page
  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return <Route element={element} />;
};

export default ProtectedRoute;
