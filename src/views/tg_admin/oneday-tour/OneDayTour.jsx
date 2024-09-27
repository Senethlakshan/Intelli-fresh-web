import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import AllUser from './AllOneday';  // Ensure the correct path
import OnlyUsers from './OnedaytourDetails';  // Ensure the correct path


const UserDetails = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Inline styles for tabs
    const tabHeaderStyle = (index) => ({
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: index === activeIndex ? '#2563eb' : '#f3f4f6', // Tailwind blue-600 or gray-100
        color: index === activeIndex ? '#ffffff' : '#000000', // Tailwind white or black
        borderRadius: '4px',
        marginRight: '2px',
        borderBottom: index === activeIndex ? '2px solid #2563eb' : 'none', // Tailwind blue-600
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            <div className="tab-container mb-4">
                <div className="flex border-b">
                    <div
                        style={tabHeaderStyle(0)}
                        onClick={() => setActiveIndex(0)}
                        className="tab-header p-2"
                    >
                        All Users
                    </div>
                    <div
                        style={tabHeaderStyle(1)}
                        onClick={() => setActiveIndex(1)}
                        className="tab-header p-2"
                    >
                        Users
                    </div>
                  
                </div>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="mt-4">
                    <TabPanel>
                        <AllUser />
                    </TabPanel>
                    <TabPanel>
                        <OnlyUsers />
                    </TabPanel>
                    
                </TabView>
            </div>
        </div>
    );
}

export default UserDetails;
