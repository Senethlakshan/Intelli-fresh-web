

import React from 'react';
import { MdArrowBack } from "react-icons/md";

const BlogList = ({ onBackClick }) => {
  return (
    <div className="mt-3">


      <button 
        className="flex items-center justify-center bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-800 dark:bg-yellow-600 dark:text-white"
        onClick={onBackClick}
      >
        <MdArrowBack />
        Back to Tours
      </button>

      {/* content  */}
      <div className='mt-3 bg-gray-600 min-h-screen rounded-lg p-2'>
      
      </div>
    </div>
  );
};

export default AddNewBlog;


