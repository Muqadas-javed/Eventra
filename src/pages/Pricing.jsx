import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingPlans = [
    {
        name: 'Basic',
        icon: Sparkles,
        price: '$5,000',
        description: 'Perfect for small gatherings and intimate celebrations',
        color: 'from-blue-500 to-cyan-500',
        features: [
            'Up to 50 guests',
            'Basic venue decoration',
            'Standard catering package',
            '4-hour event duration',
            'Basic photography (2 hours)',
            'Event coordinator',
            'Setup and cleanup',
        ],
        popular: false,
    },
    {
        name: 'Premium',
        icon: Crown,
        price: '$15,000',
        description: 'Our most popular package for memorable events',
        color: 'from-primary-500 to-pink-500',
        features: [
            'Up to 150 guests',
            'Premium venue decoration',
            'Deluxe catering package',
            '6-hour event duration',
            'Professional photography & videography',
            'Live entertainment options',
            'Dedicated event coordinator',
            'Custom invitations',
            'Setup and cleanup',
            'Complimentary consultation',
        ],
        popular: true,
    },
    {
        name: 'Luxury',
        icon: Zap,
        price: '$35,000+',
        description: 'Ultimate luxury experience with no compromises',
        color: 'from-purple-500 to-indigo-500',
        features: [
            'Unlimited guests',
            'Luxury venue decoration',
            'Premium gourmet catering',
            'Full-day event duration',
            'Cinematic photography & videography',
            'Live band & DJ',
            'Multiple event coordinators',
            'Designer invitations',
            'Valet parking service',
            'Guest accommodation assistance',
            'Custom bar service',
            'Unlimited consultation',
        ],
        popular: false,
    },
];

const Pricing = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose the perfect package for your event. All plans include our commitment to excellence.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${plan.popular ? 'ring-4 ring-primary-500' : ''
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-600 to-pink-600 text-white px-6 py-2 rounded-bl-2xl font-semibold">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-8">
                                {/* Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <plan.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Plan Name */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-6">{plan.description}</p>

                                {/* Price */}
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-600 ml-2">per event</span>
                                </div>

                                {/* Features */}
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Link to="/booking">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${plan.popular
                                            ? 'bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-xl hover:shadow-2xl'
                                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                            }`}
                                    >
                                        Get Started
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Custom Package Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Need a Custom Package?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Every event is unique. Let us create a tailored package that perfectly fits your vision and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/booking">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-primary-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                            >
                                Request Custom Quote
                            </motion.button>
                        </Link>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-all"
                            >
                                Contact Us
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                question: 'What\'s included in all packages?',
                                answer: 'All packages include professional event coordination, setup and cleanup, and our commitment to making your event perfect.',
                            },
                            {
                                question: 'Can I customize my package?',
                                answer: 'Absolutely! We can tailor any package to meet your specific needs and budget. Contact us for a custom quote.',
                            },
                            {
                                question: 'What\'s your cancellation policy?',
                                answer: 'We offer flexible cancellation up to 30 days before the event with a full refund. Contact us for more details.',
                            },
                            {
                                question: 'Do you handle destination events?',
                                answer: 'Yes! We have experience organizing events across the country. Travel costs will be added to your package.',
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-20 text-center"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '500+', label: 'Events Completed' },
                            { number: '50K+', label: 'Happy Clients' },
                            { number: '98%', label: 'Satisfaction Rate' },
                            { number: '10+', label: 'Years Experience' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg"
                            >
                                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Pricing;