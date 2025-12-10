import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Phone, Users, MapPin, DollarSign, Loader, CheckCircle, XCircle, Clock } from 'lucide-react';
import { bookingsAPI } from '../../utils/api';

const BookingsList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await bookingsAPI.getAll();
            setBookings(response.data);
        } catch (err) {
            setError('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const updateBookingStatus = async (id, status) => {
        try {
            await bookingsAPI.updateStatus(id, status);
            fetchBookings();
        } catch (err) {
            alert('Failed to update booking status');
        }
    };

    const deleteBooking = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await bookingsAPI.delete(id);
                fetchBookings();
            } catch (err) {
                alert('Failed to delete booking');
            }
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
            confirmed: { icon: CheckCircle, color: 'bg-green-100 text-green-700', label: 'Confirmed' },
            cancelled: { icon: XCircle, color: 'bg-red-100 text-red-700', label: 'Cancelled' },
        };
        const badge = badges[status] || badges.pending;
        const Icon = badge.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${badge.color}`}>
                <Icon className="w-4 h-4" />
                {badge.label}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Bookings ({bookings.length})</h2>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">No bookings yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={booking._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.name}</h3>
                                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-4 h-4" />
                                                    {booking.email}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" />
                                                    {booking.phone}
                                                </span>
                                            </div>
                                        </div>
                                        {getStatusBadge(booking.status)}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Calendar className="w-4 h-4 text-primary-600" />
                                            <div>
                                                <p className="font-semibold">Event Date</p>
                                                <p>{new Date(booking.eventDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Users className="w-4 h-4 text-primary-600" />
                                            <div>
                                                <p className="font-semibold">Guests</p>
                                                <p>{booking.guestCount} people</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <MapPin className="w-4 h-4 text-primary-600" />
                                            <div>
                                                <p className="font-semibold">Venue</p>
                                                <p>{booking.venue}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <DollarSign className="w-4 h-4 text-primary-600" />
                                            <div>
                                                <p className="font-semibold">Budget</p>
                                                <p>{booking.budget}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700 md:col-span-2">
                                            <div>
                                                <p className="font-semibold">Event Type</p>
                                                <p className="capitalize">{booking.eventType}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {booking.requirements && (
                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">Special Requirements:</p>
                                            <p className="text-sm text-gray-600">{booking.requirements}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex lg:flex-col gap-2">
                                    {booking.status === 'pending' && (
                                        <>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                                className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
                                            >
                                                Confirm
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                                            >
                                                Cancel
                                            </motion.button>
                                        </>
                                    )}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => deleteBooking(booking._id)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                                    >
                                        Delete
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingsList;