import React, { useState } from 'react';

const IncludesExcludes = ({ onChange }) => {
  const [includes, setIncludes] = useState([
   
  ]);
  const [excludes, setExcludes] = useState([
   
  ]);
  const [bookingInfo, setBookingInfo] = useState([
  
  ]);
  const [cancellationPolicy, setCancellationPolicy] = useState([
   
  ]);

  const handleIncludeChange = (index, e) => {
    const newIncludes = [...includes];
    newIncludes[index].ListItem = e.target.value;
    setIncludes(newIncludes);
    onChange('includes', newIncludes);
  };

  const handleExcludeChange = (index, e) => {
    const newExcludes = [...excludes];
    newExcludes[index].ListItem = e.target.value;
    setExcludes(newExcludes);
    onChange('excludes', newExcludes);
  };

  const handleAddInclude = () => {
    setIncludes([...includes, { id: includes.length + 1, ListItem: '' }]);
  };

  const handleAddExclude = () => {
    setExcludes([...excludes, { id: excludes.length + 1, ListItem: '' }]);
  };

  const handleRemoveInclude = (index) => {
    setIncludes(includes.filter((_, i) => i !== index));
  };

  const handleRemoveExclude = (index) => {
    setExcludes(excludes.filter((_, i) => i !== index));
  };

  const handleBookingInfoChange = (index, e) => {
    const newBookingInfo = [...bookingInfo];
    newBookingInfo[index].children[0].text = e.target.value;
    setBookingInfo(newBookingInfo);
    onChange('bookingInfo', newBookingInfo);
  };

  const handleCancellationPolicyChange = (index, e) => {
    const newCancellationPolicy = [...cancellationPolicy];
    newCancellationPolicy[index].children[0].text = e.target.value;
    setCancellationPolicy(newCancellationPolicy);
    onChange('cancellationPolicy', newCancellationPolicy);
  };

  const handleAddBookingInfo = () => {
    setBookingInfo([...bookingInfo, { type: 'paragraph', children: [{ text: '', type: 'text' }] }]);
  };

  const handleAddCancellationPolicy = () => {
    setCancellationPolicy([...cancellationPolicy, { type: 'paragraph', children: [{ text: '', type: 'text' }] }]);
  };

  const handleRemoveBookingInfo = (index) => {
    setBookingInfo(bookingInfo.filter((_, i) => i !== index));
  };

  const handleRemoveCancellationPolicy = (index) => {
    setCancellationPolicy(cancellationPolicy.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Includes */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Includes</h2>
        {includes.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={item.ListItem}
              onChange={(e) => handleIncludeChange(index, e)}
              className="border rounded-md p-2 w-full mr-2"
            />
            <button
              type="button"
              onClick={() => handleRemoveInclude(index)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddInclude}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Include
        </button>
      </div>

      {/* Excludes */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Excludes</h2>
        {excludes.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={item.ListItem}
              onChange={(e) => handleExcludeChange(index, e)}
              className="border rounded-md p-2 w-full mr-2"
            />
            <button
              type="button"
              onClick={() => handleRemoveExclude(index)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddExclude}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Exclude
        </button>
      </div>

      {/* Booking Information */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Booking Information</h2>
        {bookingInfo.map((info, index) => (
          <div key={index} className="mb-4">
            <textarea
              value={info.children[0].text}
              onChange={(e) => handleBookingInfoChange(index, e)}
              className="border rounded-md p-2 w-full"
              placeholder={`Booking Info ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => handleRemoveBookingInfo(index)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-2"
            >
              Remove Info
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddBookingInfo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Booking Info
        </button>
      </div>

      {/* Cancellation Policy */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Cancellation Policy</h2>
        {cancellationPolicy.map((policy, index) => (
          <div key={index} className="mb-4">
            <textarea
              value={policy.children[0].text}
              onChange={(e) => handleCancellationPolicyChange(index, e)}
              className="border rounded-md p-2 w-full"
              placeholder={`Cancellation Policy ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => handleRemoveCancellationPolicy(index)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-2"
            >
              Remove Policy
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCancellationPolicy}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Cancellation Policy
        </button>
      </div>
    </div>
  );
};

export default IncludesExcludes;
