import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RequireAuth = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
