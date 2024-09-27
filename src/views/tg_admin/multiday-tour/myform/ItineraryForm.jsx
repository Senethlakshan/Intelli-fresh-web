import React, { useState } from 'react';

const ItineraryForm = ({ itinerary, setItinerary }) => {
  // State to manage visibility of each day's details
  const [dayVisibility, setDayVisibility] = useState(itinerary.map(() => false));

  const toggleVisibility = (index) => {
    const newVisibility = [...dayVisibility];
    newVisibility[index] = !newVisibility[index];
    setDayVisibility(newVisibility);
  };

  const handleDayChange = (index, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const handleListChange = (dayIndex, field, itemIndex, value) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex][field][itemIndex] = value;
    setItinerary(newItinerary);
  };

  const addDay = () => {
    const newDay = {
      day: itinerary.length + 1,
      description: '',
      activities: [''],
      accommodation: [''],
      mealPlan: [''],
      transferMode: [''],
    };
    setItinerary([...itinerary, newDay]);
    setDayVisibility([...dayVisibility, false]); // Hide details for new day
  };

  const deleteDay = (index) => {
    const newItinerary = itinerary.filter((_, i) => i !== index);
    setItinerary(newItinerary);
    const newVisibility = dayVisibility.filter((_, i) => i !== index);
    setDayVisibility(newVisibility);
  };

  const addItem = (dayIndex, field) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex][field].push('');
    setItinerary(newItinerary);
  };

  const deleteItem = (dayIndex, field, itemIndex) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex][field] = newItinerary[dayIndex][field].filter((_, i) => i !== itemIndex);
    setItinerary(newItinerary);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Itinerary</h2>
      {itinerary.map((day, index) => (
        <div key={index} className="border p-6 mb-6 rounded-lg shadow-md bg-gray-100">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">Day {index + 1}</h3>
            <button
              type="button"
              onClick={() => toggleVisibility(index)}
              className="text-blue-500"
            >
              {dayVisibility[index] ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {dayVisibility[index] && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                  value={day.description}
                  onChange={(e) => handleDayChange(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Activities Section */}
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-2">Activities</h4>
                {day.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => handleListChange(index, 'activities', activityIndex, e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => deleteItem(index, 'activities', activityIndex)}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(index, 'activities')}
                  className="text-blue-500"
                >
                  Add Activity
                </button>
              </div>

              {/* Accommodation Section */}
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-2">Accommodations</h4>
                {day.accommodation.map((accommodation, accommodationIndex) => (
                  <div key={accommodationIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={accommodation}
                      onChange={(e) => handleListChange(index, 'accommodation', accommodationIndex, e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => deleteItem(index, 'accommodation', accommodationIndex)}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(index, 'accommodation')}
                  className="text-blue-500"
                >
                  Add Accommodation
                </button>
              </div>

              {/* Meal Plan Section */}
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-2">Meal Plan</h4>
                {day.mealPlan.map((meal, mealIndex) => (
                  <div key={mealIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={meal}
                      onChange={(e) => handleListChange(index, 'mealPlan', mealIndex, e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => deleteItem(index, 'mealPlan', mealIndex)}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(index, 'mealPlan')}
                  className="text-blue-500"
                >
                  Add Meal
                </button>
              </div>

              {/* Transfer Mode Section */}
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-2">Transfer Mode</h4>
                {day.transferMode.map((transfer, transferIndex) => (
                  <div key={transferIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={transfer}
                      onChange={(e) => handleListChange(index, 'transferMode', transferIndex, e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => deleteItem(index, 'transferMode', transferIndex)}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(index, 'transferMode')}
                  className="text-blue-500"
                >
                  Add Transfer Mode
                </button>
              </div>

              <button
                type="button"
                onClick={() => deleteDay(index)}
                className="text-red-500"
              >
                Delete Day
              </button>
            </>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addDay}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Day
      </button>
    </div>
  );
};

export default ItineraryForm;
