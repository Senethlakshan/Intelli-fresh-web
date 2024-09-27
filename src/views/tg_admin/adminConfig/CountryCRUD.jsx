import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx'; // Import the xlsx library

import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core Styles
import 'primeicons/primeicons.css'; // Icons

const API_URL = 'https://adbackend.tourglobalhub.com/api/countries';

const CountryCRUD = () => {
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        countryName: '',
        flag: null,
        description: '',
        locationDetails: null // Will hold JSON converted from the Excel file
    });
    const [flagPreview, setFlagPreview] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [viewDialog, setViewDialog] = useState(false);
    const [countryDetails, setCountryDetails] = useState(null);
    const [pagination, setPagination] = useState({ first: 0, rows: 10 });

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(API_URL);
            setCountries(response.data);
        } catch (error) {
            toast.error('Error fetching countries!');
        }
    };

    const fetchCountryById = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            setCountryDetails(response.data);
            setViewDialog(true);
        } catch (error) {
            toast.error('Error fetching country details!');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value || null
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            flag: file
        });

        // Preview the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setFlagPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setFlagPreview('');
        }
    };

    const handleExcelChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setFormData({
                    ...formData,
                    locationDetails: JSON.stringify(jsonData) // Convert JSON to string
                });
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('countryName', formData.countryName);
        form.append('description', formData.description);
        form.append('locationDetails', formData.locationDetails);
        if (formData.flag) form.append('flag', formData.flag);

        try {
            if (isEditing) {
                await axios.put(`${API_URL}/${selectedId}`, form);
                toast.success('Country updated successfully!');
            } else {
                await axios.post(API_URL, form);
                toast.success('Country added successfully!');
            }
            fetchCountries();
            resetForm();
            setDisplayDialog(false);
        } catch (error) {
            toast.error('Error saving country!');
        }
    };

    const handleEdit = (country) => {
        setIsEditing(true);
        setSelectedId(country.countryId);
        setFormData({
            countryName: country.countryName,
            description: country.description,
            flag: null,
            locationDetails: country.locationDetails
        });
        setFlagPreview(`https://adbackend.tourglobalhub.com/uploads/${country.flag}`);
        setDisplayDialog(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            toast.success('Country deleted successfully!');
            fetchCountries();
        } catch (error) {
            toast.error('Error deleting country!');
        }
    };

    const resetForm = () => {
        setFormData({
            countryName: '',
            flag: null,
            description: '',
            locationDetails: null
        });
        setFlagPreview('');
        setIsEditing(false);
        setSelectedId(null);
    };

    const onPage = (event) => {
        setPagination({
            first: event.first,
            rows: event.rows
        });
    };

    const renderLocationDetails = (locationDetails) => {
        if (!locationDetails) return <p>No locations available.</p>;

        try {
            let parsed = JSON.parse(locationDetails);

            // Handle double-encoded JSON
            if (typeof parsed === 'string') {
                parsed = JSON.parse(parsed);
            }

            if (Array.isArray(parsed)) {
                return (
                    <ul className="list-disc list-inside">
                        {parsed.map((location, index) => (
                            <li key={index}>{location.Location}</li>
                        ))}
                    </ul>
                );
            } else {
                return <p>No locations available.</p>;
            }
        } catch (error) {
            console.error('Error parsing location details:', error);
            return <p>Error parsing location details.</p>;
        }
    };

    return (
        <div className="bg-gray-300 min-h-screen p-3 rounded-md">
            <ToastContainer />
            <h1 className="text-black text-2xl font-bold mb-4">Country Management</h1>
            <div className="mb-4 flex justify-between items-center">
                <Button
                    label="Add Country"
                    icon="pi pi-plus"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                    onClick={() => {
                        resetForm();
                        setDisplayDialog(true);
                    }}
                />
                <Button
                    label="Refresh"
                    icon="pi pi-refresh"
                    className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2"
                    onClick={fetchCountries}
                />
            </div>
            <DataTable
                value={countries}
                paginator
                rows={pagination.rows}
                first={pagination.first}
                onPage={onPage}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                rowsPerPageOptions={[10, 20, 30]}
                className="p-datatable-customers"
            >
                <Column field="countryId" header="Country Id"></Column>
                <Column field="countryName" header="Country Name"></Column>
                <Column header="Flag" body={(rowData) => (
                    rowData.flag ? <img src={`https://adbackend.tourglobalhub.com/uploads/${rowData.flag}`} alt="flag" className="w-16 h-16 rounded-full" /> : 'No Flag'
                )}></Column>
                <Column body={(rowData) => (
                    <div className="flex space-x-2">
                        <Button
                            icon="pi pi-eye"
                            className="p-button-info"
                            onClick={() => fetchCountryById(rowData.countryId)}
                        />
                        <Button
                            icon="pi pi-pencil"
                            className="p-button-warning"
                            onClick={() => handleEdit(rowData)}
                        />
                        <Button
                            icon="pi pi-trash"
                            className="p-button-danger"
                            onClick={() => handleDelete(rowData.countryId)}
                        />
                    </div>
                )}></Column>
            </DataTable>

            <Dialog
                header={isEditing ? 'Edit Country' : 'Add Country'}
                visible={displayDialog}
                style={{ width: '50vw' }}
                footer={
                    <div className="flex justify-end gap-2">
                        <Button label="Cancel" icon="pi pi-times" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2" onClick={() => setDisplayDialog(false)} />
                        <Button label="Save" icon="pi pi-check" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2" onClick={handleAddOrUpdate} />
                    </div>
                }
                onHide={() => setDisplayDialog(false)}
            >
                <form onSubmit={handleAddOrUpdate}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="countryName">
                            Country Name
                        </label>
                        <input
                            type="text"
                            name="countryName"
                            value={formData.countryName}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter country name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter description"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flag">
                            Flag
                        </label>
                        <input
                            type="file"
                            name="flag"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {flagPreview && (
                            <div className="mt-4">
                                <img src={flagPreview} alt="Flag Preview" className="w-32 h-32 rounded-md" />
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="locationDetails">
                            Upload Excel for Location Details
                        </label>
                        <input
                            type="file"
                            name="locationDetails"
                            onChange={handleExcelChange}
                            accept=".xlsx, .xls"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </form>
            </Dialog>

            <Dialog
                header="Country Details"
                visible={viewDialog}
                style={{ width: '50vw' }}
                footer={
                    <div className="flex justify-end">
                        <Button label="Close" icon="pi pi-times" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2" onClick={() => setViewDialog(false)} />
                    </div>
                }
                onHide={() => setViewDialog(false)}
            >
                {countryDetails && (
                    <div>
                        <h2 className="text-xl font-bold mb-2">{countryDetails.countryName}</h2>
                        <p className="text-gray-700 mb-4">{countryDetails.description}</p>
                        {countryDetails.flag && (
                            <div className="mb-4">
                                <img src={`https://adbackend.tourglobalhub.com/uploads/${countryDetails.flag}`} alt="Flag" className="w-32 h-32 rounded-md" />
                            </div>
                        )}
                        <h3 className="text-lg font-bold">Location Details:</h3>
                        {renderLocationDetails(countryDetails.locationDetails)}
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default CountryCRUD;
