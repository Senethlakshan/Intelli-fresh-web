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

const API_URL = 'https://adbackend.tourglobalhub.com/api/categoryInfos';

const CategoryInfo = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        catName: '',
        description: ''
    });
    const [selectedId, setSelectedId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [pagination, setPagination] = useState({ first: 0, rows: 10 });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(API_URL);
            setCategories(response.data);
        } catch (error) {
            toast.error('Error fetching categories!');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await axios.put(`${API_URL}/${selectedId}`, formData);
                toast.success('Category updated successfully!');
            } else {
                await axios.post(API_URL, formData);
                toast.success('Category added successfully!');
            }
            fetchCategories();
            resetForm();
            setDisplayDialog(false);
        } catch (error) {
            toast.error('Error saving category!');
        }
    };

    const handleEdit = (category) => {
        setIsEditing(true);
        setSelectedId(category.id);
        setFormData({
            catName: category.catName,
            description: category.description
        });
        setDisplayDialog(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            toast.success('Category deleted successfully!');
            fetchCategories();
        } catch (error) {
            toast.error('Error deleting category!');
        }
    };

    const resetForm = () => {
        setFormData({
            catName: '',
            description: ''
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
            <h1 className="text-black text-2xl font-bold mb-4">Category Management</h1>
            <div className="mb-4 flex justify-between items-center">
                <Button
                    label="Add Category"
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
                    onClick={fetchCategories}
                />
            </div>
            <DataTable
                value={categories}
                paginator
                rows={pagination.rows}
                first={pagination.first}
                onPage={onPage}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                rowsPerPageOptions={[10, 20, 30]}
                className="p-datatable-customers"
            >
                <Column field="catName" header="Category Name"></Column>
                <Column field="description" header="Description"></Column>
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
                header={isEditing ? 'Edit Category' : 'Add Category'}
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catName">
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="catName"
                            value={formData.catName}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default CategoryInfo;
