import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Briefcase } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion";

const ProjectPortfolio = () => {
    const scrollRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: scrollRef });
    const widthProgress = useTransform(scrollXProgress, [0, 1], ["10%", "100%"]);

    const projectNames = [
        "National Real Estate ERP Implementation",
        "SmartSite Monitoring System",
        "Government Infrastructure Digitization",
        "Enterprise Vendor Automation Platform",
        "Multi-State Workforce Deployment Project",
        "Construction Billing & Cost Control Software",
        "Large-Scale Housing Project Management System",
        "Large-Scale Housing Project Management System",
        "Corporate IT Infrastructure Setup",
        "Pan-India AMC & Technical Support Program"
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section id="projects" className="bg-[#020c13] py-16 px-6 md:py-24 transition-colors duration-500 overflow-hidden" aria-labelledby="portfolio-heading">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="text-left">
                        <span className="inline-block font-rajdhani text-brand-orange tracking-[0.2em] md:tracking-[0.4em] font-black text-[10px] md:text-xs uppercase mb-4">
                            PORTFOLIO
                        </span>
                        <h2 id="portfolio-heading" className="text-2xl sm:text-3xl md:text-5xl text-white leading-none tracking-tight uppercase">
                            Project <span className="text-brand-cyan">Portfolio</span>
                        </h2>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-cyan hover:border-brand-cyan transition-all cursor-pointer group"
                            aria-label="Previous Projects"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-cyan hover:border-brand-cyan transition-all cursor-pointer group"
                            aria-label="Next Projects"
                        >
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Area */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 px-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {projectNames.map((name, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex-shrink-0 w-80 snap-center"
                        >
                            <div className="relative h-48 bg-[#0a1219] p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/30 transition-all group flex flex-col justify-between overflow-hidden">
                                {/* Background Accent Icon */}
                                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Briefcase size={120} className="text-white" />
                                </div>

                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                                        <Briefcase size={20} />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-rajdhani font-black text-white leading-tight group-hover:text-brand-cyan transition-colors line-clamp-3">
                                        {name}
                                    </h3>
                                </div>

                                <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase mt-4">
                                    Project {index + 1}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Scroll Track (Dynamic) */}
                <div className="w-full h-[1px] bg-white/5 mt-8 relative">
                    <motion.div
                        className="absolute top-0 left-0 h-[2px] bg-brand-cyan rounded-full"
                        style={{ width: widthProgress }}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProjectPortfolio;
