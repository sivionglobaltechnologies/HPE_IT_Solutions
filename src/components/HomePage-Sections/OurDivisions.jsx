import React from 'react';
import { Monitor, Building2, HardHat, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

// Animation variants
const fadeIn = (direction = 'up', delay = 0) => ({
    hidden: {
        y: 30,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
            delay: delay,
            bounce: 0.2
        }
    }
});

const DivisionCard = ({ title, icon: Icon, services, delay, index }) => {
    return (
        <motion.div
            variants={fadeIn('up', delay)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="group relative flex flex-col h-full"
        >
            <div className={`h-full relative z-10 p-[1px] rounded-xl transition-all duration-500 overflow-hidden bg-[#0a1219] border border-white/5 hover:border-brand-cyan/30 border-t-2 border-t-brand-cyan/50 hover:shadow-[0_4px_25px_rgba(0,176,212,0.2)]`}>

                {/* Background Number */}
                <div className="absolute top-6 right-8 text-7xl font-black text-white/[0.03] pointer-events-none z-0">
                    {`0${index + 1}`}
                </div>

                <div className="h-full p-6 md:p-8 flex flex-col items-start gap-5 rounded-xl relative z-10">

                    {/* Icon - Using colors similar to the reference emoji/icons */}
                    <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        {React.cloneElement(Icon, { size: 36, className: index === 0 ? "text-blue-400" : index === 1 ? "text-slate-300" : "text-orange-400" })}
                    </div>

                    <div className="space-y-6 flex-grow">
                        {/* Title */}
                        <h3 className="text-xl font-rajdhani font-black text-white leading-tight">
                            {title}
                        </h3>

                        {/* Services List */}
                        <ul className="space-y-3">
                            {services.map((service, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-slate-400 group/item">
                                    <span className="text-brand-cyan text-xs">→</span>
                                    <span className="font-sans font-medium text-[13px] md:text-sm">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const OurDivisions = () => {
    const divisions = [
        {
            title: "Enterprise IT Services",
            icon: <Monitor />,
            services: [
                "Application Development",
                "ERP & Workflow Automation",
                "Infrastructure Management",
                "Cloud & Data Systems"
            ],
            delay: 0.1
        },
        {
            title: "Brick-Oriented Infrastructure Services",
            icon: <Building2 />,
            services: [
                "Construction Digital Monitoring",
                "Real Estate ERP Systems",
                "Vendor & Procurement Management",
                "Site Workforce Automation"
            ],
            delay: 0.2
        },
        {
            title: "Workforce & Non-IT Services",
            icon: <HardHat />,
            services: [
                "Project-based Manpower Deployment",
                "Technical Support Services",
                "Back-office & Compliance Operations"
            ],
            delay: 0.3
        }
    ];

    return (
        <section id="projects" className="relative bg-[#020c13] py-16 px-6 md:py-20 transition-colors duration-500" aria-labelledby="divisions-heading">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="mb-12 text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block font-rajdhani text-brand-cyan tracking-[0.3em] font-black text-[10px] uppercase mb-4">
                            CORE DIVISIONS
                        </span>

                        <h2 id="divisions-heading" className="text-2xl sm:text-3xl md:text-5xl text-white leading-none tracking-tight mb-6 uppercase">
                            WHAT WE DO
                        </h2>

                        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed font-normal font-sans">
                            Three integrated verticals powering enterprise transformation across India.
                        </p>
                    </motion.div>
                </div>

                {/* Division Cards Grid - Decreased Gap */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {divisions.map((div, i) => (
                        <DivisionCard
                            key={i}
                            index={i}
                            {...div}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurDivisions;
