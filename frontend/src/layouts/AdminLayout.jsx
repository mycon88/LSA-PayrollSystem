import { Outlet, Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const AdminLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 p-4 bg-gray-100 h-screen">
        <nav className="flex flex-col space-y-2">
          <Link to="/admin/dashboard" className="text-blue-600">Dashboard</Link>
          <LogoutButton />
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
