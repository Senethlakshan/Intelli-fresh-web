import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ id: '', username: '', email: '', password: '', role: 'user' });
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        // Fetch users from API
        axios.get('https://adbackend.tourglobalhub.com/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const openNew = () => {
        setFormData({ id: '', username: '', email: '', password: '', role: 'user' });
        setIsEditMode(false);
        setIsDialogVisible(true);
    };

    const openEdit = (user) => {
        setFormData(user);
        setIsEditMode(true);
        setIsDialogVisible(true);
    };

    const hideDialog = () => {
        setIsDialogVisible(false);
    };

    const saveUser = () => {
        if (isEditMode) {
            // Update user via API
            axios.put(`https://adbackend.tourglobalhub.com/api/users/${formData.id}`, formData)
                .then(response => {
                    setUsers(users.map(user => (user.id === formData.id ? response.data.user : user)));
                    hideDialog();
                })
                .catch(error => console.error('Error updating user:', error));
        } else {
            // Create a new user via API
            axios.post('https://adbackend.tourglobalhub.com/api/register', formData)
                .then(response => {
                    setUsers([...users, response.data.user]);
                    hideDialog();
                })
                .catch(error => console.error('Error creating user:', error));
        }
    };

    const deleteUser = (id) => {
        // Delete user via API
        axios.delete(`https://adbackend.tourglobalhub.com/api/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    // Role options
    const roleOptions = [
        { label: 'Admin', value: 'admin' },
        { label: 'Content Manager', value: 'content manager' },
        { label: 'User', value: 'user' }
    ];

    return (
        <div className="p-6">
            <div className="flex justify-end mb-4">
                <Button label="New User" icon="pi pi-plus" className="bg-yellow-600 text-white px-4 py-2 rounded-lg" onClick={openNew} />
            </div>

            <DataTable value={users} paginator rows={10} className="p-datatable-gridlines">
                <Column field="username" header="Username" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="role" header="Role" sortable></Column>
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <div className="flex space-x-2">
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => openEdit(rowData)} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteUser(rowData.id)} />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog visible={isDialogVisible} style={{ width: '450px' }} header={isEditMode ? "Edit User" : "New User"} modal className="p-fluid" onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="username" className="font-bold">Username</label>
                    <InputText id="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required autoFocus className="p-inputtext-sm w-full" />
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">Email</label>
                    <InputText id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="p-inputtext-sm w-full" />
                </div>
                <div className="field">
                    <label htmlFor="password" className="font-bold">Password</label>
                    <InputText id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="p-inputtext-sm w-full" />
                </div>
                <div className="field">
                    <label htmlFor="role" className="font-bold">Role</label>
                    <Dropdown 
                        id="role" 
                        value={formData.role} 
                        options={roleOptions} 
                        onChange={(e) => setFormData({ ...formData, role: e.value })} 
                        required 
                        className="w-full" 
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                    <Button label={isEditMode ? "Update" : "Save"} icon="pi pi-check" className="p-button-success" onClick={saveUser} />
                </div>
            </Dialog>
        </div>
    );
}

export default AllUser;
