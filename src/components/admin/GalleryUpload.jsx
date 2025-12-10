import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Trash2, Loader, X } from 'lucide-react';
import { galleryAPI } from '../../utils/api';

const GalleryUpload = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [showUploadForm, setShowUploadForm] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'wedding',
        image: null,
    });

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            setLoading(true);
            const response = await galleryAPI.getAll();
            setImages(response.data);
        } catch (err) {
            setError('Failed to load gallery');
            console.error('Fetch gallery error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            console.log('Selected file:', file); // Debug log
            setFormData({ ...formData, image: file });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.image) {
            alert('Please select an image');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const uploadData = new FormData();
            uploadData.append('title', formData.title);
            uploadData.append('description', formData.description);
            uploadData.append('category', formData.category);
            uploadData.append('image', formData.image);

            // Debug: Log FormData contents
            console.log('Uploading:');
            console.log('- Title:', formData.title);
            console.log('- Description:', formData.description);
            console.log('- Category:', formData.category);
            console.log('- Image:', formData.image);

            const response = await galleryAPI.upload(uploadData);
            console.log('Upload response:', response);

            // Reset form
            setFormData({
                title: '',
                description: '',
                category: 'wedding',
                image: null,
            });
            setShowUploadForm(false);
            fetchGallery();
            
            // Reset file input
            const fileInput = document.getElementById('image-upload');
            if (fileInput) {
                fileInput.value = '';
            }

            alert('Image uploaded successfully!');
        } catch (err) {
            console.error('Upload error:', err);
            console.error('Error response:', err.response?.data);
            setError(err.response?.data?.message || err.message || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const deleteImage = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await galleryAPI.delete(id);
                fetchGallery();
                alert('Image deleted successfully!');
            } catch (err) {
                console.error('Delete error:', err);
                alert('Failed to delete image');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Gallery Management ({images.length})</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="bg-gradient-to-r from-primary-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
                >
                    {showUploadForm ? (
                        <>
                            <X className="w-5 h-5" />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Upload className="w-5 h-5" />
                            Upload Image
                        </>
                    )}
                </motion.button>
            </div>

            {/* Upload Form */}
            {showUploadForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 shadow-lg mb-8"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload New Image</h3>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            <p className="font-semibold">Error:</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Image File *
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                            />
                            {formData.image && (
                                <p className="text-sm text-green-600 mt-2">
                                    ✓ Selected: {formData.image.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                placeholder="Enter image title"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                            >
                                <option value="wedding">Wedding</option>
                                <option value="birthday">Birthday</option>
                                <option value="corporate">Corporate</option>
                                <option value="conference">Conference</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                placeholder="Enter image description (optional)"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={uploading}
                            className="w-full bg-gradient-to-r from-primary-600 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Upload Image
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            )}

            {/* Gallery Grid */}
            {images.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">No images uploaded yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((image, index) => (
                        <motion.div
                            key={image._id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="aspect-square relative group">
                                <img
                                    src={`http://localhost:5000${image.imageUrl}`}
                                    alt={image.title}
                                    onError={(e) => {
                                        console.error('Image load error:', image.imageUrl);
                                        e.target.src = 'https://via.placeholder.com/400x400/c026d3/ffffff?text=Error+Loading+Image';
                                    }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => deleteImage(image._id)}
                                        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-1">{image.title}</h3>
                                <p className="text-sm text-gray-600 capitalize">{image.category}</p>
                                {image.description && (
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{image.description}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryUpload;