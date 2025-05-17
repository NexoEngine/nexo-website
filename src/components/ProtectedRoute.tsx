import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Optional: Show a loading indicator while checking auth state
    return <div>Loading...</div>; // Or a proper loading spinner component
  }

  if (!user) {
    // Redirect them to the home page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // Note: Storing location state is optional, could just navigate to '/'
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // If the user is logged in but not an admin, redirect to home
    // You could also redirect to a specific "access denied" page
    console.warn('Access denied: User is not an admin.');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>; // If user is logged in and is an admin, render the children
};

export default ProtectedRoute; 