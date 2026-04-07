import React from 'react';
import { Shield, Lock, HeartPulse, Leaf, BarChart3, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
// Animation variants
const fadeIn = (direction = 'up', delay = 0) => ({
    hidden: {
        y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
        x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        opacity: 0,
        scale: 0.95
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            duration: 1,
            delay: delay,
            bounce: 0.2
        }
    }
});

const CertCard = ({ cert, index }) => {
    return (
        <motion.div
            variants={fadeIn('up', index * 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="group relative flex flex-col h-full"
        >
            {/* Lighting Hover Effect (Gradient Glow) */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-hpe-cyan/20 to-hpe-orange/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-0" />

            <div className="h-full relative z-10 p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent group-hover:from-hpe-cyan group-hover:to-hpe-orange transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="h-full bg-white dark:bg-[#022534] p-6 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center justify-between transition-colors duration-500">
                    <div className={`${cert.bgColor} dark:bg-white/5 p-4 rounded-xl mb-4 shadow-inner border border-slate-100/50 dark:border-white/10 group-hover:scale-110 group-hover:border-hpe-cyan transition-all duration-500`}>
                        {React.cloneElement(cert.icon, { className: "w-6 h-6 text-hpe-cyan transition-colors" })}
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-[#011b26] dark:text-white mb-2 leading-tight tracking-tight group-hover:text-hpe-cyan transition-colors">
                            {cert.title}
                        </h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider leading-relaxed opacity-80">
                            {cert.subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Certifications = () => {
    const certs = [
        {
            title: "ISO 9001:2015",
            subtitle: "Quality Management Systems",
            icon: <Shield />,
            bgColor: "bg-blue-50"
        },
        {
            title: "ISO 27001:2022",
            subtitle: "Information Security Management",
            icon: <Lock />,
            bgColor: "bg-emerald-50"
        },
        {
            title: "ISO 45001",
            subtitle: "Occupational Health & Safety",
            icon: <HeartPulse />,
            bgColor: "bg-rose-50"
        },
        {
            title: "ISO 14001",
            subtitle: "Environmental Management",
            icon: <Leaf />,
            bgColor: "bg-green-50"
        },
        {
            title: "CMMI Level 3",
            subtitle: "Process Maturity Model",
            icon: <BarChart3 />,
            bgColor: "bg-indigo-50"
        },
    ];

    return (
        <section className="bg-white dark:bg-[#011b26] py-16 px-6 md:py-24 transition-colors duration-500 overflow-hidden" aria-labelledby="certs-heading">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-brand-orange text-xs font-black tracking-[0.4em] uppercase mb-4 block">
                        QUALITY ASSURANCE
                    </span>
                    <h2 id="certs-heading" className="text-2xl md:text-5xl text-[#011b26] dark:text-white mb-6 tracking-tight">
                        Certifications & Standards
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Committed to global benchmarks in quality, security, and operational excellence.
                    </p>
                </div>

                {/* Certifications Grid */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
                    {certs.map((cert, index) => (
                        <div key={index} className="w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(20%-2rem)] min-w-[140px] max-w-[200px]">
                            <CertCard cert={cert} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
