// src/pages/StudentDashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.name || 'Student'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold">Your Balance:</p>
          <p className="text-xl text-red-600">₱5,000</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold">Next Due Date:</p>
          <p className="text-xl">Aug 30, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
