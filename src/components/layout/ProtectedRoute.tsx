import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isSetupComplete = localStorage.getItem('vyaparai_setup_complete');

  if (isSetupComplete !== 'true') {
    return <Navigate to="/setup" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
