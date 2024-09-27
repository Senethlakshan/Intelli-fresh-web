import React, { useState } from 'react';

const MapURL = ({ onChange }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [HTMLmapUrl, setHTMLmapUrl] = useState('');

  const handleStartLocationChange = (e) => {
    setStartLocation(e.target.value);
    onChange('startLocation', e.target.value);
  };

  const handleEndLocationChange = (e) => {
    setEndLocation(e.target.value);
    onChange('endLocation', e.target.value);
  };

  const handleHTMLmapUrlChange = (e) => {
    setHTMLmapUrl(e.target.value);
    onChange('HTMLmapUrl', e.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Map URL</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Start Location</label>
        <input
          type="text"
          value={startLocation}
          onChange={handleStartLocationChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">End Location</label>
        <input
          type="text"
          value={endLocation}
          onChange={handleEndLocationChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">HTML Map Embed Code</label>
        <textarea
          value={HTMLmapUrl}
          onChange={handleHTMLmapUrlChange}
          className="border rounded-md p-2 w-full"
          rows="6"
        />
      </div>
    </div>
  );
};

export default MapURL;
