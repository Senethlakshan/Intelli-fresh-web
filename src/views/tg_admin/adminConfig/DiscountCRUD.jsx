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

const API_URL = 'https://adbackend.tourglobalhub.com/api/discountInfos'; 
//http://localhost:5000

const DiscountCRUD = () => {
    const [discounts, setDiscounts] = useState([]);
    const [formData, setFormData] = useState({
        rate: '',
        description: '',
        minimumPurchaseAmount: '',
        validFrom: '',
        validTo: '',
        excludedCategories: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [pagination, setPagination] = useState({ first: 0, rows: 10 });

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const fetchDiscounts = async () => {
        try {
            const response = await axios.get(API_URL);
            setDiscounts(response.data);
        } catch (error) {
            toast.error("Error fetching discounts!");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleExcludedCategoriesChange = (e) => {
        setFormData({
            ...formData,
            excludedCategories: e.target.value.split(',').map(cat => cat.trim())
        });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${API_URL}/${selectedId}`, formData);
                toast.success('Discount updated successfully!');
            } else {
                await axios.post(API_URL, formData);
                toast.success('Discount added successfully!');
            }
            fetchDiscounts();
            resetForm();
            setDisplayDialog(false);
        } catch (error) {
            toast.error("Error saving discount!");
        }
    };

    const handleEdit = (discount) => {
        setIsEditing(true);
        setSelectedId(discount.id);
        setFormData({
            rate: discount.rate,
            description: discount.description,
            minimumPurchaseAmount: discount.minimumPurchaseAmount,
            validFrom: formatDate(discount.validFrom),
            validTo: formatDate(discount.validTo),
            excludedCategories: discount.excludedCategories || []
        });
        setDisplayDialog(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            toast.success('Discount deleted successfully!');
            fetchDiscounts();
        } catch (error) {
            toast.error("Error deleting discount!");
        }
    };

    const resetForm = () => {
        setFormData({
            rate: '',
            description: '' || null,
            minimumPurchaseAmount: '' || null,
            validFrom: '',
            validTo: '',
            excludedCategories: [] || null
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

    const categoryBodyTemplate = (rowData) => {
        const categories = Array.isArray(rowData.excludedCategories) ? rowData.excludedCategories : [];
        return categories.join(', ');
    };

    const dateBodyTemplate = (rowData, field) => {
        return formatDate(rowData[field]);
    };

    // Utility function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="bg-gray-300 min-h-screen p-3 rounded-md">
            <ToastContainer />
            <h1 className="text-black text-2xl font-bold mb-4">Discount Management</h1>
            <div className="mb-4 flex justify-between items-center">
                <Button
                    label="Add Discount"
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
                    onClick={fetchDiscounts}
                />
            </div>
            <DataTable
                value={discounts}
                paginator
                rows={pagination.rows}
                first={pagination.first}
                onPage={onPage}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                rowsPerPageOptions={[10, 20, 30]}
                className="p-datatable-customers"
            >
                <Column field="rate" header="Rate (%)"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="minimumPurchaseAmount" header="Min. Purchase Amount"></Column>
                <Column field="validFrom" header="Valid From" body={(rowData) => dateBodyTemplate(rowData, 'validFrom')}></Column>
                <Column field="validTo" header="Valid To" body={(rowData) => dateBodyTemplate(rowData, 'validTo')}></Column>
                <Column field="excludedCategories" header="Excluded Categories" body={categoryBodyTemplate}></Column>
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
                header={isEditing ? 'Edit Discount' : 'Add Discount'}
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
                            Rate (%)
                        </label>
                        <input
                            type="number"
                            name="rate"
                            value={formData.rate}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minimumPurchaseAmount">
                            Minimum Purchase Amount
                        </label>
                        <input
                            type="number"
                            name="minimumPurchaseAmount"
                            value={formData.minimumPurchaseAmount}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="validFrom">
                            Valid From
                        </label>
                        <input
                            type="date"
                            name="validFrom"
                            value={formData.validFrom}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="validTo">
                            Valid To
                        </label>
                        <input
                            type="date"
                            name="validTo"
                            value={formData.validTo}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="excludedCategories">
                            Excluded Categories (comma separated)
                        </label>
                        <input
                            type="text"
                            name="excludedCategories"
                            value={formData.excludedCategories.join(', ')}
                            onChange={handleExcludedCategoriesChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default DiscountCRUD;
