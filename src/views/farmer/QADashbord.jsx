import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QADashboard = () => {
  const [userData, setUserData] = useState(null);
  const [sampleData, setSampleData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!storedUser) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      setUserData(JSON.parse(storedUser));
      fetchSampleData(role); // Fetch sample data based on user role
    }
  }, [navigate]);

  const fetchSampleData = (role) => {
    // Sample data for demonstration purposes
    const data = [
      { id: 1, title: 'Quality Assurance Report', date: '2024-09-01', status: 'Reviewed' },
      { id: 2, title: 'Product Inspection Checklist', date: '2024-09-05', status: 'Pending' },
      { id: 3, title: 'Compliance Audit', date: '2024-09-10', status: 'Approved' },
    ];

    // Filter or modify data based on user role if necessary
    if (role === 'admin') {
      setSampleData(data);
    } else if (role === 'content manager') {
      // Modify data for content managers
      setSampleData(data.slice(0, 2)); // Example: Show only two items
    } else {
      setSampleData([]); // No data for other roles
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the QA Dashboard</h1>
      {userData && <h2 className="text-xl mb-2">Hello, {userData.name}!</h2>}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-2xl mb-3">Dashboard Overview</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">ID</th>
              <th className="border border-gray-300 p-2 text-left">Title</th>
              <th className="border border-gray-300 p-2 text-left">Date</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.length > 0 ? (
              sampleData.map(item => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2">{item.id}</td>
                  <td className="border border-gray-300 p-2">{item.title}</td>
                  <td className="border border-gray-300 p-2">{item.date}</td>
                  <td className="border border-gray-300 p-2">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 p-2 text-center">
                  No data available for your role.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QADashboard;
