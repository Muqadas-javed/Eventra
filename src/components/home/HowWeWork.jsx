import React from "react";
import { motion } from "framer-motion";

const HowWeWork = () => {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "We start by understanding your vision, requirements, and budget for your event.",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "02",
      title: "Planning",
      description:
        "Our team creates a detailed plan covering all aspects from venue to vendors.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "03",
      title: "Coordination",
      description:
        "We handle all logistics, bookings, and coordination with your chosen vendors.",
      color: "from-green-500 to-teal-500",
    },
    {
      number: "04",
      title: "Execution",
      description:
        "On the big day, we ensure everything runs smoothly from start to finish.",
      color: "from-orange-500 to-red-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 opacity-70" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            How We Work
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our streamlined process ensures your event is executed flawlessly
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -10,
                scale: 1.03,
                rotateX: 4,
                rotateY: -3,
                transition: { type: "spring", stiffness: 180 },
              }}
              className="relative bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all group overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
              />

              {/* Animated Step Number */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                className={`text-6xl font-extrabold bg-gradient-to-r ${step.color} text-transparent bg-clip-text mb-5`}
              >
                {step.number}
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connecting Line (desktop only) */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="hidden lg:block absolute top-14 -right-6 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 origin-left"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
