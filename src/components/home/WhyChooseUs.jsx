import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, TrendingUp, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
        {
            icon: Award,
            title: 'Award-Winning Team',
            description: 'Our experienced professionals have won multiple industry awards for excellence in event planning.'
        },
        {
            icon: Shield,
            title: 'Trusted by Thousands',
            description: 'Over 50,000 satisfied clients have trusted us with their most important moments.'
        },
        {
            icon: TrendingUp,
            title: 'Innovative Solutions',
            description: 'We use cutting-edge technology and creative approaches to make your event stand out.'
        },
        {
            icon: CheckCircle,
            title: 'Full-Service Support',
            description: 'From concept to execution, we handle every detail so you can enjoy your event stress-free.'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Why Choose Us
                    </h2>
                    <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                        We're committed to delivering exceptional experiences that exceed your expectations
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-purple-100">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;