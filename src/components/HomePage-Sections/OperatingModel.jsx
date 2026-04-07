import React from 'react';
import { motion } from "framer-motion";
import {
    ClipboardCheck,
    Search,
    UserPlus,
    Code2,
    HardHat,
    CheckSquare,
    BarChart4,
    PackageCheck,
    ArrowRight
} from 'lucide-react';

const OperatingModel = () => {
    const steps = [
        { title: "Requirement", icon: <ClipboardCheck />, desc: "Initial client consultation and scope definition." },
        { title: "Analysis", icon: <Search />, desc: "Technical feasibility study and resource planning." },
        { title: "Allocation", icon: <UserPlus />, desc: "Strategic team deployment and asset assignment." },
        { title: "Development", icon: <Code2 />, desc: "Centralized digital architecture and system build." },
        { title: "Site Execution", icon: <HardHat />, desc: "On-the-ground project implementation and rollout." },
        { title: "QA", icon: <CheckSquare />, desc: "Enterprise-grade quality assurance and testing." },
        { title: "Reporting", icon: <BarChart4 />, desc: "Real-time transparent progress tracking." },
        { title: "Delivery", icon: <PackageCheck />, desc: "Final project handover and continuous support." }
    ];

    return (
        <section className="relative bg-[#010a11] py-20 px-6 md:py-32 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-20 -right-24 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block font-rajdhani text-brand-cyan tracking-[0.4em] font-black text-xs uppercase mb-4 px-4 py-1.5 bg-brand-cyan/10 rounded-full">
                            OUR WORKFLOW
                        </span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-rajdhani font-semibold text-white leading-none tracking-tight uppercase mb-4">
                            OPERATING <span className="text-brand-orange">MODEL</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-brand-cyan to-brand-orange mx-auto rounded-full" />
                    </motion.div>
                </div>

                {/* Steps Process Flow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[50px] left-10 right-10 h-[1px] bg-white/10 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Card Content */}
                            <div className="h-full p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-brand-cyan/40 hover:-translate-y-2 flex flex-col items-center text-center">

                                {/* Step Number & Icon */}
                                <div className="mb-5 relative">
                                    <div className="w-16 h-16 rounded-xl bg-[#010a11] border-2 border-white/5 flex items-center justify-center text-brand-cyan transition-all duration-500 group-hover:bg-brand-cyan group-hover:text-white group-hover:shadow-[0_0_25px_rgba(0,176,212,0.4)]">
                                        {React.cloneElement(step.icon, { size: 30, strokeWidth: 1.5 })}
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-orange text-white text-[11px] font-black flex items-center justify-center shadow-lg border-2 border-[#010a11]">
                                        {index + 1}
                                    </span>
                                </div>

                                {/* Text */}
                                <h3 className="text-base md:text-xl font-rajdhani font-black text-white mb-2 uppercase tracking-wider group-hover:text-brand-cyan transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 text-[11px] md:text-sm leading-relaxed font-medium">
                                    {step.desc}
                                </p>

                                {/* Connector Arrow for Mobile Icons */}
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden mt-8 text-white/10">
                                        <ArrowRight className="rotate-90 sm:rotate-0" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OperatingModel;
