import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'tailwindcss/tailwind.css';
import { AiOutlineFileImage } from 'react-icons/ai'; // Import React Icons for image upload

const AddNewBlog = ({ onBackClick }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [additionalPhotos, setAdditionalPhotos] = useState([]);
    const [previewCoverPhoto, setPreviewCoverPhoto] = useState('');
    const [previewAdditionalPhotos, setPreviewAdditionalPhotos] = useState([]);
    const [status, setStatus] = useState('draft');

    const handleCoverPhotoChange = (e) => {
        const file = e.target.files[0];
        setCoverPhoto(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewCoverPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdditionalPhotosChange = (e) => {
        const files = Array.from(e.target.files);
        setAdditionalPhotos(files);
        const previews = files.map(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewAdditionalPhotos(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
            return URL.createObjectURL(file);
        });
        setPreviewAdditionalPhotos(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('category', category);
        formData.append('content', content);
        formData.append('coverPhoto', coverPhoto);
        formData.append('status', status);
        additionalPhotos.forEach((photo) => {
            formData.append('additionalPhotos', photo);
        });

        try {
            const res = await axios.post('/api/blogs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(res.data.message);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-1">Cover Photo</label>
                    <div className="flex flex-col items-center border-2 border-gray-300 border-dashed rounded-md p-4">
                        <div className="flex flex-col items-center text-gray-600">
                            <AiOutlineFileImage className="h-12 w-12 text-gray-400" />
                            <div className="text-sm text-gray-600">
                                <label
                                    htmlFor="cover-photo-upload"
                                    className="cursor-pointer bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id="cover-photo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverPhotoChange}
                                        className="sr-only"
                                    />
                                </label>
                                <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        {previewCoverPhoto && (
                            <img
                                src={previewCoverPhoto}
                                alt="Preview"
                                className="mt-4 w-full h-auto max-w-xs rounded-md border border-gray-300"
                            />
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-1">Additional Photos</label>
                    <div className="flex flex-col items-center border-2 border-gray-300 border-dashed rounded-md p-4">
                        <div className="flex flex-col items-center text-gray-600">
                            <AiOutlineFileImage className="h-12 w-12 text-gray-400" />
                            <div className="text-sm text-gray-600">
                                <label
                                    htmlFor="additional-photos-upload"
                                    className="cursor-pointer bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                                >
                                    <span>Upload files</span>
                                    <input
                                        id="additional-photos-upload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleAdditionalPhotosChange}
                                        className="sr-only"
                                    />
                                </label>
                                <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                            </div>
                        </div>
                        {previewAdditionalPhotos.length > 0 && (
                            <div className="flex flex-wrap gap-4 mt-4">
                                {previewAdditionalPhotos.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Preview ${index}`}
                                        className="w-24 h-24 object-cover rounded-md border border-gray-300"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Save Blog Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewBlog;
