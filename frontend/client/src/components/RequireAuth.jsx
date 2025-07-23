import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles, userRole }) => {
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
