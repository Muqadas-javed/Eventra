import React from 'react';
import { motion } from 'framer-motion';
import BookingForm from '../components/booking/BookingForm';

const Booking = () => {
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
                        Let's Plan Your Event
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Fill out the form below and our team will get back to you within 24 hours
                    </p>
                </motion.div>

                {/* Booking Form */}
                <BookingForm />

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 text-center text-gray-600"
                >
                    <p>Need immediate assistance? Call us at <a href="tel:+1234567890" className="text-primary-600 font-semibold hover:underline">+1 (234) 567-890</a></p>
                </motion.div>
            </div>
        </div>
    );
};

export default Booking;