import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Mail, Image, LogOut } from 'lucide-react';
import Login from '../components/admin/Login';
import Dashboard from '../components/admin/Dashboard';
import BookingsList from '../components/admin/BookingsList';
import MessagesList from '../components/admin/MessagesList';
import GalleryUpload from '../components/admin/GalleryUpload';
import { authAPI, bookingsAPI, messagesAPI, galleryAPI } from '../utils/api';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({
        bookings: 0,
        unreadMessages: 0,
        gallery: 0,
        pendingBookings: 0,
    });

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchStats();
        }
    }, [isAuthenticated]);

    const checkAuth = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            await authAPI.verify();
            setIsAuthenticated(true);
        } catch (err) {
            localStorage.removeItem('adminToken');
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const [bookingsRes, messagesRes, galleryRes] = await Promise.all([
                bookingsAPI.getAll(),
                messagesAPI.getAll(),
                galleryAPI.getAll(),
            ]);

            const bookings = bookingsRes.data;
            const messages = messagesRes.data;
            const gallery = galleryRes.data;

            setStats({
                bookings: bookings.length,
                unreadMessages: messages.filter(m => !m.isRead).length,
                gallery: gallery.length,
                pendingBookings: bookings.filter(b => b.status === 'pending').length,
            });
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
        fetchStats();
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setActiveTab('dashboard');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login onLoginSuccess={handleLogin} />;
    }

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: Mail, badge: stats.unreadMessages },
        { id: 'gallery', label: 'Gallery', icon: Image },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Top Navigation Bar */}
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-pink-600 rounded-xl flex items-center justify-center">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                                <p className="text-sm text-gray-600">Event Management System</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <motion.button
                                    key={tab.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all relative ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                    {tab.badge > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {tab.badge}
                                        </span>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'dashboard' && <Dashboard stats={stats} />}
                    {activeTab === 'bookings' && <BookingsList />}
                    {activeTab === 'messages' && <MessagesList />}
                    {activeTab === 'gallery' && <GalleryUpload />}
                </motion.div>
            </div>
        </div>
    );
};

export default Admin;