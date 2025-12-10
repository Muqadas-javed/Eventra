import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, DollarSign, FileText, Send, CheckCircle } from 'lucide-react';
import { bookingsAPI } from '../../utils/api';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        venue: '',
        budget: '',
        requirements: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await bookingsAPI.create(formData);
            setIsSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                eventType: '',
                eventDate: '',
                guestCount: '',
                venue: '',
                budget: '',
                requirements: '',
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center py-20"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
                    <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Booking Submitted!</h2>
                <p className="text-xl text-gray-600 mb-8">
                    Thank you for your booking request. We'll get back to you within 24 hours.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSuccess(false)}
                    className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition"
                >
                    Submit Another Booking
                </motion.button>
            </motion.div>
        );
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Book Your Event
            </h2>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                >
                    {error}
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="John Doe"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="john@example.com"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="+1 (555) 000-0000"
                    />
                </div>

                {/* Event Type */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Event Type *
                    </label>
                    <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    >
                        <option value="">Select event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="conference">Conference</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Event Date */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Event Date *
                    </label>
                    <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    />
                </div>

                {/* Guest Count */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Number of Guests *
                    </label>
                    <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="100"
                    />
                </div>

                {/* Venue */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Venue/Location *
                    </label>
                    <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="Grand Hotel Ballroom"
                    />
                </div>

                {/* Budget */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Budget Range *
                    </label>
                    <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    >
                        <option value="">Select budget range</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                        <option value="$20,000 - $50,000">$20,000 - $50,000</option>
                        <option value="$50,000+">$50,000+</option>
                    </select>
                </div>
            </div>

            {/* Requirements */}
            <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Special Requirements
                </label>
                <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="Tell us about any special requirements, themes, or preferences..."
                />
            </div>

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-600 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Submit Booking Request
                    </>
                )}
            </motion.button>
        </motion.form>
    );
};

export default BookingForm;