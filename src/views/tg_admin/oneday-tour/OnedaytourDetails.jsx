import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';

const OnedaytourDetails = ({ packageData, isEditMode }) => {
    const [title, setTitle] = useState(packageData?.title || '');
    const [description, setDescription] = useState(packageData?.description || '');
    const [benefits, setBenefits] = useState(packageData?.benefits || [{ type: '', name: '' }]);
    const [activities, setActivities] = useState(packageData?.activities || [{ time: '', activity: '' }]);
    const [includes, setIncludes] = useState(packageData?.includes || {
        inclusion: [{ ListItem: '' }],
        exclusion: [{ ListItem: '' }]
    });
    const [mapUrl, setMapUrl] = useState(packageData?.mapUrl || '');

    // State for packagePrices
    const [packagePrices, setPackagePrices] = useState(packageData?.packagePrices || {
        seasonType1: {
            seasonStartDate: '',
            seasonEndDate: '',
            adults: [{ paxCount: 1, rates: 0 }],
            childs: [{ paxCount: 1, rates: 0 }],
            additionalCost: [{ costName: '', rate: 0 }],
            pickupLocations: [{ locationName: '', rate: 0 }]
        }
    });

    const apiUrl = 'https://adbackend.tourglobalhub.com/api/oneDayTourPackages';

    // Handlers for Benefits
    const handleAddBenefit = () => {
        setBenefits([...benefits, { type: '', name: '' }]);
    };

    const handleRemoveBenefit = (index) => {
        const updatedBenefits = [...benefits];
        updatedBenefits.splice(index, 1);
        setBenefits(updatedBenefits);
    };

    const handleChangeBenefit = (index, key, value) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index][key] = value;
        setBenefits(updatedBenefits);
    };

    // Handlers for Activities
    const handleAddActivity = () => {
        setActivities([...activities, { time: '', activity: '' }]);
    };

    const handleRemoveActivity = (index) => {
        const updatedActivities = [...activities];
        updatedActivities.splice(index, 1);
        setActivities(updatedActivities);
    };

    const handleChangeActivity = (index, key, value) => {
        const updatedActivities = [...activities];
        updatedActivities[index][key] = value;
        setActivities(updatedActivities);
    };

    // Handlers for Inclusions
    const handleAddInclusion = () => {
        setIncludes({
            ...includes,
            inclusion: [...includes.inclusion, { ListItem: '' }]
        });
    };

    const handleRemoveInclusion = (index) => {
        const updatedInclusions = [...includes.inclusion];
        updatedInclusions.splice(index, 1);
        setIncludes({ ...includes, inclusion: updatedInclusions });
    };

    const handleChangeInclusion = (index, value) => {
        const updatedInclusions = [...includes.inclusion];
        updatedInclusions[index].ListItem = value;
        setIncludes({ ...includes, inclusion: updatedInclusions });
    };

    // Handlers for Exclusions
    const handleAddExclusion = () => {
        setIncludes({
            ...includes,
            exclusion: [...includes.exclusion, { ListItem: '' }]
        });
    };

    const handleRemoveExclusion = (index) => {
        const updatedExclusions = [...includes.exclusion];
        updatedExclusions.splice(index, 1);
        setIncludes({ ...includes, exclusion: updatedExclusions });
    };

    const handleChangeExclusion = (index, value) => {
        const updatedExclusions = [...includes.exclusion];
        updatedExclusions[index].ListItem = value;
        setIncludes({ ...includes, exclusion: updatedExclusions });
    };

    // Handlers for Package Prices
    const handleAddPrice = (seasonType) => {
        setPackagePrices({
            ...packagePrices,
            [seasonType]: {
                ...packagePrices[seasonType],
                adults: [...packagePrices[seasonType].adults, { paxCount: 1, rates: 0 }],
                childs: [...packagePrices[seasonType].childs, { paxCount: 1, rates: 0 }],
                additionalCost: [...packagePrices[seasonType].additionalCost, { costName: '', rate: 0 }],
                pickupLocations: [...packagePrices[seasonType].pickupLocations, { locationName: '', rate: 0 }]
            }
        });
    };

    const handleRemovePrice = (seasonType, key, index) => {
        setPackagePrices({
            ...packagePrices,
            [seasonType]: {
                ...packagePrices[seasonType],
                [key]: packagePrices[seasonType][key].filter((_, i) => i !== index)
            }
        });
    };

    const handleChangePrice = (seasonType, key, index, field, value) => {
        const updatedPrices = [...packagePrices[seasonType][key]];
        updatedPrices[index][field] = value;
        setPackagePrices({
            ...packagePrices,
            [seasonType]: {
                ...packagePrices[seasonType],
                [key]: updatedPrices
            }
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('benefits', JSON.stringify(benefits));
        formData.append('activities', JSON.stringify(activities));
        formData.append('includes', JSON.stringify(includes));
        formData.append('mapUrl', mapUrl);
        formData.append('packagePrices', JSON.stringify(packagePrices));

        try {
            if (isEditMode) {
                await axios.put(`${apiUrl}/${packageData.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Package updated successfully!');
            } else {
                await axios.post(apiUrl, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Package created successfully!');
            }
        } catch (error) {
            toast.error('An error occurred while saving the package.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">{isEditMode ? 'Update One Day Tour' : 'Add New One Day Tour'}</h1>
            <form onSubmit={handleFormSubmit}>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Benefits Section */}
                <div className="mb-4">
                    <label className="block text-gray-700">Benefits</label>
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex space-x-4 mb-2">
                            <input
                                type="text"
                                placeholder="Benefit Type"
                                value={benefit.type}
                                onChange={(e) => handleChangeBenefit(index, 'type', e.target.value)}
                                className="p-2 w-1/2 border rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Benefit Name"
                                value={benefit.name}
                                onChange={(e) => handleChangeBenefit(index, 'name', e.target.value)}
                                className="p-2 w-1/2 border rounded-md"
                            />
                            <button type="button" onClick={() => handleRemoveBenefit(index)} className="text-red-500">
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                        onClick={handleAddBenefit}
                    >
                        Add Benefit
                    </button>
                </div>

                {/* Activities Section */}
                <div className="mb-4">
                    <label className="block text-gray-700">Activities</label>
                    {activities.map((activity, index) => (
                        <div key={index} className="flex space-x-4 mb-2">
                            <input
                                type="text"
                                placeholder="Time"
                                value={activity.time}
                                onChange={(e) => handleChangeActivity(index, 'time', e.target.value)}
                                className="p-2 w-1/2 border rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Activity"
                                value={activity.activity}
                                onChange={(e) => handleChangeActivity(index, 'activity', e.target.value)}
                                className="p-2 w-1/2 border rounded-md"
                            />
                            <button type="button" onClick={() => handleRemoveActivity(index)} className="text-red-500">
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                        onClick={handleAddActivity}
                    >
                        Add Activity
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="p-2 bg-green-500 text-white rounded-md"
                >
                    {isEditMode ? 'Update Tour' : 'Add Tour'}
                </button>
            </form>
        </div>
    );
};

export default OnedaytourDetails;
