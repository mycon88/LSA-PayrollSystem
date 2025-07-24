// src/layouts/StudentLayout.jsx
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';

export default function StudentLayout() {
  return (
    <div className="flex">
      <StudentSidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
