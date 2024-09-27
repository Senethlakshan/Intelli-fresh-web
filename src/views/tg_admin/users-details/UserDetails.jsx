import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import AllUser from './AllUsers';
import OnlyUsers from './OnlyUsers';
import UserBooking from './UserBooking';

const UserDetails = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Inline styles for tabs
    const tabHeaderStyle = (index) => ({
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: index === activeIndex ? 'blue' : 'gray',
        color: index === activeIndex ? 'white' : 'white',
        borderRadius: '4px',
        marginRight: '2px'
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            <div className="tab-container mb-4">
                <div className="flex border-b">
                    <div
                        style={tabHeaderStyle(0)}
                        onClick={() => setActiveIndex(0)}
                        className="tab-header"
                    >
                        All Users
                    </div>
                    <div
                        style={tabHeaderStyle(1)}
                        onClick={() => setActiveIndex(1)}
                        className="tab-header"
                    >
                        Users
                    </div>
                    <div
                        style={tabHeaderStyle(2)}
                        onClick={() => setActiveIndex(2)}
                        className="tab-header"
                    >
                        User Booking
                    </div>
                </div>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel>
                        <AllUser />
                    </TabPanel>
                    <TabPanel>
                        <OnlyUsers />
                    </TabPanel>
                    <TabPanel>
                        <UserBooking />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}

export default UserDetails;
