import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitMerge, Users, Layout, IndianRupee } from 'lucide-react';

const AnimatedCounter = ({ end, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000; // 2 seconds
            const increment = end / (duration / 16); // 60fps

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
    }, [isInView, end]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

const ImpactAtScale = () => {
    const impacts = [
        {
            label: "Strategic Mergers",
            value: 70,
            suffix: "+",
            icon: <GitMerge className="w-6 h-6 text-brand-orange" />,
            bgColor: "bg-orange-50"
        },
        {
            label: "Enterprise Clients",
            value: 150,
            suffix: "+",
            icon: <Users className="w-6 h-6 text-[#00b0d4]" />,
            bgColor: "bg-blue-50"
        },
        {
            label: "Sites Managed",
            value: 500,
            suffix: "+",
            icon: <Layout className="w-6 h-6 text-emerald-600" />,
            bgColor: "bg-emerald-50"
        },
        {
            label: "Project Value",
            value: 250,
            prefix: "₹",
            suffix: "+ Cr",
            icon: <IndianRupee className="w-6 h-6 text-amber-600" />,
            bgColor: "bg-amber-50"
        }
    ];

    return (
        <section id="stats" className="bg-white dark:bg-[#011b26] py-12 px-6 min-h-[50vh] flex items-center transition-colors duration-300" aria-labelledby="impact-heading">
            <div className="max-w-7xl mx-auto w-full">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-brand-orange text-[10px] font-black tracking-[0.3em] uppercase mb-3 block">
                        OUR IMPACT
                    </span>
                    <h2 id="impact-heading" className="text-2xl md:text-5xl text-[#011b26] dark:text-white mb-4 tracking-tight">
                        Impact at Scale
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
                        Numbers that speak to our dedication, reach, and enterprise impact.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {impacts.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-[#0a1f29] border border-slate-100 dark:border-white/5 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center h-full group"
                        >
                            <div className={`${item.bgColor} dark:bg-white/5 p-4 rounded-xl mb-6 transition-transform group-hover:scale-110`}>
                                {item.icon}
                            </div>
                            <div className="text-3xl md:text-4xl font-black text-[#011b26] dark:text-white mb-2">
                                <AnimatedCounter
                                    end={item.value}
                                    prefix={item.prefix}
                                    suffix={item.suffix}
                                />
                            </div>
                            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactAtScale;
