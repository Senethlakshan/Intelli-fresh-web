import React, { useState } from 'react';

const Itinerary = ({ onChange }) => {
  const [days, setDays] = useState([
    { day: 'Day 1', description: '', travelTime: '', activities: '', accommodation: '', mealPlan: '', transferMode: '', photos: [] },
  ]);

  const handleDayChange = (index, e) => {
    const { name, value } = e.target;
    const newDays = [...days];
    newDays[index][name] = value;
    setDays(newDays);
    onChange('itinerary', newDays); // Pass data to parent
  };

  const handleAddDay = () => {
    setDays([...days, { day: '', description: '', travelTime: '', activities: '', accommodation: '', mealPlan: '', transferMode: '', photos: [] }]);
  };

  const handleRemoveDay = (index) => {
    const newDays = days.filter((_, i) => i !== index);
    setDays(newDays);
    onChange('itinerary', newDays); // Pass data to parent
  };

  const handlePhotoChange = (dayIndex, e) => {
    const files = Array.from(e.target.files);
    const newDays = [...days];
    newDays[dayIndex].photos = files;
    setDays(newDays);
    onChange('itinerary', newDays); // Pass data to parent
  };

  return (
    <div>
      {days.map((day, index) => (
        <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Day {index + 1}</h3>
          <label className="block text-gray-700 mb-1">Day Title</label>
          <input
            type="text"
            name="day"
            value={day.day}
            onChange={(e) => handleDayChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />
          
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={day.description}
            onChange={(e) => handleDayChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Travel Time</label>
          <input
            type="text"
            name="travelTime"
            value={day.travelTime}
            onChange={(e) => handleDayChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Activities</label>
          <input
            type="text"
            name="activities"
            value={day.activities}
            onChange={(e) => handleDayChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Accommodation</label>
          <input
            type="text"
            name="accommodation"
            value={day.accommodation}
            onChange={(e) => handleDayChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Meal Plan</label>
          <input
            type="text"
            name="mealPlan"
            value={day.mealPlan}
            onChange={(e) => handleDayChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Transfer Mode</label>
          <input
            type="text"
            name="transferMode"
            value={day.transferMode}
            onChange={(e) => handleDayChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />

          <label className="block text-gray-700 mb-1">Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handlePhotoChange(index, e)}
            className="border rounded-md p-2 w-full mb-4"
          />
          {day.photos.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {Array.from(day.photos).map((photo, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(photo)}
                  alt={`Preview ${i}`}
                  className="w-32 h-32 object-cover rounded-md border border-gray-300"
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => handleRemoveDay(index)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-4 mr-4"
          >
            Remove Day
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddDay}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Day
      </button>
    </div>
  );
};

export default Itinerary;
