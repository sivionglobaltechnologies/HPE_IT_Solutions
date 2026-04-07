import React from 'react';
import Hero from '../components/Hero';
import AboutUsSection from '../components/HomePage-Sections/AboutUsSection';
import OurDivisions from '../components/HomePage-Sections/OurDivisions';
import WhyChooseUs from '../components/HomePage-Sections/WhyChooseUs';
import OperatingModel from '../components/HomePage-Sections/OperatingModel';
import Certifications from '../components/Certifications';
import ProjectPortfolio from '../components/HomePage-Sections/ProjectPortfolio';
import WorkforceStrength from '../components/HomePage-Sections/WorkforceStrength';
import ImpactAtScale from '../components/HomePage-Sections/ImpactAtScale';
import ContactCTA from '../components/HomePage-Sections/ContactCTA';
const Home = () => {
    return (
        <>
            <Hero />
            <AboutUsSection />
            <OurDivisions />
            <WhyChooseUs />
            <OperatingModel />
            <Certifications />
            <WorkforceStrength />
            <ProjectPortfolio />
            <ImpactAtScale />
            <ContactCTA />
        </>
    );
};

export default Home;
