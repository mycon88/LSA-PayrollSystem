import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="text-red-600 hover:underline">
      Logout
    </button>
  );
};

export default LogoutButton;
