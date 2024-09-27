import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewBlog = ({ onBackClick, blog }) => {
  const [title, setTitle] = useState(blog?.title || '');
  const [author, setAuthor] = useState(blog?.author || '');
  const [publishDate, setPublishDate] = useState(blog?.publishDate || '');
  const [status, setStatus] = useState(blog?.status || 'draft');
  const [content, setContent] = useState(blog?.content || '');
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishDate', publishDate);
    formData.append('status', status);
    formData.append('content', content);
    if (coverPhoto) formData.append('coverPhoto', coverPhoto);

    try {
      if (blog) {
        // Update existing blog
        await axios.put(`https://adbackend.tourglobalhub.com/api/blogs/${blog.id}`, formData);
        toast.success('Blog updated successfully');
      } else {
        // Add new blog
        await axios.post('https://adbackend.tourglobalhub.com/api/blogs', formData);
        toast.success('Blog added successfully');
      }
      onBackClick();
    } catch (error) {
      toast.error(blog ? 'Failed to update blog' : 'Failed to add blog');
    }
  };

  return (
    <div className="mt-3">
      <button
        className="flex items-center justify-center bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-800"
        onClick={onBackClick}
      >
        <MdArrowBack />
        Back to Blog Details
      </button>

      {/* Content */}
      <div className='mt-3 bg-gray-600 min-h-screen rounded-lg p-2'>
        <h1 className="text-xl font-bold mb-4">{blog ? 'Update Blog' : 'Add New Blog'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-white">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-white">Publish Date</label>
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-white">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label className="block text-white">Cover Photo</label>
            <input
              type="file"
              onChange={(e) => setCoverPhoto(e.target.files[0])}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div>
            <label className="block text-white">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="mt-1"
              theme="snow"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            {blog ? 'Update Blog' : 'Add Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewBlog;


