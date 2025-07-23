// src/components/Sidebar.jsx

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        <a href="/admin/dashboard" className="block hover:text-gray-300">Dashboard</a>
        <a href="/admin/students" className="block hover:text-gray-300">Students</a>
        <a href="/admin/fees" className="block hover:text-gray-300">Fees</a>
        <a href="/logout" className="block hover:text-red-400">Logout</a>
      </nav>
    </div>
  );
};

export default Sidebar;
