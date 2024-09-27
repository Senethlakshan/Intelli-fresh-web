import React, { useState } from 'react';

const PackageExcludes = ({ excludes, setExcludes }) => {
  const [newExclude, setNewExclude] = useState({ key: '', value: '' });

  const handleAddExclude = () => {
    if (newExclude.key && newExclude.value) {
      setExcludes([...excludes, newExclude]);
      setNewExclude({ key: '', value: '' });
    }
  };

  const handleRemoveExclude = (index) => {
    const updatedExcludes = excludes.filter((_, i) => i !== index);
    setExcludes(updatedExcludes);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Package Excludes</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Key</th>
            <th className="px-4 py-2 text-left">Value</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {excludes.map((exclude, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-4 py-2">{exclude.key}</td>
              <td className="px-4 py-2">{exclude.value}</td>
              <td className="px-4 py-2 text-center">
                <button
                  type="button"
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRemoveExclude(index)}
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
          placeholder="Key (e.g., flights)"
          value={newExclude.key}
          onChange={(e) => setNewExclude({ ...newExclude, key: e.target.value })}
          className="border p-2 mb-2 rounded"
        />
        <textarea
          placeholder="Value (e.g., International flights)"
          value={newExclude.value}
          onChange={(e) => setNewExclude({ ...newExclude, value: e.target.value })}
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
        onClick={handleAddExclude}
      >
        Add Exclude
      </button>
    </div>
  );
};

export default PackageExcludes;
