import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    console.error('Error parsing user from localStorage:', err);
  }

  if (!user || !user.role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
