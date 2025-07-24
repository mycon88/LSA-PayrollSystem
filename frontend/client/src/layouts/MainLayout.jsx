// src/layouts/MainLayout.jsx
import Sidebar from '../components/Sidebar';

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">{children}</main>
    </div>
  );
}
