import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from "./components/Auth/LoginForm";
import AdminDashboard from './pages/AdminDashboard';
import RequireAuth from './components/RequireAuth';
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

         {/* Protected Admin Routes */}
        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Add more admin routes here */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
