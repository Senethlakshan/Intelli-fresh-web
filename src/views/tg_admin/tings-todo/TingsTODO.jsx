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

const ThingsToDoPage = () => {
    const [thingsToDo, setThingsToDo] = useState([]);
    const [selectedThing, setSelectedThing] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [viewDialogVisible, setViewDialogVisible] = useState(false);
    const [formValues, setFormValues] = useState({
        id: '',
        title: '',
        description: '',
        coverPhoto: '',
        price: '',
        currency: '',
        country: '',
        category: '',
        destination: '',
        mapUrl: '',
        packageContent: ''
    });
    const [file, setFile] = useState(null);
    const [countries, setCountries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchThingsToDo();
        fetchCountries();
        fetchCategories();
    }, []);

    const fetchThingsToDo = async () => {
        try {
            const response = await axios.get('https://adbackend.tourglobalhub.com/api/thingsToDo');
            setThingsToDo(response.data);
        } catch (error) {
            console.error('Error fetching Things To Do:', error);
            toast.error('Failed to fetch Things To Do');
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
            price: '',
            currency: '',
            country: '',
            category: '',
            destination: '',
            mapUrl: '',
            packageContent: ''
        });
        setFile(null);
        setIsDialogVisible(true);
    };

    const hideDialog = () => {
        setIsDialogVisible(false);
        setViewDialogVisible(false);
    };

    const saveThingToDo = async () => {
        const formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
        formData.append('prices', JSON.stringify({ price: formValues.price, currency: formValues.currency }));
        formData.append('country', formValues.country);
        formData.append('category', formValues.category);
        formData.append('destination', formValues.destination);
        formData.append('mapUrl', formValues.mapUrl);
        formData.append('packageContent', formValues.packageContent);
        if (file) {
            formData.append('coverPhoto', file);
        }

        try {
            if (formValues.id) {
                // Update existing entry
                await axios.put(`https://adbackend.tourglobalhub.com/api/thingsToDo/${formValues.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Thing To Do Updated');
            } else {
                // Create new entry
                await axios.post('https://adbackend.tourglobalhub.com/api/thingsToDo', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Thing To Do Created');
            }
            fetchThingsToDo();
            setIsDialogVisible(false);
        } catch (error) {
            console.error('Error saving thing to do:', error.response ? error.response.data : error.message);
            toast.error('Failed to Save Thing To Do');
        }
    };

    const editThingToDo = (rowData) => {
        setFormValues({
            id: rowData.id,
            title: rowData.title,
            description: rowData.description,
            coverPhoto: rowData.coverPhoto,
            price: JSON.parse(rowData.prices).price,
            currency: JSON.parse(rowData.prices).currency,
            country: rowData.country,
            category: rowData.category,
            destination: rowData.destination,
            mapUrl: rowData.mapUrl,
            packageContent: rowData.packageContent
        });
        setFile(null);
        setIsDialogVisible(true);
    };

    const deleteThingToDo = async (rowData) => {
        try {
            await axios.delete(`https://adbackend.tourglobalhub.com/api/thingsToDo/${rowData.id}`);
            fetchThingsToDo();
            toast.success('Thing To Do Deleted');
        } catch (error) {
            console.error('Error deleting thing to do:', error.response ? error.response.data : error.message);
            toast.error('Failed to Delete Thing To Do');
        }
    };

    const viewThingToDo = (rowData) => {
        setFormValues({
            id: rowData.id,
            title: rowData.title,
            description: rowData.description,
            coverPhoto: rowData.coverPhoto,
            price: JSON.parse(rowData.prices).price,
            currency: JSON.parse(rowData.prices).currency,
            country: rowData.country,
            category: rowData.category,
            destination: rowData.destination,
            mapUrl: rowData.mapUrl,
            packageContent: rowData.packageContent
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
                        <span>New Thing To Do</span>
                    </button>
                    <button 
                        className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 flex items-center space-x-2" 
                        onClick={fetchThingsToDo}
                    >
                        <i className="pi pi-refresh"></i>
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            <DataTable value={thingsToDo} paginator rows={10} className="p-datatable-gridlines">
                <Column field="title" header="Title" sortable />
                <Column header="Cover Photo" body={coverPhotoBody} />
                <Column field="prices" header="Price" body={(rowData) => `${JSON.parse(rowData.prices).price} ${JSON.parse(rowData.prices).currency}`} />
                <Column field="country" header="Country" sortable />
                <Column field="category" header="Category" sortable />
                <Column field="createdAt" header="Created At" body={(rowData) => formatDate(rowData.createdAt)} sortable />
                <Column body={(rowData) => (
                    <div className='flex items-center'>
                        <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" onClick={() => viewThingToDo(rowData)} />
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editThingToDo(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteThingToDo(rowData)} />
                    </div>
                )} />
            </DataTable>

            <Dialog header="Thing To Do Details" visible={isDialogVisible} onHide={hideDialog} style={{ width: '50vw' }}>
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" value={formValues.title} onChange={onInputChange} className="p-inputtext p-component w-full border border-blueSecondary" />
                    </div>
                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={formValues.description} onChange={onInputChange} className="p-inputtext p-component w-full border border-blueSecondary " rows={5} />
                    </div>
                    <div className="field">
                        <label htmlFor="coverPhoto">Cover Photo</label>
                        <input id="coverPhoto" type="file" onChange={onFileChange} className="p-inputtext p-component w-full" />
                        {previewImage && <img src={previewImage} alt="Preview" className="w-16 h-16 object-cover mt-2" />}
                    </div>
                    <div className="field">
                        <label htmlFor="price">Price</label>
                        <input id="price" name="price" value={formValues.price} onChange={onInputChange} className="p-inputtext p-component w-full border border-blueSecondary" />
                    </div>
                    <div className="field">
                        <label htmlFor="currency">Currency</label>
                        <input id="currency" name="currency" value={formValues.currency} onChange={onInputChange} className="p-inputtext p-component w-full border border-blueSecondary" />
                    </div>
                    <div className="field">
                        <label htmlFor="country">Country</label>
                        <select id="country" name="country" value={formValues.country} onChange={onDropdownChange} className="p-inputtext p-component w-full border border-blueSecondary ">
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.countryId} value={country.countryName}>{country.countryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={formValues.category} onChange={onDropdownChange} className="p-inputtext p-component w-full border border-blueSecondary">
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.catName}>{category.catName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="destination">Destination</label>
                        <input id="destination" name="destination" value={formValues.destination} onChange={onInputChange} className="p-inputtext p-component w-full border border-blueSecondary" />
                    </div>
                    <div className="field">
                        <label htmlFor="mapUrl">Map URL</label>
                        <input id="mapUrl" name="mapUrl" value={formValues.mapUrl} onChange={onInputChange} className="p-inputtext p-component w-full border border-blueSecondary" />
                    </div>
                    <div className="field">
                        <label htmlFor="packageContent">Package Content</label>
                        <textarea id="packageContent" name="packageContent" value={formValues.packageContent} onChange={onInputChange} className="p-inputtext p-component w-full border border-blueSecondary" rows={5} />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Button label="Save" icon="pi pi-check" className="p-button-success mr-2 bg-green-600 p-2 text-white " onClick={saveThingToDo} />
                    <Button label="Cancel" icon="pi pi-times" className="p-button-danger bg-red-600 p-2 text-white" onClick={hideDialog} />
                </div>
            </Dialog>

            <Dialog header="Thing To Do Details" visible={viewDialogVisible} onHide={hideDialog} style={{ width: '50vw' }}>
                <div className="p-fluid">
                    <div className="field">
                        <label>Title</label>
                        <p>{formValues.title}</p>
                    </div>
                    <div className="field">
                        <label>Description</label>
                        <p>{formValues.description}</p>
                    </div>
                    <div className="field">
                        <label>Cover Photo</label>
                        {formValues.coverPhoto && <img src={`https://adbackend.tourglobalhub.com/uploads/${formValues.coverPhoto}`} alt="Cover" className="w-16 h-16 object-cover" />}
                    </div>
                    <div className="field">
                        <label>Price</label>
                        <p>{formValues.price} {formValues.currency}</p>
                    </div>
                    <div className="field">
                        <label>Country</label>
                        <p>{formValues.country}</p>
                    </div>
                    <div className="field">
                        <label>Category</label>
                        <p>{formValues.category}</p>
                    </div>
                    <div className="field">
                        <label>Destination</label>
                        <p>{formValues.destination}</p>
                    </div>
                    <div className="field">
                        <label>Map URL</label>
                        <p>{formValues.mapUrl}</p>
                    </div>
                    <div className="field">
                        <label>Package Content</label>
                        <p>{formValues.packageContent}</p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ThingsToDoPage;
