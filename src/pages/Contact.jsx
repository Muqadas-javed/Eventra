import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { messagesAPI } from '../utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
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
            await messagesAPI.create(formData);
            setIsSuccess(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });

            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Contact Information
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Fill out the form and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                    <a href="tel:+1234567890" className="text-gray-600 hover:text-primary-600">
                                        +1 (234) 567-890
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                    <a href="mailto:info@eventmaster.com" className="text-gray-600 hover:text-primary-600">
                                        info@eventmaster.com
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                                    <p className="text-gray-600">
                                        123 Event Street<br />
                                        New York, NY 10001
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Office Hours */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl shadow-lg"
                        >
                            <h3 className="font-semibold text-gray-900 mb-4">Office Hours</h3>
                            <div className="space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Monday - Friday:</span>
                                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday:</span>
                                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday:</span>
                                    <span className="font-medium">Closed</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-3xl shadow-2xl p-8 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                >
                                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                                </motion.div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Thank you for contacting us. We'll get back to you soon.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsSuccess(false)}
                                    className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition"
                                >
                                    Send Another Message
                                </motion.button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <div className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Your Name *
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

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                            placeholder="Tell us more about your inquiry..."
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
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;