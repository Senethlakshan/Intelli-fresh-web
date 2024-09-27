import React, { useState } from 'react';

const Config = ({ onChange }) => {
  const [config, setConfig] = useState({
    createDate: '',
    updateDate: '',
    createdBy: '',
    schedulePostDate: '',
    publish: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: type === 'checkbox' ? checked : value,
    }));
    onChange('config', { ...config, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Configuration</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Create Date</label>
        <input
          type="date"
          name="createDate"
          value={config.createDate}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Update Date</label>
        <input
          type="date"
          name="updateDate"
          value={config.updateDate}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Created By</label>
        <input
          type="text"
          name="createdBy"
          value={config.createdBy}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Schedule Post Date</label>
        <input
          type="date"
          name="schedulePostDate"
          value={config.schedulePostDate}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Publish</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="publish"
            checked={config.publish}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-gray-700">Publish this package</span>
        </div>
      </div>
    </div>
  );
};

export default Config;
