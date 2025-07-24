// src/components/RequireAuth.jsx
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
  }

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but not authorized
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
