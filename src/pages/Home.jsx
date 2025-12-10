import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowWeWork from '../components/home/HowWeWork';
import GalleryPreview from '../components/home/Gallery';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';

const Home = () => {
    return (
        <div>
            <Hero />
            <Services />
            <WhyChooseUs />
            <HowWeWork />
            <GalleryPreview />
            <Testimonials />
            <CTASection />
        </div>
    );
};

export default Home;