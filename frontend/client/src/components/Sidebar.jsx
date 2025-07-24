// src/components/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Users, DollarSign, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: <Home /> },
  { name: 'Students', path: '/admin/students', icon: <Users /> },
  { name: 'Payroll', path: '/admin/payroll', icon: <DollarSign /> },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();       // clear user from context
    navigate('/');      // redirect to login
  };

  return (
    <aside className="h-screen w-64 bg-gray-800 text-white p-4 fixed top-0 left-0 shadow-lg flex flex-col">
      <h1 className="text-2xl font-bold mb-8">LSA System</h1>

      <nav className="flex flex-col space-y-4 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition ${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 mt-4 rounded-md hover:bg-red-600 transition"
      >
        <LogOut />
        Logout
      </button>
    </aside>
  );
}
