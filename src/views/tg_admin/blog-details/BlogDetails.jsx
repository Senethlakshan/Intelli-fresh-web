import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import AddNewBlog from './AddNewBlog';

const BlogDetails = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5); // Number of blogs per page

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`https://adbackend.tourglobalhub.com/api/blogs?page=${currentPage}&limit=${blogsPerPage}`);
      setBlogs(response.data);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlogClick = () => {
    setSelectedBlog(null); // Reset selected blog for adding new
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://adbackend.tourglobalhub.com/api/blogs/${id}`);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  const viewBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id);
    setSelectedBlog(blog);
    setShowDetails(true);
  };

  const updateBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id);
    setSelectedBlog(blog);
    setShowDetails(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (showDetails) {
    return <AddNewBlog onBackClick={handleBackClick} blog={selectedBlog} />;
  }

  return (
    <div className="mt-3">
      <button
        className="flex items-center justify-center bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-900"
        onClick={handleAddBlogClick}
      >
        Add Blog
        <MdAddCircleOutline className='ml-2' />
      </button>

      {/* Content */}
      <div className='mt-3 bg-gray-200 min-h-screen rounded-lg p-2'>
        <h1 className="text-xl font-bold mb-4">Blog Post Details</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Cover Photo</th>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Author</th>
                  <th className="py-2 px-4 text-left">Publish Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id} className="border-b">
                    <td className="py-2 px-4">
                      {blog.coverPhoto && (
                        <img
                          src={`https://adbackend.tourglobalhub.com/uploads/${blog.coverPhoto}`}
                          alt={blog.title}
                          className="w-20 h-20 object-cover"
                        />
                      )}
                    </td>
                    <td className="py-2 px-4">{blog.title}</td>
                    <td className="py-2 px-4">{blog.author}</td>
                    <td className="py-2 px-4">{new Date(blog.publishDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{blog.status}</td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => viewBlog(blog.id)}
                      >
                        View
                      </button>
                      <button
                        className="text-blue-600 hover:underline ml-4"
                        onClick={() => updateBlog(blog.id)}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-600 hover:underline ml-4"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
