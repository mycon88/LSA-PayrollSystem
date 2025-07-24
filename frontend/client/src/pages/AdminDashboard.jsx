// src/pages/AdminDashboard.jsx
import React from 'react';
import { getCurrentUser } from '../services/authService';

const AdminDashboard = () => {
  const user = getCurrentUser();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, Admin {user?.name || ''}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Students: 120</div>
        <div className="bg-white p-4 rounded shadow">Pending Fees: ₱45,000</div>
        <div className="bg-white p-4 rounded shadow">Payroll Processed: ₱80,000</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
