// src/layouts/StudentLayout.jsx
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      
      <main className="flex-1 p-6 ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
