import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    TrendingUp,
    Users,
    Handshake,
    Cpu,
    ArrowUpRight,
    Globe,
    Building2,
    BarChart3
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FadeUp = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const GrowthChart = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Data points for the chart: Years 2024 to 2028 (projected)
    const data = [
        { year: '2020', val: 100, label: 'Baseline' },
        { year: '2021', val: 125, label: '+25%' },
        { year: '2022', val: 160, label: '+60%' },
        { year: '2023', val: 210, label: '+110%' },
        { year: '2024', val: 280, label: '+180%' },
        { year: '2025', val: 350, label: 'Target' },
    ];

    const maxVal = Math.max(...data.map(d => d.val));

    return (
        <div className={`p-8 md:p-12 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 ${isDark ? 'bg-white/[0.03] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
            }`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                    <span className="text-brand-orange text-[10px] font-black tracking-[0.3em] uppercase mb-3 block">Projection 2020-2025</span>
                    <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Projected <span className="text-brand-cyan">Revenue Growth</span>
                    </h3>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand-cyan" />
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Market Reach</span>
                    </div>
                </div>
            </div>

            <div className="relative h-72 flex items-end justify-between gap-2 md:gap-4 px-2">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none opacity-[0.05]">
                    {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-full h-px ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
                    ))}
                </div>

                {data.map((item, idx) => (
                    <div key={item.year} className="relative flex-grow flex flex-col items-center group h-full justify-end">
                        {/* Value Label (Top) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + idx * 0.1 }}
                            className="mb-4"
                        >
                            <span className={`text-[11px] font-black tracking-tight ${idx === data.length - 1 ? 'text-brand-orange' : 'text-brand-cyan'}`}>
                                {item.val}%
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${(item.val / maxVal) * 80}%` }}
                            transition={{ duration: 1.5, delay: idx * 0.1, ease: [0.33, 1, 0.68, 1] }}
                            viewport={{ once: true }}
                            className="w-full max-w-[45px] relative rounded-t-xl overflow-hidden shadow-lg group-hover:shadow-brand-cyan/20 transition-shadow duration-500"
                            style={{
                                background: idx === data.length - 1
                                    ? 'linear-gradient(to top, #ff8a00, #ffb800)'
                                    : 'linear-gradient(to top, #00b0d4, #00e5ff)'
                                ,
                                opacity: idx === data.length - 1 ? 1 : 0.7
                            }}
                        >
                            {/* Glossy Overlay */}
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                        </motion.div>

                        <div className="mt-6 text-center">
                            <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.year}</p>
                            <p className={`text-[8px] font-bold uppercase tracking-[0.2em] mt-1.5 ${idx === data.length - 1 ? 'text-brand-orange' : isDark ? 'text-white/30' : 'text-slate-400'
                                }`}>{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`mt-16 pt-8 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <p className={`text-[10px] md:text-xs font-medium leading-relaxed max-w-2xl uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-slate-500'}`}>
                    *Projected compounding annual growth rate (CAGR) based on strategic expansion mandates in Tier-2/3 cities and increased workforce lifecycle capacity.
                </p>
            </div>
        </div>
    );
};

const StrategyCard = ({ icon: Icon, title, description, delay, accent, index }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <FadeUp delay={delay} className="h-full">
            <div className={`h-full p-8 md:p-9 rounded-2xl border transition-all duration-500 group relative overflow-hidden ${isDark
                ? 'bg-white/[0.03] border-white/10 hover:border-brand-cyan/40'
                : 'bg-white border-slate-200 hover:shadow-2xl shadow-slate-200/50 hover:border-brand-orange/40'
                }`}>

                {/* Background Number */}
                <div className={`absolute top-6 right-8 text-7xl md:text-8xl font-black transition-colors duration-500 pointer-events-none select-none z-0 ${isDark ? 'text-white/[0.03]' : 'text-slate-900/[0.03]'
                    }`}>
                    {`0${index + 1}`}
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
                    {/* Icon Container */}
                    <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${isDark ? 'bg-white/[0.05] text-brand-cyan' : 'bg-slate-100 text-brand-orange'
                        }`}>
                        <Icon size={24} strokeWidth={1.5} />
                    </div>

                    <div className="space-y-4">
                        <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {title}
                        </h3>

                        <p className={`text-[13px] md:text-sm font-medium leading-[1.6] ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                            {description}
                        </p>
                    </div>
                </div>

                {/* Bottom line accent */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${isDark ? 'from-brand-cyan to-blue-600' : 'from-brand-orange to-red-500'
                    }`} />
            </div>
        </FadeUp>
    );
};

const GrowthStrategy = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const strategies = [
        {
            icon: Globe,
            title: "Multi-City Delivery",
            description: "Executing precise geographical expansion into emerging economic hubs. Establishing high-performance delivery nodes in 25+ new cities to support national mandates.",
            delay: 0.1
        },
        {
            icon: Users,
            title: "Workforce Scale-Up",
            description: "Scaling human capital through structured institutional training. Targeting a 350% increase in field engineering depth and technical roles by 2025.",
            delay: 0.2
        },
        {
            icon: Handshake,
            title: "Enterprise Strategy",
            description: "Cultivating long-term alliances and public-sector integrations. Focused on large-scale infrastructure modernization and digital transformation.",
            delay: 0.3
        },
        {
            icon: Cpu,
            title: "Tech Infrastructure",
            description: "Deepening investment in data-driven operations. Implementing AI-assisted site monitoring, centralized ROC systems, and next-gen IoT deployment.",
            delay: 0.4
        },
        {
            icon: Building2,
            title: "Unified Brand Lifecycle",
            description: "BPO, IT, and HRMS operations unified under a single management layer. No vendor sprawl, cleaner accountability, and 100% governance.",
            delay: 0.5
        },
        {
            icon: TrendingUp,
            title: "Quality Benchmarking",
            description: "Zero-compromise institutional oversight. Implementing ISO-grade quality frameworks and 24/7 governance for critical national infrastructure projects.",
            delay: 0.6
        }
    ];

    return (
        <article className={`transition-colors duration-500 overflow-x-hidden font-sans ${isDark ? 'bg-[#0a0f1e] text-white' : 'bg-[#f8fafc] text-slate-900'}`}>

            {/* --- HERO SECTION --- */}
            <section className="relative w-full pt-24 pb-10 md:pt-32 md:pb-12 bg-[#011b26] flex items-center overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-8 relative z-10 w-full grid lg:grid-cols-12 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-7 space-y-5"
                    >
                        <span className="inline-block text-[10px] font-black uppercase tracking-[0.55em] text-brand-orange">
                            Forward Momentum · Horizon 2025
                        </span>

                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight leading-[1.1] text-white">
                            Growth &amp; <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-orange">
                                Expansion
                            </span> Strategy
                        </h1>

                        <div className="w-14 h-1 bg-brand-cyan rounded-full" />

                        <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
                            HPE IT Solutions is navigating a high-velocity expansion roadmap, focused on national reach, institutional capability, and next-gen technological infrastructure.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative group"
                    >
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[350px] md:h-[400px]">
                            <img
                                src="/growthstrategy.png"
                                alt="Growth Strategy"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                        </div>
                        {/* Decorative blur behind image */}
                        <div className="absolute -inset-4 bg-brand-cyan/20 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </motion.div>
                </div>
            </section>

            <div className={`h-12 w-full ${isDark ? 'bg-[#0a0f1e]' : 'bg-white'}`} />

            {/* --- STRATEGY GRID --- */}
            <section className="px-8 md:px-16 py-24 relative overflow-hidden bg-[url('https://grain-y.com/assets/img/grid-light.png')] dark:bg-[url('https://grain-y.com/assets/img/grid.png')] bg-repeat">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {strategies.map((strat, i) => (
                            <StrategyCard key={i} index={i} {...strat} />
                        ))}
                    </div>

                    {/* --- PROJECTED GROWTH GRAPH --- */}
                    <FadeUp delay={0.5} className="mt-12">
                        <GrowthChart />
                    </FadeUp>
                </div>
            </section>

            {/* --- CTA / FOOTER TAG --- */}
            <section className="px-8 md:px-16 pb-32">
                <FadeUp className="max-w-7xl mx-auto">
                    <div className={`p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-slate-900 text-white'
                        }`}>
                        <Building2 className={`w-24 h-24 absolute -top-4 -right-4 opacity-5 ${isDark ? 'text-white' : 'text-brand-cyan'}`} strokeWidth={0.5} />

                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <BarChart3 className="mx-auto text-brand-orange w-12 h-12" strokeWidth={1} />
                            <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-white'}`}>
                                Defining the Future of <br />
                                Infrastructure <span className="text-brand-cyan">Governance</span>
                            </h2>
                            <p className={`text-lg font-medium leading-relaxed ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                                Our growth is backed by disciplined governance and a commitment to delivering uncompromising institutional value at national scale.
                            </p>

                        </div>
                    </div>
                </FadeUp>
            </section>

        </article>
    );
};

export default GrowthStrategy;
