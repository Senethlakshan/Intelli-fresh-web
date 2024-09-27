import React, { useState } from 'react';

const PackageIncludes = ({ includes, setIncludes }) => {
  const [newInclude, setNewInclude] = useState({ key: '', value: '' });

  // Helper function to count words in a string
  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const handleAddInclude = () => {
    if (newInclude.key && newInclude.value) {
      setIncludes([...includes, newInclude]);
      setNewInclude({ key: '', value: '' });
    }
  };

  const handleRemoveInclude = (index) => {
    const updatedIncludes = includes.filter((_, i) => i !== index);
    setIncludes(updatedIncludes);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Package Includes</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Key</th>
            <th className="px-4 py-2 text-left">Value</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {includes.map((include, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-4 py-2">{include.key}</td>
              <td className="px-4 py-2">{include.value}</td>
              <td className="px-4 py-2 text-center">
                <button
                  type="button"
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRemoveInclude(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col mb-4 mt-4">
        <input
          type="text"
          placeholder="Key (e.g., accommodation)"
          value={newInclude.key}
          onChange={(e) => setNewInclude({ ...newInclude, key: e.target.value })}
          className="border p-2 mb-2 rounded"
        />
        <textarea
          placeholder="Value (e.g., Hotel stay)"
          value={newInclude.value}
          onChange={(e) => {
            const newValue = e.target.value;
            if (countWords(newValue) <= 50) {
              setNewInclude({ ...newInclude, value: newValue });
            }
          }}
          className="border p-2 rounded"
          rows="4"
        />
        <p className="text-sm text-gray-500 mt-1">
          Max 50 words
        </p>
      </div>
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddInclude}
      >
        Add Include
      </button>
    </div>
  );
};

export default PackageIncludes;
