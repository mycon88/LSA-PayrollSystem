// src/components/StudentSidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const links = [
  { name: 'Dashboard', path: '/student', icon: <LayoutDashboard /> },
  { name: 'My Fees', path: '/student/fees', icon: <FileText /> },
];

export default function StudentSidebar() {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser(); // clean logout from context
    navigate('/'); // redirect to login
  };

  return (
    <aside className="h-screen w-64 bg-blue-800 text-white p-4 fixed top-0 left-0 shadow flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Student Portal</h1>

      <nav className="flex flex-col space-y-4 flex-1">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            {link.icon}
            {link.name}
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
