// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { Home, Users, DollarSign, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <Home /> },
  { name: 'Students', path: '/students', icon: <Users /> },
  { name: 'Payroll', path: '/payroll', icon: <DollarSign /> },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-white p-4 fixed top-0 left-0 shadow-lg">
      <h1 className="text-2xl font-bold mb-8">LSA System</h1>
      <nav className="flex flex-col space-y-4">
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
        <button
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
          className="flex items-center gap-3 p-2 mt-auto rounded-md hover:bg-red-600 transition"
        >
          <LogOut />
          Logout
        </button>
      </nav>
    </aside>
  );
}
