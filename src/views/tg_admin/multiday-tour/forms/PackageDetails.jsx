import React, { useState } from 'react';

const PackageDetails = ({ onChange }) => {
  const [adults, setAdults] = useState([{ pax: '', price: '' }]);
  const [children, setChildren] = useState([{ pax: '', price: '' }]);
  const [additionalCosts, setAdditionalCosts] = useState([
    { name: '', cost: '', details: '' },
  ]);
  const [destinations, setDestinations] = useState([
    { destination: '', rate: '' },
  ]);

  const handleAdultsChange = (index, e) => {
    const { name, value } = e.target;
    const newAdults = [...adults];
    newAdults[index][name] = value;
    setAdults(newAdults);
    onChange('adults', newAdults);
  };

  const handleChildrenChange = (index, e) => {
    const { name, value } = e.target;
    const newChildren = [...children];
    newChildren[index][name] = value;
    setChildren(newChildren);
    onChange('children', newChildren);
  };

  const handleAddAdult = () => {
    setAdults([...adults, { pax: '', price: '' }]);
  };

  const handleAddChild = () => {
    setChildren([...children, { pax: '', price: '' }]);
  };

  const handleAdditionalCostChange = (index, e) => {
    const { name, value } = e.target;
    const newCosts = [...additionalCosts];
    newCosts[index][name] = value;
    setAdditionalCosts(newCosts);
    onChange('addCost', newCosts);
  };

  const handleAddCost = () => {
    setAdditionalCosts([...additionalCosts, { name: '', cost: '', details: '' }]);
  };

  const handleDestinationChange = (index, e) => {
    const { name, value } = e.target;
    const newDestinations = [...destinations];
    newDestinations[index][name] = value;
    setDestinations(newDestinations);
    onChange('destination', newDestinations);
  };

  const handleAddDestination = () => {
    setDestinations([...destinations, { destination: '', rate: '' }]);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Package Details</h2>
      
      <h3 className="text-lg font-semibold mb-2">Adults</h3>
      {adults.map((adult, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 mb-1">Pax</label>
          <input
            type="text"
            name="pax"
            value={adult.pax}
            onChange={(e) => handleAdultsChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Price</label>
          <input
            type="text"
            name="price"
            value={adult.price}
            onChange={(e) => handleAdultsChange(index, e)}
            className="border rounded-md p-2 w-full"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddAdult}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
      >
        Add Adult
      </button>

      <h3 className="text-lg font-semibold mt-6 mb-2">Children</h3>
      {children.map((child, index) => (
        <div key={index} className="mb-4 flex">
          <label className="block text-gray-700 mb-1">Pax</label>
          <input
            type="text"
            name="pax"
            value={child.pax}
            onChange={(e) => handleChildrenChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Price</label>
          <input
            type="text"
            name="price"
            value={child.price}
            onChange={(e) => handleChildrenChange(index, e)}
            className="border rounded-md p-2 w-full"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddChild}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
      >
        Add Child
      </button>

      <h3 className="text-lg font-semibold mt-6 mb-2">Additional Costs</h3>
      {additionalCosts.map((cost, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 mb-1">Cost Name</label>
          <input
            type="text"
            name="name"
            value={cost.name}
            onChange={(e) => handleAdditionalCostChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Cost</label>
          <input
            type="text"
            name="cost"
            value={cost.cost}
            onChange={(e) => handleAdditionalCostChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Details</label>
          <textarea
            name="details"
            value={cost.details}
            onChange={(e) => handleAdditionalCostChange(index, e)}
            className="border rounded-md p-2 w-full"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddCost}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
      >
        Add Cost
      </button>

      <h3 className="text-lg font-semibold mt-6 mb-2">Destination</h3>
      {destinations.map((destination, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 mb-1">Destination</label>
          <input
            type="text"
            name="destination"
            value={destination.destination}
            onChange={(e) => handleDestinationChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Rate</label>
          <input
            type="text"
            name="rate"
            value={destination.rate}
            onChange={(e) => handleDestinationChange(index, e)}
            className="border rounded-md p-2 w-full"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddDestination}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
      >
        Add Destination
      </button>
    </div>
  );
};

export default PackageDetails;
