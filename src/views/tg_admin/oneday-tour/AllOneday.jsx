

  import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllOneday = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/oneDayTourPackages')
            .then(response => setPackages(response.data))
            .catch(error => console.error('Error fetching packages:', error));
    }, []);

    const deletePackage = (id) => {
        axios.delete(`http://localhost:5000/api/oneDayTourPackages/${id}`)
            .then(() => {
                setPackages(packages.filter(pkg => pkg.id !== id));
            })
            .catch(error => console.error('Error deleting package:', error));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">One-Day Tour Packages</h1>
            <Link to="/onedaytour/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Create New Package</Link>
            <DataTable value={packages} responsiveLayout="scroll">
                <Column field="title" header="Title" sortable></Column>
                <Column field="description" header="Description" sortable></Column>
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <div className="flex space-x-2">
                            <Link to={`/onedaytour/update/${rowData.id}`} className="text-blue-500">Edit</Link>
                            <button onClick={() => deletePackage(rowData.id)} className="text-red-500">Delete</button>
                        </div>
                    )}
                ></Column>
            </DataTable>
        </div>
    );
};

export default AllOneday;
