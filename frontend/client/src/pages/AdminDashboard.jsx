// src/pages/AdminDashboard.jsx
import React from 'react';
import { getCurrentUser } from '../services/authService';

const AdminDashboard = () => {
  const user = getCurrentUser();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, Admin {user?.name || ''}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow">
          <p className="font-semibold text-gray-700">Total Students</p>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="font-semibold text-gray-700">Pending Fees</p>
          <p className="text-2xl font-bold text-red-500">₱45,000</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="font-semibold text-gray-700">Payroll Processed</p>
          <p className="text-2xl font-bold text-green-600">₱80,000</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
