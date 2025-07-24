import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext); // ⬅️ use logout from context

  const handleLogout = () => {
    logoutUser(); // ⬅️ clear context + localStorage
    navigate('/'); // ⬅️ redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
