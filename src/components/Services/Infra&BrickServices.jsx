
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
    HardHat, ShoppingCart, Building2, Wifi, DollarSign,
    CheckCircle2, ChevronRight, ArrowRight,
    MapPin, LayoutDashboard, Clock, FileText,
    UserCheck, Package, CreditCard, TrendingDown,
    Home, BarChart2, Layers, MonitorSmartphone,
    Users, Activity, Eye, ShieldCheck,
    PieChart, Banknote, Receipt, LineChart
} from 'lucide-react';

/* ─── Scroll Animation Wrapper ─── */
const FadeUp = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ─── Section Label ─── */
const Label = ({ text, color = 'text-hpe-orange' }) => (
    <span className={`inline-block text-[10px] font-rajdhani font-black uppercase tracking-[0.55em] ${color}`}>
        {text}
    </span>
);

/* ─── Glass Panel ─── */
const Glass = ({ children, className = '', isDark }) => (
    <div className={`rounded-3xl transition-all duration-500 ${isDark
        ? 'bg-white/[0.05] backdrop-blur-2xl border border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
        : 'bg-white border border-slate-200 shadow-xl'
        } ${className}`}>
        {children}
    </div>
);

/* ─── Bullet Item ─── */
const Bullet = ({ text, isDark, accentColor = 'bg-hpe-orange' }) => (
    <li className="flex items-start gap-3">
        <span className={`mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full ${accentColor}`} />
        <span className={`text-sm font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {text}
        </span>
    </li>
);

/* ─── Service Module Card ─── */
const ServiceModule = ({ icon, title, label, bullets, result, isDark, index, accentBg, accentText, bulletColor }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
        >
            <Glass isDark={isDark} className="p-8 md:p-10 h-full group hover:scale-[1.01] hover:shadow-2xl transition-all duration-500">
                {/* Icon + Label Row */}
                <div className="flex items-start gap-5 mb-6">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${accentBg} group-hover:scale-110 transition-transform duration-500`}>
                        {React.cloneElement(icon, { className: 'w-7 h-7 text-white', strokeWidth: 1.5 })}
                    </div>
                    <div>
                        <Label text={label} color={accentText} />
                        <h3 className={`text-xl font-black uppercase tracking-tight mt-1 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Divider */}
                <div className={`w-full h-px mb-6 ${isDark ? 'bg-white/10' : 'bg-slate-100'}`} />

                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                    {bullets.map((b, i) => (
                        <Bullet key={i} text={b} isDark={isDark} accentColor={bulletColor} />
                    ))}
                </ul>

                {/* Result Tag */}
                {result && (
                    <div className={`mt-auto pt-4 border-t flex items-start gap-3 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                        <CheckCircle2 className="w-4 h-4 text-hpe-orange flex-shrink-0 mt-0.5" />
                        <p className={`text-xs font-semibold leading-snug ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {result}
                        </p>
                    </div>
                )}
            </Glass>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
const InfraBrickServices = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const modules = [
        {
            icon: <HardHat />,
            label: 'Project Digitization',
            title: 'Construction Project Digitization',
            accentBg: 'bg-hpe-orange',
            accentText: 'text-hpe-orange',
            bulletColor: 'bg-hpe-orange',
            bullets: [
                'Multi-Site Progress Tracking',
                'Centralized Project Dashboards',
                'Milestone & Timeline Monitoring',
                'Structured Reporting Protocols',
            ],
            result: 'Executive oversight across 120+ sites and multi-state infrastructure programs.',
        },
        {
            icon: <ShoppingCart />,
            label: 'Procurement Automation',
            title: 'Vendor & Procurement Automation',
            accentBg: 'bg-hpe-cyan',
            accentText: 'text-hpe-cyan',
            bulletColor: 'bg-hpe-cyan',
            bullets: [
                'Vendor Onboarding & Compliance Verification',
                'Material Requisition & Approval Workflows',
                'Invoice Processing & Billing Automation',
                'Centralized Financial Monitoring',
            ],
            result: 'Transparent procurement governance and reduced manual intervention.',
        },
        {
            icon: <Building2 />,
            label: 'Real Estate ERP',
            title: 'Real Estate ERP Systems',
            accentBg: 'bg-indigo-500',
            accentText: 'text-indigo-400',
            bulletColor: 'bg-indigo-400',
            bullets: [
                'Site Billing Modules',
                'Inventory & Material Tracking',
                'Cost Allocation & Multi-Project Consolidation',
                'Residential Unit Progress Monitoring',
            ],
            result: 'Designed to support high-volume housing and commercial developments.',
        },
        {
            icon: <Wifi />,
            label: 'IoT Monitoring',
            title: 'IoT-Based Site Monitoring Systems',
            accentBg: 'bg-emerald-500',
            accentText: 'text-emerald-400',
            bulletColor: 'bg-emerald-400',
            bullets: [
                'Workforce Attendance Tracking',
                'Productivity Analysis',
                'Remote Site Supervision',
                'Project Progress Validation',
            ],
            result: 'Digitally verifiable site execution with real-time transparency.',
        },
        {
            icon: <DollarSign />,
            label: 'Cost Control',
            title: 'Cost Control Platforms',
            accentBg: 'bg-amber-500',
            accentText: 'text-amber-400',
            bulletColor: 'bg-amber-400',
            bullets: [
                'Real-Time Material Usage Tracking',
                'Budget Variance Monitoring',
                'Vendor Payment Oversight',
                'Project-Level Cost Analytics',
            ],
            result: 'Ensuring disciplined capital deployment across infrastructure projects.',
        },
    ];

    const capabilities = [
        { icon: <MapPin className="w-5 h-5" />, label: 'Multi-Site Tracking' },
        { icon: <UserCheck className="w-5 h-5" />, label: 'Vendor Compliance' },
        { icon: <Package className="w-5 h-5" />, label: 'Material Management' },
        { icon: <Home className="w-5 h-5" />, label: 'Real Estate ERP' },
        { icon: <Wifi className="w-5 h-5" />, label: 'IoT Site Monitoring' },
        { icon: <PieChart className="w-5 h-5" />, label: 'Budget Variance Analytics' },
        { icon: <Eye className="w-5 h-5" />, label: 'Remote Supervision' },
        { icon: <Receipt className="w-5 h-5" />, label: 'Invoice Automation' },
    ];

    const stats = [
        { value: '120+', label: 'Sites Monitored', accent: 'text-hpe-orange' },
        { value: '100%', label: 'Digital Oversight', accent: 'text-hpe-cyan' },
        { value: 'Real-Time', label: 'Site Intelligence', accent: 'text-indigo-400' },
        { value: 'Zero', label: 'Manual Intervention', accent: 'text-emerald-400' },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#011b26] text-white' : 'bg-slate-50 text-slate-900'}`}>

            {/* ──────────────────────────────────────────
                HERO
            ────────────────────────────────────────── */}
            <section className="relative min-h-[60vh] flex items-center pt-36 pb-20 overflow-hidden bg-[#011b26]">
                {/* Background glow orbs */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-hpe-orange/10 rounded-full blur-[160px] -translate-y-1/3 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-hpe-cyan/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
                    {/* Subtle grid */}
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                </div>



                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-hpe-orange mb-4">Infrastructure & Brick Division</span>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-rajdhani font-semibold uppercase tracking-tight leading-[1.15] text-white mb-5">
                                Digitally Governed <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hpe-orange via-amber-300 to-hpe-cyan">
                                    Infrastructure
                                </span><br />
                                <span className="text-white">Execution</span>
                            </h1>
                            <p className="text-sm md:text-base text-slate-400 font-medium max-w-md leading-relaxed border-l-2 border-hpe-orange/40 pl-4">
                                This division integrates digital systems with physical infrastructure operations to create centrally monitored, performance-controlled environments.
                            </p>
                        </motion.div>

                        {/* Right: Animated visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="hidden lg:flex items-center justify-center"
                        >
                            {/* INFRASTRUCTURE: Rising Stacked Blocks */}
                            <div className="flex items-end gap-3 h-56">
                                {[
                                    { label: 'Cisco', h: 55, color: 'from-hpe-orange/50 to-hpe-orange/20', border: 'border-hpe-orange/40', delay: 0 },
                                    { label: 'RFID', h: 80, color: 'from-amber-400/50 to-amber-400/20', border: 'border-amber-400/40', delay: 0.15 },
                                    { label: 'AWS', h: 110, color: 'from-hpe-cyan/50 to-hpe-cyan/20', border: 'border-hpe-cyan/40', delay: 0.3 },
                                    { label: 'BI', h: 145, color: 'from-hpe-orange/60 to-hpe-orange/25', border: 'border-hpe-orange/50', delay: 0.45 },
                                    { label: 'ERP', h: 185, color: 'from-hpe-cyan/60 to-hpe-cyan/25', border: 'border-hpe-cyan/50', delay: 0.6 },
                                ].map((bar, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: bar.h, opacity: 1 }}
                                            transition={{ duration: 1.2, delay: bar.delay, ease: [0.22, 1, 0.36, 1] }}
                                            className={`w-12 rounded-t-xl bg-gradient-to-t ${bar.color} border ${bar.border} relative overflow-hidden`}
                                        >
                                            <motion.div
                                                animate={{ y: ['-100%', '200%'] }}
                                                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: bar.delay + 0.5 }}
                                                className="absolute inset-x-0 h-8 bg-gradient-to-b from-white/10 to-transparent"
                                            />
                                        </motion.div>
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: bar.delay + 0.8 }}
                                            className="text-[9px] font-black uppercase tracking-wide text-slate-500"
                                        >{bar.label}</motion.span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                STATS STRIP
            ────────────────────────────────────────── */}
            <section className={`py-12 ${isDark ? 'bg-[#011b26]' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className="text-center"
                            >
                                <p className={`text-3xl md:text-4xl font-black ${stat.accent}`}>{stat.value}</p>
                                <p className={`text-[11px] font-black uppercase tracking-widest mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                CAPABILITY BADGES STRIP
            ────────────────────────────────────────── */}
            <section className={`py-10 ${isDark ? 'bg-[#011b26]/50' : 'bg-slate-50'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {capabilities.map((cap, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06, duration: 0.5 }}
                                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 group cursor-default ${isDark
                                    ? 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-hpe-orange/30'
                                    : 'border-slate-100 bg-white hover:border-hpe-orange/40 hover:shadow-md'
                                    }`}
                            >
                                <span className="text-hpe-orange group-hover:text-hpe-cyan transition-colors duration-300">
                                    {cap.icon}
                                </span>
                                <span className={`text-[11px] font-black uppercase tracking-wide ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {cap.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                SERVICE MODULES (5 cards — 2+2+1 grid)
            ────────────────────────────────────────── */}
            <section className="py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <FadeUp delay={0}>
                        <div className="mb-16 max-w-2xl">
                            <Label text="Five Core Capabilities" color="text-hpe-orange" />
                            <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tight leading-tight mt-3 mb-4 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                Digitizing Every Dimension of Physical Infrastructure
                            </h2>
                            <div className="w-16 h-1 bg-hpe-orange rounded-full" />
                        </div>
                    </FadeUp>

                    {/* First row: 2 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {modules.slice(0, 2).map((mod, i) => (
                            <ServiceModule key={i} index={i} isDark={isDark} {...mod} />
                        ))}
                    </div>

                    {/* Second row: 2 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {modules.slice(2, 4).map((mod, i) => (
                            <ServiceModule key={i} index={i + 2} isDark={isDark} {...mod} />
                        ))}
                    </div>

                    {/* Third row: 1 centered card */}
                    <div className="max-w-2xl mx-auto">
                        <ServiceModule index={4} isDark={isDark} {...modules[4]} />
                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                WHY CHOOSE THIS DIVISION — Split
            ────────────────────────────────────────── */}
            <section className={`py-28 px-6 relative ${isDark ? 'bg-[#011b26]' : 'bg-slate-100/60'}`}>
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute left-0 top-0 w-1/2 h-full bg-hpe-orange/5 blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                        {/* Content - Top for mobile, Right for laptop */}
                        <FadeUp delay={0.15} className="lg:order-2 order-1">
                            <div className="space-y-8">
                                <div>
                                    <Label text="Operational Intelligence" color="text-hpe-cyan" />
                                    <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tight leading-tight mt-3 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                        Why HPE Infrastructure & Brick Services?
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { heading: 'Centralized Command', desc: 'Monitor 120+ active sites from a single digital command centre with real-time dashboards.' },
                                        { heading: 'IoT-Enabled Transparency', desc: 'Workforce attendance, productivity analysis, and remote supervision powered by smart sensor networks.' },
                                        { heading: 'Procurement Accountability', desc: 'Fully automated vendor onboarding, invoice processing and approval workflows eliminate revenue leakage.' },
                                        { heading: 'Real Estate ERP', desc: 'Specialized systems for billing, inventory, and residential unit progress built for high-volume developments.' },
                                        { heading: 'Disciplined Capital Deployment', desc: 'Budget variance monitoring and cost analytics ensure no project exceeds its financial mandate.' },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08, duration: 0.6 }}
                                            className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 group cursor-default ${isDark
                                                ? 'border-white/[0.07] hover:bg-white/[0.05] hover:border-hpe-orange/20'
                                                : 'border-slate-100 hover:bg-white hover:border-hpe-orange/30 bg-white/60'
                                                }`}
                                        >
                                            <span className="mt-1 flex-shrink-0">
                                                <CheckCircle2 className="w-5 h-5 text-hpe-orange" />
                                            </span>
                                            <div>
                                                <p className={`text-sm font-black uppercase tracking-wide ${isDark ? 'text-white' : 'text-[#011b26]'}`}>{item.heading}</p>
                                                <p className={`text-sm font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </FadeUp>

                        {/* Visual - Bottom for mobile, Left for laptop */}
                        <FadeUp delay={0} className="lg:order-1 order-2">
                            <div className="relative">
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                    <img
                                        src="/Service2.png"
                                        alt="Infrastructure & Brick Services"
                                        loading="lazy"
                                        className="w-full h-full object-cover scale-[1.02] hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#011b26] via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Floating Stat Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.7 }}
                                    className={`absolute -bottom-6 -right-6 p-5 rounded-2xl border shadow-2xl ${isDark
                                        ? 'bg-[#011b26]/90 border-white/10 backdrop-blur-xl'
                                        : 'bg-white border-slate-200'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-hpe-orange/20 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-hpe-orange" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-hpe-orange leading-none">120+</p>
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Active Sites</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default InfraBrickServices;
