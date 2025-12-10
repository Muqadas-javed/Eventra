import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-purple-700 via-pink-600 to-rose-600">
      
      {/* Background floating orbs */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -top-64 -left-64 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-64 -right-64 w-[700px] h-[700px] bg-pink-400/20 rounded-full blur-[180px]"
      />

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="absolute w-1.5 h-1.5 bg-white/40 rounded-full blur-sm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl">
            Ready to Plan Your Dream Event?
          </h2>

          <p className="text-xl text-purple-100 mt-6 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's create something unforgettable together. Our team is ready to
            bring your vision to life with creativity, precision, and passion.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/booking"
                className="inline-flex items-center gap-3 px-12 py-4 rounded-full text-lg font-semibold
                  bg-white/80 backdrop-blur-xl text-purple-700 shadow-2xl hover:bg-white/90 transition"
              >
                <Calendar className="w-5 h-5" />
                Book a Consultation
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-12 py-4 rounded-full text-lg font-semibold
                  bg-black/20 text-white border border-white/40 backdrop-blur-xl shadow-xl hover:bg-black/30 transition"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
