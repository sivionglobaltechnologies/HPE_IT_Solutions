import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Globe2, Network } from 'lucide-react';

const WhyChooseUs = () => {
    const reasons = [
        {
            title: "Over 70 Merged Partner Entities",
            icon: <Network className="text-brand-cyan" />,
            description: "A vast network of strategic partnerships powering our robust infrastructure."
        },
        {
            title: "Structured Multi-Vertical Model",
            icon: <Zap className="text-brand-orange" />,
            description: "Specialized divisions for IT, Infrastructure, and Workforce management."
        },
        {
            title: "Centralized Project Governance",
            icon: <ShieldCheck className="text-brand-cyan" />,
            description: "Unified control systems ensuring consistency and quality across all projects."
        },
        {
            title: "Pan-India Field Execution Teams",
            icon: <Globe2 className="text-brand-orange" />,
            description: "On-the-ground experts delivering excellence in every major metropolitan area."
        },
        {
            title: "Enterprise-Grade Compliance Framework",
            icon: <CheckCircle2 className="text-brand-cyan" />,
            description: "Adhering to the highest industry standards for security and reliability."
        }
    ];

    return (
        <section className="relative bg-[#020c13] py-20 px-6 md:py-32 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block font-rajdhani text-brand-orange tracking-[0.4em] font-black text-xs uppercase mb-6">
                            WHY PARTNER WITH US
                        </span>

                        <h2 className="text-3xl md:text-5xl font-rajdhani font-semibold text-white leading-tight uppercase mb-5 tracking-tight">
                            WHY HPE IT <span className="text-brand-cyan">SOLUTIONS</span>
                        </h2>

                        <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-sans mb-10">
                            We combine centralized digital governance with decentralized execution to deliver
                            seamless infrastructure ecosystems across the nation.
                        </p>

                        <div className="w-24 h-1 bg-gradient-to-r from-brand-cyan to-brand-orange rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 gap-6">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-cyan/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group">
                                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-brand-cyan/10 transition-colors">
                                        {React.cloneElement(reason.icon, { size: 28 })}
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-rajdhani font-black text-white group-hover:text-brand-cyan transition-colors mb-2">
                                            {reason.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm md:text-base font-medium">
                                            {reason.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
