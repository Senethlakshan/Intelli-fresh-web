import React, { useState } from 'react';
import Mice from '../mice/Mice';
import ThingsToDoPage from '../tings-todo/TingsTODO';
import Transfers from '../transfers/Transfers';
import OnedaytourDetails from '../oneday-tour/OnedaytourDetails';
import MultiDayDetails from '../multiday-tour/MultiDayTour';

const TourTab = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const renderContent = () => {
        switch (activeTab) {
            case 'tab1':
                return <Mice />;
            case 'tab2':
                return <ThingsToDoPage />;
            case 'tab3':
                return <Transfers />;
            case 'tab4':
                return <OnedaytourDetails />; 
            case 'tab5':
                return <MultiDayDetails />;         
            default:
                return null;
        }
    };

    return (
        <div className="tabs">
            <div className="flex">
                <ul className="flex bg-blue-900 mt-3 rounded-2xl transition-all duration-300 p-2 overflow-hidden">
                    <li>
                        <button
                            onClick={() => setActiveTab('tab1')}
                            className={`inline-block py-3 px-6 text-gray-500  font-medium ${
                                activeTab === 'tab1'
                                    ? 'bg-white rounded-xl text-indigo-600'
                                    : ''
                            }`}
                        >
                            MICE  Details
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('tab2')}
                            className={`inline-block py-3 px-6 text-gray-500  font-medium ${
                                activeTab === 'tab2'
                                    ? 'bg-white rounded-xl text-indigo-600'
                                    : ''
                            }`}
                        >
                            Things Todo Details
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('tab3')}
                            className={`inline-block py-3 px-6 text-gray-500  font-medium ${
                                activeTab === 'tab3'
                                    ? 'bg-white rounded-xl text-indigo-600'
                                    : ''
                            }`}
                        >
                            Transfers Details
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('tab4')}
                            className={`inline-block py-3 px-6 text-gray-500  font-medium ${
                                activeTab === 'tab4'
                                    ? 'bg-white rounded-xl text-indigo-600'
                                    : ''
                            }`}
                        >
                            Oneday Tour Details
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('tab5')}
                            className={`inline-block py-3 px-6 text-gray-500  font-medium ${
                                activeTab === 'tab5'
                                    ? 'bg-white rounded-xl text-indigo-600'
                                    : ''
                            }`}
                        >
                            Multiday Tour Details
                        </button>
                    </li>
                </ul>
            </div>
            <div className="mt-3">{renderContent()}</div>
        </div>
    );
};

export default TourTab;
