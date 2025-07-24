// src/layouts/MainLayout.jsx
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
