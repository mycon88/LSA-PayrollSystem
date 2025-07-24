// src/components/AdminSidebar.jsx
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, DollarSign, LogOut } from 'lucide-react';

const links = [
  { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard /> },
  { name: 'Students', path: '/admin/students', icon: <Users /> },
  { name: 'Payroll', path: '/admin/payroll', icon: <DollarSign /> },
];

export default function AdminSidebar() {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <aside className="h-screen w-64 bg-gray-800 text-white p-4 fixed top-0 left-0 shadow">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      <nav className="flex flex-col space-y-4">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition ${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 mt-auto rounded-md hover:bg-red-600 transition"
        >
          <LogOut />
          Logout
        </button>
      </nav>
    </aside>
  );
}
