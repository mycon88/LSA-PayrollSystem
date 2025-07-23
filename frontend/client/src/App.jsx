// App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import RequireAuth from './components/RequireAuth';
import AdminLayout from './layouts/AdminLayout';
import StudentLayout from './layouts/StudentLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/admin" element={
        <RequireAuth role="admin">
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </RequireAuth>
      } />

      <Route path="/student" element={
        <RequireAuth role="student">
          <StudentLayout>
            <StudentDashboard />
          </StudentLayout>
        </RequireAuth>
      } />
    </Routes>
  );
}

export default App;
