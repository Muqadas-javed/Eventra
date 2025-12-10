import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, Users, ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const heroSlides = [
        {
            title: "Create Unforgettable",
            highlight: "Moments Together",
            description: "From intimate gatherings to grand celebrations, we bring your vision to life with seamless planning and flawless execution.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&h=1080&fit=crop"
        },
        {
            title: "Dream Weddings",
            highlight: "Made Perfect",
            description: "Your special day deserves exceptional care. Let us handle every detail while you enjoy the journey.",
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=1080&fit=crop"
        },
        {
            title: "Corporate Events",
            highlight: "That Inspire",
            description: "Professional event management that leaves lasting impressions on your clients and team.",
            image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1920&h=1080&fit=crop"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image Slider */}
            <div className="absolute inset-0">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(${(index - currentSlide) * 100}%)`,
                        }}
                    >
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/80 to-pink-900/90" />
                    </div>
                ))}
            </div>

            {/* Animated Particles */}
            <div
                className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"
                style={{
                    animation: 'float1 8s ease-in-out infinite'
                }}
            />
            <div
                className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"
                style={{
                    animation: 'float2 10s ease-in-out infinite'
                }}
            />
            <div
                className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"
                style={{
                    animation: 'float3 12s ease-in-out infinite'
                }}
            />

            {/* Floating Elements */}
            <div
                className="absolute top-1/4 left-1/4 w-16 h-16 opacity-20"
                style={{
                    animation: 'floatRotate1 6s ease-in-out infinite'
                }}
            >
                <Sparkles className="w-full h-full text-yellow-300" />
            </div>
            <div
                className="absolute bottom-1/3 right-1/4 w-12 h-12 opacity-20"
                style={{
                    animation: 'floatRotate2 8s ease-in-out infinite'
                }}
            >
                <Calendar className="w-full h-full text-pink-300" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fadeIn">
                    {/* Premium Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8 shadow-2xl border border-white/30 hover:scale-105 transition-transform cursor-pointer">
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                        <span className="text-sm font-semibold text-white tracking-wide">
                            Premium Event Management Since 2014
                        </span>
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                    </div>

                    {/* Main Heading with Slide Content */}
                    <div
                        key={currentSlide}
                        className="animate-fadeIn"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
                            {heroSlides[currentSlide].title}
                            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mt-2">
                                {heroSlides[currentSlide].highlight}
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                            {heroSlides[currentSlide].description}
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <div className="hover:scale-105 transition-transform">
        
        <Link to="/booking" className="hover:scale-105 transition-transform">
        <button className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:bg-purple-50 transition group">
            <Calendar className="w-6 h-6" />
            Book Your Event
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
    </Link>                    
                        </div>

                        <div className="hover:scale-105 transition-transform">
                            <Link to="/gallery" className="hover:scale-105 transition-transform">
        <button className="inline-flex items-center gap-3 bg-purple-600/30 backdrop-blur-md text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:bg-purple-600/50 transition border-2 border-white/40 group">
            <Play className="w-5 h-5" />
            View Our Work
        </button>
    </Link>
                        </div>
                    </div>

                    {/* Stats with Enhanced Design */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { icon: Users, number: '500+', label: 'Events Organized', color: 'from-blue-400 to-cyan-400' },
                            { icon: Sparkles, number: '50K+', label: 'Happy Clients', color: 'from-pink-400 to-rose-400' },
                            { icon: Calendar, number: '10+', label: 'Years Experience', color: 'from-purple-400 to-indigo-400' },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 transition-all"
                                style={{
                                    animationDelay: `${0.6 + index * 0.1}s`
                                }}
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-purple-100 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all rounded-full ${
                            currentSlide === index 
                                ? 'w-12 h-3 bg-white' 
                                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>

            {/* Scroll Down Indicator */}
            <button
                onClick={scrollToContent}
                className="absolute bottom-8 right-8 z-20 text-white/80 hover:text-white transition-colors animate-bounce"
            >
                <ChevronDown className="w-8 h-8" />
            </button>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float1 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    50% {
                        transform: translate(50px, 30px) scale(1.2);
                    }
                }

                @keyframes float2 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    50% {
                        transform: translate(-50px, 50px) scale(1.3);
                    }
                }

                @keyframes float3 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    50% {
                        transform: translate(30px, 0) scale(1.4);
                    }
                }

                @keyframes floatRotate1 {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                }

                @keyframes floatRotate2 {
                    0%, 100% {
                        transform: translateY(0) rotate(360deg);
                    }
                    50% {
                        transform: translateY(20px) rotate(180deg);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Hero;