// src/App.jsx
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import StudentsPage from './pages/StudentsPage';
import PayrollPage from './pages/PayrollPage';
import StudentFeesPage from './pages/StudentFeesPage';

import RequireAuth from './components/RequireAuth';
import AdminLayout from './layouts/AdminLayout';
import StudentLayout from './layouts/StudentLayout';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Admin Protected Routes */}
      <Route element={<RequireAuth allowedRoles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentsPage />} />
          <Route path="/admin/payroll" element={<PayrollPage />} />
        </Route>
      </Route>

      {/* Student Protected Routes */}
      <Route element={<RequireAuth allowedRoles={['student']} />}>
        <Route element={<StudentLayout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/fees" element={<StudentFeesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
