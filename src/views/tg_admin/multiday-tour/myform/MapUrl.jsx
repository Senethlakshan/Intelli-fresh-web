import React from 'react';

const MapUrl = ({ mapUrl, setMapUrl }) => {
  return (
    <div className="mb-6">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="mapUrl"
      >
        Google Maps URL
      </label>
      <textarea
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        id="mapUrl"
        rows="4"
        value={mapUrl}
        onChange={(e) => setMapUrl(e.target.value)}
        placeholder="Enter the Google Maps iframe URL here"
      />
     
      {/* google map web view added https://www.google.com/maps */}
     
     <div className="mb-4 mt-3 border border-gray-900 rounded-lg">
      <iframe
        src="https://www.google.com/maps"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-md shadow-lg"
      ></iframe>
    </div>
     
    </div>
  );
};

export default MapUrl;
