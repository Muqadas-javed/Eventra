import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Cake,
  Briefcase,
  Users,
  Music,
  Camera,
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Weddings",
    description:
      "Make your special day unforgettable with our complete wedding planning services.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Cake,
    title: "Birthday Parties",
    description:
      "Celebrate another year with themed parties that create lasting memories.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    description:
      "Professional event management for conferences, seminars, and corporate gatherings.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Social Events",
    description:
      "Anniversaries, reunions, and social gatherings planned to perfection.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Music,
    title: "Entertainment",
    description:
      "Live music, DJs, and entertainment options for all types of events.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Professional photography and videography to capture every moment.",
    color: "from-indigo-500 to-purple-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Services = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive event planning services tailored to your needs
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{
                y: -12,
                scale: 1.04,
                rotateX: 4,
                rotateY: -4,
                transition: { type: "spring", stiffness: 180 },
              }}
              className="group relative rounded-3xl p-8 bg-white/60 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40 overflow-hidden"
            >
              {/* 🌈 Hover Background Animated Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 group-hover:blur-xl transition-all duration-500`}
              />

              {/* Glow Spotlight */}
              <div
                className={`absolute -inset-20 bg-gradient-to-br ${service.color} rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-all duration-700`}
              ></div>

              {/* Icon Glow Behind */}
              <div
                className={`absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br ${service.color} opacity-30 blur-3xl rounded-full`}
              />

              {/* Main Icon */}
              <div
                className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <service.icon className="w-10 h-10 text-white" />
              </div>

              {/* Text */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>

              {/* Bottom Animated Glow Line */}
              <div
                className={`mt-6 h-1 w-10 rounded-full bg-gradient-to-r ${service.color} opacity-90 group-hover:w-24 group-hover:opacity-100 transition-all`}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
