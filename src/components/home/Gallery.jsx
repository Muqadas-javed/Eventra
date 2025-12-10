import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GalleryPreview = () => {
    // Placeholder images - these will be replaced with real gallery images later
    const images = [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&h=500&fit=crop',
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Work
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Take a look at some of our recent events
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
                        >
                            <img
                                src={image}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/gallery"
                            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-primary-700 transition"
                        >
                            View Full Gallery
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GalleryPreview;