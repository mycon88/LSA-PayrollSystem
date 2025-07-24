// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import StudentsPage from './pages/StudentsPage';
import PayrollPage from './pages/PayrollPage';
import StudentFeesPage from './pages/StudentFeesPage';
import NotFound from './pages/NotFound';

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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Route>
      </Route>

      {/* Student Protected Routes */}
      <Route element={<RequireAuth allowedRoles={['student']} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="fees" element={<StudentFeesPage />} />
          <Route path="*" element={<Navigate to="/student" />} />
          <Route path="student/fees" element={<StudentFeesPage />} />

        </Route>
      </Route>

      {/* Catch-All Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
