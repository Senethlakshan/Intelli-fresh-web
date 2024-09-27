import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItineraryForm from './myform/ItineraryForm';
import PackageDetails from './myform/PackageDetails';
import PackageIncludes from './myform/PackageIncludes';
import PackageExcludes from './myform/PackageExcludes';
import Configuration from './myform/Configuration';
import MapUrl from './myform/MapUrl';


const MultiDayTour = () => {
  const [pkgType, setPkgType] = useState('multiday');
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [requestTobookingOption, setRequestTobookingOption] = useState('');
  const [bookingStartDate, setBookingStartDate] = useState('');
  const [BookingNotAvaibleOption, setBookingNotAvaibleOption] = useState('');
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itinerary, setItinerary] = useState([]);
  const [packageDetails, setPackageDetails] = useState([]);
  const [includes, setIncludes] = useState([]); 
  const [excludes, setExcludes] = useState([]);
  const [mapUrl, setMapUrl] = useState('');
  const [configuration, setConfiguration] = useState({
    CreatedDate: '',
    packageStartDate: '',
    PackageEndDate: '',
    CreatedBy: '',
    publishStatus: 'draft',
  });
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [mainPhoto, setMainPhoto] = useState(null);
  const [subPhotos, setSubPhotos] = useState([]);
  const [subPhotoPreviews, setSubPhotoPreviews] = useState([]);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const [mainPhotoPreview, setMainPhotoPreview] = useState(null);


  useEffect(() => {
    // Fetch categories
    fetch('http://localhost:5000/api/categoryInfos')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => toast.error(`Error fetching categories: ${error.message}`));

    // Fetch countries
    fetch('http://localhost:5000/api/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => toast.error(`Error fetching countries: ${error.message}`));
  }, []);





  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('Pkgtype', pkgType);
    formData.append('duration', duration || '');
    formData.append('title', title || '');
    formData.append('description', description || '');
    formData.append('destination', destination || '');
    formData.append('startLocation', startLocation || '');
    formData.append('endLocation', endLocation || '');
    formData.append('requestTobookingOption', requestTobookingOption || 'N');
    formData.append('bookingStartDate', bookingStartDate || '2024-10-01T00:00:00.000Z');
    formData.append('BookingNotAvaibleOption', BookingNotAvaibleOption || 'N');
    formData.append('country', selectedCountry || '');
    formData.append('category', selectedCategory || '');
    formData.append('itinerary', JSON.stringify(itinerary));
    formData.append('packageDetails', JSON.stringify(packageDetails));
    formData.append('includes', JSON.stringify(includes));
    formData.append('excludes', JSON.stringify(excludes));
    // formData.append('mapUrl', mapUrl || '');
    formData.append('mapUrl', encodeURIComponent(mapUrl));
    formData.append('configuration', JSON.stringify(configuration));
     // Append photos
     if (coverPhoto) formData.append('coverPhoto', coverPhoto);
     if (mainPhoto) formData.append('mainPhoto', mainPhoto);
     subPhotos.forEach(photo => formData.append('subPhotos', photo));


    fetch('http://localhost:5000/api/travelPackages', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Something went wrong');
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Package created successfully!');
      })
      .catch((error) => {
        toast.error(`Error creating package: ${error.message}`);
      });
  };


  //add photos handle

  const handleFileChange = (e, setPhoto, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + subPhotos.length > 6) {
      toast.error('You can only upload up to 6 photos.');
      return;
    }
    setSubPhotos((prev) => [...prev, ...files]);
  
    const previews = files.map((file) => URL.createObjectURL(file));
    setSubPhotoPreviews((prev) => [...prev, ...previews]);
  };
  
  const removeSubPhoto = (index) => {
    setSubPhotos((prev) => prev.filter((_, i) => i !== index));
    setSubPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };
  
   // Remove cover photo
   const removeCoverPhoto = () => {
    setCoverPhoto(null);
    setCoverPhotoPreview(null);
  };

  // Remove main photo
  const removeMainPhoto = () => {
    setMainPhoto(null);
    setMainPhotoPreview(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1>Create Multiday Package</h1>
      <form onSubmit={handleSubmit}>
        {/* Package Type */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="pkg-type"
            >
              Package Type
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="pkg-type"
              type="text"
              value={pkgType}
              disabled
            />
          </div>
          {/* Duration */}
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="duration"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
        
        {/* Title */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        
        {/* Description */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Destination */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="destination"
            >
              Destination
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          
          {/* Start Location */}
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="startLocation"
            >
              Start Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="startLocation"
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </div>
          
          {/* End Location */}
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="endLocation"
            >
              End Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="endLocation"
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Booking Options */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="requestTobookingOption"
            >
              Request To Booking Option
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="requestTobookingOption"
              value={requestTobookingOption}
              onChange={(e) => setRequestTobookingOption(e.target.value)}
            >
              <option value="N">No</option>
              <option value="Y">Yes</option>
            </select>
          </div>

          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="bookingStartDate"
            >
              Booking Start Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="bookingStartDate"
              type="datetime-local"
              value={bookingStartDate}
              onChange={(e) => setBookingStartDate(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="BookingNotAvaibleOption"
            >
              Booking Not Available Option
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="BookingNotAvaibleOption"
              value={BookingNotAvaibleOption}
              onChange={(e) => setBookingNotAvaibleOption(e.target.value)}
            >
              <option value="N">No</option>
              <option value="Y">Yes</option>
            </select>
          </div>
        </div>

        {/* Country */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.countryId} value={country.countryName}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.catName}>
                  {category.catName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/*  Photo ------------------------------------------------------------------------------ */}
      {/* Cover Photo */}
      <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="cover-photo"
            >
              Cover Photo
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="cover-photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setCoverPhoto, setCoverPhotoPreview)}
            />
            {coverPhotoPreview && (
              <div className="mt-2">
                <img src={coverPhotoPreview} alt="Cover Preview" className="w-full h-auto max-h-60 object-cover"/>
                <button
                  type="button"
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
                  onClick={removeCoverPhoto}
                >
                  Remove Cover Photo
                </button>
              </div>
            )}
          </div>

          {/* Main Photo */}
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="main-photo"
            >
              Main Photo
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="main-photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setMainPhoto, setMainPhotoPreview)}
            />
            {mainPhotoPreview && (
              <div className="mt-2">
                <img src={mainPhotoPreview} alt="Main Preview" className="w-full h-auto max-h-60 object-cover"/>
                <button
                  type="button"
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
                  onClick={removeMainPhoto}
                >
                  Remove Main Photo
                </button>
              </div>
            )}
          </div>
        </div>
        

  {/* Sub Photos */}
  <div className="mb-6">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Additional Photos (Max 6)
    </label>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleSubPhotoChange}
    />
    <div className="mt-2 flex flex-wrap">
      {subPhotoPreviews.map((preview, index) => (
        <div key={index} className="relative w-32 h-32 mr-2 mb-2">
          <img src={preview} alt={`Sub Photo ${index + 1}`} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => removeSubPhoto(index)}
            className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  </div>


     <div className="mt-10 mb-10 bg-gray-300 p-3 rounded-lg">
        
     <ItineraryForm itinerary={itinerary} setItinerary={setItinerary} />
     </div>

     <div className="mt-10 mb-10 bg-gray-300 p-3 rounded-lg">
     {/* Package Details */}
 <PackageDetails packageDetails={packageDetails} setPackageDetails={setPackageDetails} />
     </div>

 
     {/* Package Includes */}
     <div className="mt-10 mb-10 bg-gray-300 p-3 rounded-lg">
          <PackageIncludes includes={includes} setIncludes={setIncludes} />
        </div>

          {/* Package Excludes */}
          <div className="mt-10 mb-10 bg-gray-300 p-3 rounded-lg">
          <PackageExcludes excludes={excludes} setExcludes={setExcludes} />
        </div>

      {/* Google Maps URL */}
      <div className='mt-10 mb-10 bg-gray-300 p-3 rounded-lg'>
      <MapUrl mapUrl={mapUrl} setMapUrl={setMapUrl} />
      </div>
     

          {/* Configuration */}
          <div className="mt-10 mb-10 bg-gray-300 p-3 rounded-lg">
          <Configuration configuration={configuration} setConfiguration={setConfiguration} />
        </div>


          {/* submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Package
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MultiDayTour;
