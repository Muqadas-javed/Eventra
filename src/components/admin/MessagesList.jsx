import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen, Trash2, Loader } from 'lucide-react';
import { messagesAPI } from '../../utils/api';

const MessagesList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await messagesAPI.getAll();
            setMessages(response.data);
        } catch (err) {
            setError('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await messagesAPI.markAsRead(id);
            fetchMessages();
        } catch (err) {
            alert('Failed to mark message as read');
        }
    };

    const deleteMessage = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await messagesAPI.delete(id);
                fetchMessages();
            } catch (err) {
                alert('Failed to delete message');
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

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
            </div>
        );
    }

    const unreadCount = messages.filter(m => !m.isRead).length;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Messages ({messages.length})
                    {unreadCount > 0 && (
                        <span className="ml-3 text-lg bg-red-500 text-white px-3 py-1 rounded-full">
                            {unreadCount} new
                        </span>
                    )}
                </h2>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                    <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">No messages yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <motion.div
                            key={message._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${!message.isRead ? 'ring-2 ring-primary-500' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        {message.isRead ? (
                                            <MailOpen className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <Mail className="w-5 h-5 text-primary-600" />
                                        )}
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{message.name}</h3>
                                            <p className="text-sm text-gray-600">{message.email}</p>
                                        </div>
                                        {!message.isRead && (
                                            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                NEW
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <p className="font-semibold text-gray-900 mb-1">Subject:</p>
                                        <p className="text-gray-700">{message.subject}</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        Received: {new Date(message.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {!message.isRead && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => markAsRead(message._id)}
                                            className="px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition whitespace-nowrap"
                                        >
                                            Mark Read
                                        </motion.button>
                                    )}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => deleteMessage(message._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
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

export default MessagesList;