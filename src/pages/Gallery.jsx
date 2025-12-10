import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryAPI } from '../utils/api';
import { Filter, X, Loader } from 'lucide-react';
const BASE_URL = "http://localhost:5000"; // or your live backend URL

const categories = [
    { value: '', label: 'All Events' },
    { value: 'wedding', label: 'Weddings' },
    { value: 'birthday', label: 'Birthdays' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'conference', label: 'Conferences' },
    { value: 'other', label: 'Other' },
];

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Placeholder images with working URLs
    const placeholderImages = [
        {
            _id: '1',
            title: 'Elegant Wedding',
            category: 'wedding',
            imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&q=80',
            description: 'A beautiful elegant wedding ceremony',
        },
        {
            _id: '2',
            title: 'Corporate Conference',
            category: 'corporate',
            imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop&q=80',
            description: 'Professional corporate conference setup',
        },
        {
            _id: '3',
            title: 'Birthday Celebration',
            category: 'birthday',
            imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop&q=80',
            description: 'Fun birthday party celebration',
        },
        {
            _id: '4',
            title: 'Garden Wedding',
            category: 'wedding',
            imageUrl: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop&q=80',
            description: 'Romantic garden wedding setup',
        },
        {
            _id: '5',
            title: 'Business Meeting',
            category: 'corporate',
            imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop&q=80',
            description: 'Professional business meeting venue',
        },
        {
            _id: '6',
            title: 'Beach Wedding',
            category: 'wedding',
            imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop&q=80',
            description: 'Beautiful beach wedding ceremony',
        },
        {
            _id: '7',
            title: 'Kids Birthday Party',
            category: 'birthday',
            imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&q=80',
            description: 'Colorful kids birthday party',
        },
        {
            _id: '8',
            title: 'Gala Dinner',
            category: 'corporate',
            imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80',
            description: 'Elegant gala dinner event',
        },
        {
            _id: '9',
            title: 'Outdoor Wedding',
            category: 'wedding',
            imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=80',
            description: 'Stunning outdoor wedding venue',
        },
        {
            _id: '10',
            title: 'Conference Hall',
            category: 'conference',
            imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop&q=80',
            description: 'Modern conference hall setup',
        },
        {
            _id: '11',
            title: 'Birthday Cake',
            category: 'birthday',
            imageUrl: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=600&fit=crop&q=80',
            description: 'Beautiful birthday cake decoration',
        },
        {
            _id: '12',
            title: 'Wedding Reception',
            category: 'wedding',
            imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop&q=80',
            description: 'Luxurious wedding reception setup',
        },
    ];

    useEffect(() => {
        fetchGallery();
    }, []);

    useEffect(() => {
        filterImages();
    }, [selectedCategory, images]);

   const fetchGallery = async () => {
    try {
        setLoading(true);
        const response = await galleryAPI.getAll();

        // Mix uploaded images first + placeholder images after
        const combined = [...response.data, ...placeholderImages];

        setImages(combined);
        setFilteredImages(combined);
    } catch (err) {
        setError('Failed to load gallery');

        // Show only placeholder images if backend fails
        setImages(placeholderImages);
        setFilteredImages(placeholderImages);
    } finally {
        setLoading(false);
    }
};


    const filterImages = () => {
        if (!selectedCategory) {
            setFilteredImages(images);
        } else {
            setFilteredImages(images.filter(img => img.category === selectedCategory));
        }
    };

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/800x600/c026d3/ffffff?text=Event+Image';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Gallery
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our portfolio of unforgettable events and celebrations
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    <div className="flex items-center gap-2 text-gray-600 mr-4">
                        <Filter className="w-5 h-5" />
                        <span className="font-semibold">Filter:</span>
                    </div>
                    {categories.map((category) => (
                        <motion.button
                            key={category.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category.value)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === category.value
                                ? 'bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                }`}
                        >
                            {category.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
                {filteredImages.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-xl text-gray-600">No images found in this category.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={image._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedImage(image)}
                                    className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                                >
                                   <img
  src={
    image.imageUrl.startsWith("http")
      ? image.imageUrl
      : `${BASE_URL}${image.imageUrl}`
  }
  alt={image.title}
  className="w-full h-full object-cover"
/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                                            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                                {categories.find(c => c.value === image.category)?.label || image.category}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Image Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition z-10"
                            >
                                <X className="w-6 h-6 text-gray-900" />
                            </motion.button>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
                            >
                               <img
  src={
    selectedImage.imageUrl?.startsWith("http")
      ? selectedImage.imageUrl
      : `${BASE_URL}${selectedImage.imageUrl}`
  }
  alt={selectedImage.title}
  onError={handleImageError}
  className="w-full max-h-[70vh] object-contain bg-gray-100"
/>

                                <div className="p-6">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        {selectedImage.title}
                                    </h2>
                                    <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-semibold">
                                        {categories.find(c => c.value === selectedImage.category)?.label || selectedImage.category}
                                    </span>
                                    {selectedImage.description && (
                                        <p className="text-gray-600 mt-4">{selectedImage.description}</p>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Gallery;