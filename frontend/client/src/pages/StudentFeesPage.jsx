import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentFeesPage = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await axios.get('/api/student/fees');
        setFees(res.data);
      } catch (err) {
        console.error('Failed to fetch fees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Fees</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{fee.description}</td>
                  <td className="px-4 py-2">{fee.dueDate}</td>
                  <td className="px-4 py-2">₱{fee.amount.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        fee.status === 'Paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                </tr>
              ))}
              {fees.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No fee records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentFeesPage;
