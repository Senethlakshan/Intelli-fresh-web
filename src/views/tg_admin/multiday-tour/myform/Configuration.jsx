// src/myform/Configuration.js
import React, { useState } from 'react';

const Configuration = ({ configuration, setConfiguration }) => {
  const [config, setConfig] = useState(configuration || {
    CreatedDate: '',
    packageStartDate: '',
    PackageEndDate: '',
    CreatedBy: '',
    publishStatus: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setConfig({
      ...config,
      [id]: value,
    });
    setConfiguration(config); // Update parent component with the new configuration
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Configuration</h2>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CreatedDate">
            Created Date
          </label>
          <input
            type="date"
            id="CreatedDate"
            value={config.CreatedDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="packageStartDate">
            Package Start Date
          </label>
          <input
            type="date"
            id="packageStartDate"
            value={config.packageStartDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PackageEndDate">
            Package End Date
          </label>
          <input
            type="date"
            id="PackageEndDate"
            value={config.PackageEndDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CreatedBy">
            Created By
          </label>
          <input
            type="text"
            id="CreatedBy"
            value={config.CreatedBy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full px-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishStatus">
            Publish Status
          </label>
          <select
            id="publishStatus"
            value={config.publishStatus}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
