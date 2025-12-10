import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Image, TrendingUp } from 'lucide-react';

const Dashboard = ({ stats }) => {
    const cards = [
        {
            title: 'Total Bookings',
            value: stats.bookings || 0,
            icon: Calendar,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'New Messages',
            value: stats.unreadMessages || 0,
            icon: Mail,
            color: 'from-green-500 to-teal-500',
        },
        {
            title: 'Gallery Images',
            value: stats.gallery || 0,
            icon: Image,
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Pending Bookings',
            value: stats.pendingBookings || 0,
            icon: TrendingUp,
            color: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-2xl p-6 shadow-lg"
                    >
                        <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                            <card.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 bg-white rounded-2xl p-8 shadow-lg"
            >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Welcome to Admin Dashboard</h3>
                <p className="text-gray-600 mb-4">
                    Manage your event bookings, messages, and gallery images from this central dashboard.
                </p>
                <ul className="space-y-2 text-gray-600">
                    <li>• View and manage all event bookings</li>
                    <li>• Respond to customer messages</li>
                    <li>• Upload and manage gallery images</li>
                    <li>• Track booking statuses</li>
                </ul>
            </motion.div>
        </div>
    );
};

export default Dashboard;