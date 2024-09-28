import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RetailDashboard = () => {
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
      { id: 1, productName: 'Tomato', quantity: 50, price: 2.5, status: 'Available' },
      { id: 2, productName: 'Cucumber', quantity: 30, price: 1.5, status: 'Low Stock' },
      { id: 3, productName: 'Carrot', quantity: 0, price: 1.0, status: 'Out of Stock' },
    ];

    // You could further modify data for specific roles if needed
    if (role === 'retailer') {
      setSampleData(data);
    } else {
      setSampleData([]); // No data for other roles
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Retail Dashboard</h1>
      {userData && <h2 className="text-xl mb-2">Hello, {userData.name}!</h2>}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-2xl mb-3">Inventory Overview</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">ID</th>
              <th className="border border-gray-300 p-2 text-left">Product Name</th>
              <th className="border border-gray-300 p-2 text-left">Quantity</th>
              <th className="border border-gray-300 p-2 text-left">Price</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.length > 0 ? (
              sampleData.map(item => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2">{item.id}</td>
                  <td className="border border-gray-300 p-2">{item.productName}</td>
                  <td className="border border-gray-300 p-2">{item.quantity}</td>
                  <td className="border border-gray-300 p-2">${item.price.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 p-2 text-center">
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

export default RetailDashboard;
