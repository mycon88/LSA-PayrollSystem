// src/components/Auth/LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';


const LoginForm = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Admin Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
