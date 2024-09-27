import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core Styles
import 'primeicons/primeicons.css'; // Icons

const API_URL = 'https://adbackend.tourglobalhub.com/api/seasons';

// Helper function to format date
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const SeasonCRUD = () => {
    const [seasons, setSeasons] = useState([]);
    const [formData, setFormData] = useState({
        seasonName: '',
        startDate: '',
        endDate: '',
        rates: null // Initialize as null
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [pagination, setPagination] = useState({ first: 0, rows: 10 });

    useEffect(() => {
        fetchSeasons();
    }, []);

    const fetchSeasons = async () => {
        try {
            const response = await axios.get(API_URL);
            setSeasons(response.data);
        } catch (error) {
            toast.error('Error fetching seasons!');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value || null // Handle empty strings as null
        });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${API_URL}/${selectedId}`, formData);
                toast.success('Season updated successfully!');
            } else {
                await axios.post(API_URL, formData);
                toast.success('Season added successfully!');
            }
            fetchSeasons();
            resetForm();
            setDisplayDialog(false);
        } catch (error) {
            toast.error('Error saving season!');
        }
    };

    const handleEdit = (season) => {
        setIsEditing(true);
        setSelectedId(season.id);
        setFormData({
            seasonName: season.seasonName,
            startDate: season.startDate,
            endDate: season.endDate,
            rates: season.rates // Ensure rates can be null
        });
        setDisplayDialog(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            toast.success('Season deleted successfully!');
            fetchSeasons();
        } catch (error) {
            toast.error('Error deleting season!');
        }
    };

    const resetForm = () => {
        setFormData({
            seasonName: '',
            startDate: '',
            endDate: '',
            rates: null // Reset to null
        });
        setIsEditing(false);
        setSelectedId(null);
    };

    const onPage = (event) => {
        setPagination({
            first: event.first,
            rows: event.rows
        });
    };

    return (
        <div className="bg-gray-300 min-h-screen p-3 rounded-md">
            <ToastContainer />
            <h1 className="text-black text-2xl font-bold mb-4">Season Management</h1>
            <div className="mb-4 flex justify-between items-center">
                <Button
                    label="Add Season"
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
                    onClick={fetchSeasons}
                />
            </div>
            <DataTable
                value={seasons}
                paginator
                rows={pagination.rows}
                first={pagination.first}
                onPage={onPage}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                rowsPerPageOptions={[10, 20, 30]}
                className="p-datatable-customers"
            >
                <Column field="seasonName" header="Season Name"></Column>
                <Column field="startDate" header="Start Date" body={(rowData) => formatDate(rowData.startDate)}></Column>
                <Column field="endDate" header="End Date" body={(rowData) => formatDate(rowData.endDate)}></Column>
                <Column field="rates" header="Rates"></Column>
                <Column body={(rowData) => (
                    <div className="flex space-x-2">
                        <Button
                            icon="pi pi-pencil"
                            className="p-button-warning"
                            onClick={() => handleEdit(rowData)}
                        />
                        <Button
                            icon="pi pi-trash"
                            className="p-button-danger"
                            onClick={() => handleDelete(rowData.id)}
                        />
                    </div>
                )}></Column>
            </DataTable>

            <Dialog
                header={isEditing ? 'Edit Season' : 'Add Season'}
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seasonName">
                            Season Name
                        </label>
                        <input
                            type="text"
                            name="seasonName"
                            value={formData.seasonName}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                            Start Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                            End Date
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rates">
                            Rates
                        </label>
                        <input
                            type="number"
                            name="rates"
                            value={formData.rates === null ? '' : formData.rates}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default SeasonCRUD;
