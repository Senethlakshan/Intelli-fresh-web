import React, { useState } from 'react';
import CountryCRUD from './CountryCRUD';
import SeasonCRUD from './SeasonCRUD';
import DiscountCRUD from './DiscountCRUD';
import CategoryInfo from './CategoryInfo';

const TabsExample = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const renderContent = () => {
        switch (activeTab) {
            case 'tab1':
                return <CountryCRUD />;
            case 'tab2':
                return <SeasonCRUD />;
            case 'tab3':
                return <DiscountCRUD />;
            case 'tab4':
                return <CategoryInfo />;    
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
                            Country Details
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
                            Season Details
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
                            Discount Details
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
                            Category Details
                        </button>
                    </li>
                </ul>
            </div>
            <div className="mt-3">{renderContent()}</div>
        </div>
    );
};

export default TabsExample;
