import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const CountUp = ({ value, color }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Extract numerical value and suffix (e.g., "2,000+" -> 2000, "+")
    const numericValue = parseInt(value.replace(/,/g, ''));
    const suffix = value.includes('+') ? '+' : '';

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = numericValue;
            const duration = 2000; // 2 seconds
            const increment = end / (duration / 16); // ~60fps

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, numericValue]);

    return (
        <span ref={ref} className={color}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const WorkforceStrength = () => {
    const stats = [
        { label: "Employees Across India", value: "2,000+", color: "text-brand-orange" },
        { label: "IT Professionals", value: "350+", color: "text-[#00b0d4]" },
        { label: "Field & Infrastructure Staff", value: "1,200+", color: "text-emerald-500 dark:text-emerald-400" },
        { label: "Project & Regional Managers", value: "200+", color: "text-amber-500 dark:text-amber-400" }
    ];

    const locations = ["Hyderabad", "Mumbai", "Bangalore", "Chennai", "Delhi"];

    return (
        <section className="bg-slate-50 dark:bg-[#011b26] py-8 px-6 md:py-12 text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-500" aria-labelledby="workforce-heading">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-brand-orange text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 block">
                        OUR PEOPLE
                    </span>
                    <h2 id="workforce-heading" className="text-xl md:text-4xl font-black mb-3 leading-tight text-[#011b26] dark:text-white">
                        Workforce Strength
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium">
                        A diverse talent pool dedicated to excellence across India.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center py-6 px-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
                            <div className="text-3xl md:text-4xl font-black mb-2">
                                <CountUp value={stat.value} color={stat.color} />
                            </div>
                            <div className="text-[10px] md:text-[11px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-[0.2em] leading-snug">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer / Presence */}
                <div className="border-t border-slate-200 dark:border-white/5 pt-8 text-center">
                    <h3 className="text-[#00b0d4] text-[9px] font-black tracking-[0.4em] uppercase mb-4 opacity-70">Operational Presence</h3>
                    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 md:gap-x-8">
                        {locations.map((loc, index) => (
                            <div key={index} className="flex items-center">
                                <span className="text-slate-800 dark:text-white font-bold text-xs md:text-sm">
                                    {loc}
                                </span>
                                {index < locations.length - 1 && (
                                    <div className="ml-4 md:ml-8 w-1 h-1 bg-brand-orange rounded-full opacity-50 dark:opacity-30" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkforceStrength;
