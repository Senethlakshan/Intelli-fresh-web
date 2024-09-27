import React, { useState, useEffect } from 'react';

// Component to manage individual season details
const SeasonDetail = ({
  season,
  index,
  updateSeason,
  removeSeason,
  seasons,
  isVisible,
  toggleVisibility
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSeason(index, { ...season, [name]: value });
  };

  const handleSeasonTypeChange = (e) => {
    const selectedSeason = seasons.find(season => season.seasonName === e.target.value);
    if (selectedSeason) {
      updateSeason(index, {
        ...season,
        seasonType: selectedSeason.seasonName,
        seasonStartDate: selectedSeason.startDate.split('T')[0], // Format to yyyy-MM-dd
        seasonEndDate: selectedSeason.endDate.split('T')[0], // Format to yyyy-MM-dd
      });
    } else {
      updateSeason(index, {
        ...season,
        seasonType: '',
        seasonStartDate: '',
        seasonEndDate: ''
      });
    }
  };

  const handleAddRate = (type) => {
    const newRate = { paxCount: '', rate: '' };
    updateSeason(index, {
      ...season,
      [type]: [...season[type], newRate],
    });
  };

  const handleRateChange = (type, rateIndex, field, value) => {
    const updatedRates = season[type].map((rate, i) =>
      i === rateIndex ? { ...rate, [field]: value } : rate
    );
    updateSeason(index, { ...season, [type]: updatedRates });
  };

  const handleRemoveRate = (type, rateIndex) => {
    const updatedRates = season[type].filter((_, i) => i !== rateIndex);
    updateSeason(index, { ...season, [type]: updatedRates });
  };

  const handleAddAdditionalCost = () => {
    const newCost = { costName: '', rate: '' };
    updateSeason(index, {
      ...season,
      additionalCosts: [...season.additionalCosts, newCost],
    });
  };

  const handleAdditionalCostChange = (costIndex, field, value) => {
    const updatedCosts = season.additionalCosts.map((cost, i) =>
      i === costIndex ? { ...cost, [field]: value } : cost
    );
    updateSeason(index, { ...season, additionalCosts: updatedCosts });
  };

  const handleRemoveAdditionalCost = (costIndex) => {
    const updatedCosts = season.additionalCosts.filter((_, i) => i !== costIndex);
    updateSeason(index, { ...season, additionalCosts: updatedCosts });
  };

  const handleAddPickupLocation = () => {
    const newLocation = { locationName: '', rate: '' };
    updateSeason(index, {
      ...season,
      pickupLocations: [...season.pickupLocations, newLocation],
    });
  };

  const handlePickupLocationChange = (locationIndex, field, value) => {
    const updatedLocations = season.pickupLocations.map((location, i) =>
      i === locationIndex ? { ...location, [field]: value } : location
    );
    updateSeason(index, { ...season, pickupLocations: updatedLocations });
  };

  const handleRemovePickupLocation = (locationIndex) => {
    const updatedLocations = season.pickupLocations.filter((_, i) => i !== locationIndex);
    updateSeason(index, { ...season, pickupLocations: updatedLocations });
  };

  // UserFeatureCost Handlers
  const handleAddUserFeatureCost = () => {
    const newUserFeatureCost = { costname: '', rate: '', description: '' };
    updateSeason(index, {
      ...season,
      UserFeatureCost: [...season.UserFeatureCost, newUserFeatureCost],
    });
  };

  const handleUserFeatureCostChange = (costIndex, field, value) => {
    const updatedUserFeatureCosts = season.UserFeatureCost.map((cost, i) =>
      i === costIndex ? { ...cost, [field]: value } : cost
    );
    updateSeason(index, { ...season, UserFeatureCost: updatedUserFeatureCosts });
  };

  const handleRemoveUserFeatureCost = (costIndex) => {
    const updatedUserFeatureCosts = season.UserFeatureCost.filter((_, i) => i !== costIndex);
    updateSeason(index, { ...season, UserFeatureCost: updatedUserFeatureCosts });
  };

  return (
    <div className="season-detail border p-4 mb-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Season {index + 1}</h3>
        <button
          type="button"
          onClick={() => toggleVisibility(index)}
          className="text-blue-500 hover:underline"
        >
          {isVisible ? 'Hide' : 'View All'}
        </button>
      </div>
      {isVisible && (
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Season Type:</label>
            <select
              name="seasonType"
              value={season.seasonType}
              onChange={handleSeasonTypeChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select Season</option>
              {seasons.map((season) => (
                <option key={season.seasonId} value={season.seasonName}>
                  {season.seasonName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date:</label>
            <input
              type="date"
              name="seasonStartDate"
              value={season.seasonStartDate}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date:</label>
            <input
              type="date"
              name="seasonEndDate"
              value={season.seasonEndDate}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <h4 className="text-md font-semibold">Adults Rates</h4>
          {season.adults.map((rate, i) => (
            <div key={i} className="rate-entry mb-2 flex">
              <input
                type="number"
                placeholder="Pax Count"
                value={rate.paxCount}
                onChange={(e) => handleRateChange('adults', i, 'paxCount', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/2 mr-2"
              />
              <input
                type="number"
                placeholder="Rate"
                value={rate.rate}
                onChange={(e) => handleRateChange('adults', i, 'rate', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/2 mr-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveRate('adults', i)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddRate('adults')}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Adult Rate
          </button>

          <h4 className="text-md font-semibold">Children Rates</h4>
          {season.children.map((rate, i) => (
            <div key={i} className="rate-entry mb-2 flex">
              <input
                type="number"
                placeholder="Pax Count"
                value={rate.paxCount}
                onChange={(e) => handleRateChange('children', i, 'paxCount', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/2 mr-2"
              />
              <input
                type="number"
                placeholder="Rate"
                value={rate.rate}
                onChange={(e) => handleRateChange('children', i, 'rate', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/2 mr-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveRate('children', i)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddRate('children')}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Child Rate
          </button>

          <h4 className="text-md font-semibold">Additional Costs</h4>
          {season.additionalCosts.map((cost, i) => (
            <div key={i} className="additional-cost-entry mb-2 flex">
              <input
                type="text"
                placeholder="Cost Name"
                value={cost.costName}
                onChange={(e) => handleAdditionalCostChange(i, 'costName', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/2 mr-2"
              />
              <input
                type="number"
                placeholder="Rate"
                value={cost.rate}
                onChange={(e) => handleAdditionalCostChange(i, 'rate', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/2 mr-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveAdditionalCost(i)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAdditionalCost}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Additional Cost
          </button>

          <h4 className="text-md font-semibold mt-4">Pickup Locations</h4>
          {season.pickupLocations.map((location, i) => (
            <div key={i} className="pickup-location-entry mb-2 flex">
              <input
                type="text"
                placeholder="Location Name"
                value={location.locationName}
                onChange={(e) => handlePickupLocationChange(i, 'locationName', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/2 mr-2"
              />
              <input
                type="number"
                placeholder="Rate"
                value={location.rate}
                onChange={(e) => handlePickupLocationChange(i, 'rate', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/2 mr-2"
              />
              <button
                type="button"
                onClick={() => handleRemovePickupLocation(i)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPickupLocation}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Pickup Location
          </button>

          <h4 className="text-md font-semibold mt-4">User Feature Costs</h4>
          {season.UserFeatureCost.map((cost, i) => (
            <div key={i} className="user-feature-cost-entry mb-2 flex">
              <input
                type="text"
                placeholder="Cost Name"
                value={cost.costname}
                onChange={(e) => handleUserFeatureCostChange(i, 'costname', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/3 mr-2"
              />
              <input
                type="number"
                placeholder="Rate"
                value={cost.rate}
                onChange={(e) => handleUserFeatureCostChange(i, 'rate', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/3 mr-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={cost.description}
                onChange={(e) => handleUserFeatureCostChange(i, 'description', e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-1/3 mr-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveUserFeatureCost(i)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddUserFeatureCost}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add User Feature Cost
          </button>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => removeSeason(index)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Remove Season
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main component to manage multiple seasons
const PackageDetails = () => {
  const [seasons, setSeasons] = useState([]);
  const [seasonDetails, setSeasonDetails] = useState([]);
  const [visibility, setVisibility] = useState([]);

  useEffect(() => {
    // Fetch seasons data from the API
    const fetchSeasons = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/seasons');
        const data = await response.json();
        setSeasons(data);
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    };
    fetchSeasons();
  }, []);

  const addSeasonDetail = () => {
    setSeasonDetails([
      ...seasonDetails,
      {
        seasonType: '',
        seasonStartDate: '',
        seasonEndDate: '',
        adults: [],
        children: [],
        additionalCosts: [],
        pickupLocations: [],
        UserFeatureCost: [],
      },
    ]);
    setVisibility([...visibility, true]);
  };

  const updateSeasonDetail = (index, updatedSeason) => {
    const newSeasonDetails = [...seasonDetails];
    newSeasonDetails[index] = updatedSeason;
    setSeasonDetails(newSeasonDetails);
  };

  const removeSeasonDetail = (index) => {
    const newSeasonDetails = seasonDetails.filter((_, i) => i !== index);
    setSeasonDetails(newSeasonDetails);
    const newVisibility = visibility.filter((_, i) => i !== index);
    setVisibility(newVisibility);
  };

  const toggleVisibility = (index) => {
    const newVisibility = [...visibility];
    newVisibility[index] = !newVisibility[index];
    setVisibility(newVisibility);
  };

  return (
    <div className="package-details">
      <h2 className="text-2xl font-bold mb-4">Package Details</h2>
      {seasonDetails.map((season, index) => (
        <SeasonDetail
          key={index}
          index={index}
          season={season}
          updateSeason={updateSeasonDetail}
          removeSeason={removeSeasonDetail}
          seasons={seasons}
          isVisible={visibility[index]}
          toggleVisibility={toggleVisibility}
        />
      ))}
      <button
        type="button"
        onClick={addSeasonDetail}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Season
      </button>
    </div>
  );
};

export default PackageDetails;


