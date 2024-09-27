import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

const TransfersPage = () => {
    const [transfers, setTransfers] = useState([]);
    const [selectedTransfer, setSelectedTransfer] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [viewDialogVisible, setViewDialogVisible] = useState(false);
    const [formValues, setFormValues] = useState({
        id: '',
        title: '',
        description: '',
        coverPhoto: '',
        fromLocation: '',
        toLocation: '',
        mapUrl: '',
        packageContent: '',
        country: '',
        category: '',
        destination: ''
    });
    const [file, setFile] = useState(null);
    const [countries, setCountries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchTransfers();
        fetchCountries();
        fetchCategories();
    }, []);

    const fetchTransfers = async () => {
        try {
            const response = await axios.get('https://adbackend.tourglobalhub.com/api/transfers');
            setTransfers(response.data);
        } catch (error) {
            console.error('Error fetching transfers:', error);
            toast.error('Failed to fetch transfers');
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://adbackend.tourglobalhub.com/api/countries');
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
            toast.error('Failed to fetch countries');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://adbackend.tourglobalhub.com/api/categoryInfos');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        }
    };

    const openNew = () => {
        setFormValues({
            id: '',
            title: '',
            description: '',
            coverPhoto: '',
            fromLocation: '',
            toLocation: '',
            mapUrl: '',
            packageContent: '',
            country: '',
            category: '',
            destination: ''
        });
        setFile(null);
        setIsDialogVisible(true);
    };

    const hideDialog = () => {
        setIsDialogVisible(false);
        setViewDialogVisible(false);
    };

    const saveTransfer = async () => {
        const formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
        formData.append('fromLocation', formValues.fromLocation);
        formData.append('toLocation', formValues.toLocation);
        formData.append('mapUrl', formValues.mapUrl);
        formData.append('packageContent', formValues.packageContent);
        formData.append('country', formValues.country);
        formData.append('category', formValues.category);
        formData.append('destination', formValues.destination);
        if (file) {
            formData.append('coverPhoto', file);
        }

        try {
            if (formValues.id) {
                await axios.put(`https://adbackend.tourglobalhub.com/api/transfers/${formValues.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Transfer Updated');
            } else {
                await axios.post('https://adbackend.tourglobalhub.com/api/transfers', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Transfer Created');
            }
            fetchTransfers();
            setIsDialogVisible(false);
        } catch (error) {
            console.error('Error saving transfer:', error.response ? error.response.data : error.message);
            toast.error('Failed to Save Transfer');
        }
    };

    const editTransfer = (rowData) => {
        setFormValues({
            id: rowData.id,
            title: rowData.title,
            description: rowData.description,
            coverPhoto: rowData.coverPhoto,
            fromLocation: rowData.fromLocation,
            toLocation: rowData.toLocation,
            mapUrl: rowData.mapUrl,
            packageContent: rowData.packageContent,
            country: rowData.country,
            category: rowData.category,
            destination: rowData.destination
        });
        setFile(null);
        setIsDialogVisible(true);
    };

    const deleteTransfer = async (rowData) => {
        try {
            await axios.delete(`https://adbackend.tourglobalhub.com/api/transfers/${rowData.id}`);
            fetchTransfers();
            toast.success('Transfer Deleted');
        } catch (error) {
            console.error('Error deleting transfer:', error.response ? error.response.data : error.message);
            toast.error('Failed to Delete Transfer');
        }
    };

    const viewTransfer = (rowData) => {
        setFormValues({
            id: rowData.id,
            title: rowData.title,
            description: rowData.description,
            coverPhoto: rowData.coverPhoto,
            fromLocation: rowData.fromLocation,
            toLocation: rowData.toLocation,
            mapUrl: rowData.mapUrl,
            packageContent: rowData.packageContent,
            country: rowData.country,
            category: rowData.category,
            destination: rowData.destination
        });
        setViewDialogVisible(true);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const onDropdownChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const coverPhotoBody = (rowData) => {
        const imageUrl = `https://adbackend.tourglobalhub.com/uploads/${rowData.coverPhoto}`;
        return (
            <img src={imageUrl} alt={rowData.title} className="w-16 h-16 object-cover" />
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY or equivalent
    };

    const previewImage = file ? URL.createObjectURL(file) : '';

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button 
                        className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 flex items-center space-x-2" 
                        onClick={openNew}
                    >
                        <i className="pi pi-plus"></i>
                        <span>New Transfer</span>
                    </button>
                    <button 
                        className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 flex items-center space-x-2" 
                        onClick={fetchTransfers}
                    >
                        <i className="pi pi-refresh"></i>
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            <DataTable value={transfers} paginator rows={10} className="p-datatable-gridlines">
                <Column field="title" header="Title" sortable />
                <Column header="Cover Photo" body={coverPhotoBody} />
                <Column field="fromLocation" header="From Location" sortable />
                <Column field="toLocation" header="To Location" sortable />
                <Column field="country" header="Country" sortable />
                <Column field="category" header="Category" sortable />
                <Column field="destination" header="Destination" sortable />
                <Column field="createdAt" header="Created At" body={(rowData) => formatDate(rowData.createdAt)} sortable />
                <Column body={(rowData) => (
                    <div className='flex items-center'>
                        <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" onClick={() => viewTransfer(rowData)} />
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editTransfer(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteTransfer(rowData)} />
                    </div>
                )} />
            </DataTable>

            {/* View Dialog */}
            <Dialog header="Transfer Details" visible={viewDialogVisible} style={{ width: '50vw' }} onHide={hideDialog}>
            <div className="grid grid-cols-1 gap-4">
                    <div className="col-span-1">
                        <img
                            src={formValues.coverPhoto ? `https://adbackend.tourglobalhub.com/uploads/${formValues.coverPhoto}` : ''}
                            alt={formValues.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="col-span-1">
                        <p><strong>Title:</strong> {formValues.title}</p>
                        <p><strong>Description:</strong> {formValues.description}</p>
                        <p><strong>From Location:</strong> {formValues.fromLocation}</p>
                        <p><strong>To Location:</strong> {formValues.toLocation}</p>
                        <p><strong>Map URL:</strong> <a href={formValues.mapUrl} target="_blank" rel="noopener noreferrer">{formValues.mapUrl}</a></p>
                        <p><strong>Package Content:</strong> {formValues.packageContent}</p>
                        <p><strong>Country:</strong> {formValues.country}</p>
                        <p><strong>Category:</strong> {formValues.category}</p>
                        <p><strong>Destination:</strong> {formValues.destination}</p>
                    </div>
                </div>
            </Dialog>

            {/* Form Dialog */}
            <Dialog header={formValues.id ? 'Edit Transfer' : 'New Transfer'} visible={isDialogVisible} style={{ width: '50vw' }} onHide={hideDialog}>
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            value={formValues.title}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formValues.description}
                            onChange={onInputChange}
                            rows="4"
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="fromLocation">From Location</label>
                        <input
                            id="fromLocation"
                            name="fromLocation"
                            value={formValues.fromLocation}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="toLocation">To Location</label>
                        <input
                            id="toLocation"
                            name="toLocation"
                            value={formValues.toLocation}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="mapUrl">Map URL</label>
                        <input
                            id="mapUrl"
                            name="mapUrl"
                            value={formValues.mapUrl}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="packageContent">Package Content</label>
                        <textarea
                            id="packageContent"
                            name="packageContent"
                            value={formValues.packageContent}
                            onChange={onInputChange}
                            rows="4"
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="country">Country</label>
                        <select
                            id="country"
                            name="country"
                            value={formValues.country}
                            onChange={onDropdownChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        >
                            <option value="">Select a Country</option>
                            {countries.map((country) => (
                                <option key={country.countryId} value={country.countryName}>{country.countryName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formValues.category}
                            onChange={onDropdownChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        >
                            <option value="">Select a Category</option>
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.catName}>{category.catName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="destination">Destination</label>
                        <input
                            id="destination"
                            name="destination"
                            value={formValues.destination}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="coverPhoto">Cover Photo</label>
                        <input
                            type="file"
                            id="coverPhoto"
                            name="coverPhoto"
                            onChange={onFileChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                        {previewImage && (
                            <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover mt-2" />
                        )}
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Button label="Cancel" icon="pi pi-times" className="p-button-text bg-red-600 p-2 text-white" onClick={hideDialog} />
                    <Button label="Save" icon="pi pi-check" className="p-button-primary ml-2 bg-green-600 p-2 text-white" onClick={saveTransfer} />
                </div>
            </Dialog>
        </div>
    );
};

export default TransfersPage;

