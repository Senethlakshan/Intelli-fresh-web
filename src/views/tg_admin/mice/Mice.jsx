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

const MICEPage = () => {
    const [mice, setMICE] = useState([]);
    const [selectedMICE, setSelectedMICE] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [viewDialogVisible, setViewDialogVisible] = useState(false);
    const [formValues, setFormValues] = useState({
        id: '',
        title: '',
        description: '',
        coverPhoto: '',
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
        fetchMICE();
        fetchCountries();
        fetchCategories();
    }, []);

    const fetchMICE = async () => {
        try {
            const response = await axios.get('https://adbackend.tourglobalhub.com/api/mice');
            setMICE(response.data);
        } catch (error) {
            console.error('Error fetching MICE:', error);
            toast.error('Failed to fetch MICE');
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

    const saveMICE = async () => {
        const formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
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
                await axios.put(`https://adbackend.tourglobalhub.com/api/mice/${formValues.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('MICE Updated');
            } else {
                await axios.post('https://adbackend.tourglobalhub.com/api/mice', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('MICE Created');
            }
            fetchMICE();
            setIsDialogVisible(false);
        } catch (error) {
            console.error('Error saving MICE:', error.response ? error.response.data : error.message);
            toast.error('Failed to Save MICE');
        }
    };

    const editMICE = (rowData) => {
        setFormValues({
            id: rowData.id,
            title: rowData.title,
            description: rowData.description,
            coverPhoto: rowData.coverPhoto,
            mapUrl: rowData.mapUrl,
            packageContent: rowData.packageContent,
            country: rowData.country,
            category: rowData.category,
            destination: rowData.destination
        });
        setFile(null);
        setIsDialogVisible(true);
    };

    const deleteMICE = async (rowData) => {
        try {
            await axios.delete(`https://adbackend.tourglobalhub.com/api/mice/${rowData.id}`);
            fetchMICE();
            toast.success('MICE Deleted');
        } catch (error) {
            console.error('Error deleting MICE:', error.response ? error.response.data : error.message);
            toast.error('Failed to Delete MICE');
        }
    };

    const viewMICE = (rowData) => {
        setFormValues({
            id: rowData.id,
            title: rowData.title,
            description: rowData.description,
            coverPhoto: rowData.coverPhoto,
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
                        <span>New MICE</span>
                    </button>
                    <button 
                        className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 flex items-center space-x-2" 
                        onClick={fetchMICE}
                    >
                        <i className="pi pi-refresh"></i>
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            <DataTable value={mice} paginator rows={10} className="p-datatable-gridlines">
                <Column field="title" header="Title" sortable />
                <Column header="Cover Photo" body={coverPhotoBody} />
                <Column field="country" header="Country" sortable />
                <Column field="category" header="Category" sortable />
                <Column field="destination" header="Destination" sortable />
                <Column field="createdAt" header="Created At" body={(rowData) => formatDate(rowData.createdAt)} sortable />
                <Column body={(rowData) => (
                    <div className='flex items-center'>
                        <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" onClick={() => viewMICE(rowData)} />
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editMICE(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteMICE(rowData)} />
                    </div>
                )} />
            </DataTable>

            {/* View Dialog */}
            <Dialog header="MICE Details" visible={viewDialogVisible} style={{ width: '50vw' }} onHide={hideDialog}>
                <div className="grid grid-cols-1 gap-4">
                    <div className="col-span-1">
                        <img
                            src={formValues.coverPhoto ? `https://adbackend.tourglobalhub.com/uploads/${formValues.coverPhoto}` : ''}
                            alt={formValues.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="col-span-1">
                        <h2 className="text-2xl font-bold">{formValues.title}</h2>
                        <p>{formValues.description}</p>
                        <p><strong>Country:</strong> {formValues.country}</p>
                        <p><strong>Category:</strong> {formValues.category}</p>
                        <p><strong>Destination:</strong> {formValues.destination}</p>
                        <p><strong>Map URL:</strong> <a href={formValues.mapUrl} target="_blank" rel="noopener noreferrer">{formValues.mapUrl}</a></p>
                        <p><strong>Package Content:</strong> {formValues.packageContent}</p>
                    </div>
                </div>
            </Dialog>

            {/* Create/Edit Dialog */}
            <Dialog header={formValues.id ? "Edit MICE" : "Create MICE"} visible={isDialogVisible} style={{ width: '50vw' }} onHide={hideDialog}>
                <div className="grid grid-cols-1 gap-4">
                    <div className="col-span-1">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formValues.title}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formValues.description}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        ></textarea>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="country">Country</label>
                        <select
                            id="country"
                            name="country"
                            value={formValues.country}
                            onChange={onDropdownChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.countryId} value={country.countryName}>{country.countryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formValues.category}
                            onChange={onDropdownChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.catName}>{category.catName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="destination">Destination</label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={formValues.destination}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="mapUrl">Map URL</label>
                        <input
                            type="text"
                            id="mapUrl"
                            name="mapUrl"
                            value={formValues.mapUrl}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="packageContent">Package Content</label>
                        <textarea
                            id="packageContent"
                            name="packageContent"
                            value={formValues.packageContent}
                            onChange={onInputChange}
                            className="p-inputtext p-component w-full border border-blueSecondary"
                        ></textarea>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="coverPhoto">Cover Photo</label>
                        <input
                            type="file"
                            id="coverPhoto"
                            name="coverPhoto"
                            onChange={onFileChange}
                            className="p-inputtext p-component w-full"
                        />
                        {previewImage && <img src={previewImage} alt="Preview" className="mt-2" />}
                    </div>
                </div>
                <div className="mt-4">
                    <button 
                        onClick={saveMICE} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    >
                        {formValues.id ? "Update MICE" : "Create MICE"}
                    </button>
                </div>
            </Dialog>
        </div>
    );
};

export default MICEPage;
