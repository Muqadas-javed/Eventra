import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo1.png'; // Adjust the path if needed

const Navbar = () => {
    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/">
                            <img src={logo} alt="Eventra Logo" className="h-40 w-auto" />

                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
                            Home
                        </Link>
                        <Link to="/booking" className="text-gray-700 hover:text-primary-600 transition">
                            Book Event
                        </Link>
                        <Link to="/gallery" className="text-gray-700 hover:text-primary-600 transition">
                            Gallery
                        </Link>
                        <Link to="/pricing" className="text-gray-700 hover:text-primary-600 transition">
                            Pricing
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition">
                            Contact
                        </Link>
                        <Link
                            to="/admin"
                            className="bg-gradient-to-r from-primary-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition font-semibold"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
