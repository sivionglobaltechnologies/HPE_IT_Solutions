import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
    Users, Wrench, FileText, Settings,
    CheckCircle2, ChevronRight, ArrowRight,
    HardHat, Cpu, UserCog, Shield,
    ClipboardList, ScrollText, BadgeCheck, Landmark,
    Server, MonitorDot, Cloud, Radio,
    MapPin, TrendingUp, PhoneCall
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
const Bullet = ({ text, isDark, accentColor = 'bg-hpe-cyan' }) => (
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
                        <CheckCircle2 className="w-4 h-4 text-hpe-cyan flex-shrink-0 mt-0.5" />
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
const WorkforceManagedServices = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const modules = [
        {
            icon: <Users />,
            label: 'Manpower Deployment',
            title: 'Pan-India Manpower Deployment',
            accentBg: 'bg-hpe-cyan',
            accentText: 'text-hpe-cyan',
            bulletColor: 'bg-hpe-cyan',
            bullets: [
                'Field & Infrastructure Experts',
                'Technical Engineers',
                'Project & Regional Managers',
                'Site-Level Supervisory Teams',
            ],
            result: 'Deployed across 45+ active construction zones under centralized allocation systems.',
        },
        {
            icon: <Wrench />,
            label: 'Technical Support',
            title: 'Field Engineering & Technical Support',
            accentBg: 'bg-hpe-orange',
            accentText: 'text-hpe-orange',
            bulletColor: 'bg-hpe-orange',
            bullets: [
                'ERP Deployment Support',
                'Infrastructure Supervision',
                'System Implementation & Monitoring',
                'IT Infrastructure Maintenance',
            ],
            result: 'All services operate under defined service protocols and reporting standards.',
        },
        {
            icon: <FileText />,
            label: 'Back-Office Ops',
            title: 'Back-Office & Compliance Operations',
            accentBg: 'bg-indigo-500',
            accentText: 'text-indigo-400',
            bulletColor: 'bg-indigo-400',
            bullets: [
                'Documentation & Record Governance',
                'Vendor Contract Administration',
                'Regulatory & Compliance Monitoring',
                'Financial Workflow Assistance',
            ],
            result: 'Ensuring audit readiness and structured operational reporting.',
        },
        {
            icon: <Settings />,
            label: 'AMC Programs',
            title: 'Annual Maintenance Contracts (AMC)',
            accentBg: 'bg-emerald-500',
            accentText: 'text-emerald-400',
            bulletColor: 'bg-emerald-400',
            bullets: [
                'Enterprise ERP Systems',
                'Infrastructure Monitoring Platforms',
                'Cloud & IT Environments',
                'Technical Site Systems',
            ],
            result: 'Preventive maintenance, issue resolution, and operational continuity — 24/7.',
        },
    ];

    const capabilities = [
        { icon: <HardHat className="w-5 h-5" />, label: 'Field Deployment' },
        { icon: <Cpu className="w-5 h-5" />, label: 'Technical Engineering' },
        { icon: <UserCog className="w-5 h-5" />, label: 'Project Management' },
        { icon: <ClipboardList className="w-5 h-5" />, label: 'Record Governance' },
        { icon: <ScrollText className="w-5 h-5" />, label: 'Vendor Contracts' },
        { icon: <BadgeCheck className="w-5 h-5" />, label: 'Compliance Monitoring' },
        { icon: <Server className="w-5 h-5" />, label: 'ERP Maintenance' },
        { icon: <Radio className="w-5 h-5" />, label: '24/7 AMC Support' },
    ];

    const stats = [
        { value: '2000+', label: 'Employees Deployed', accent: 'text-hpe-cyan' },
        { value: '45+', label: 'Active Zones', accent: 'text-hpe-orange' },
        { value: 'Pan-India', label: 'National Footprint', accent: 'text-indigo-400' },
        { value: '24/7', label: 'AMC Operations', accent: 'text-emerald-400' },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#011b26] text-white' : 'bg-slate-50 text-slate-900'}`}>

            {/* ──────────────────────────────────────────
                HERO
            ────────────────────────────────────────── */}
            <section className="relative min-h-[60vh] flex items-center pt-36 pb-20 overflow-hidden bg-[#011b26]">
                {/* Background glows */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-hpe-cyan/10 rounded-full blur-[160px] -translate-y-1/3 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-hpe-orange/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
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
                            <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-hpe-cyan mb-4">Workforce & Managed Services</span>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-rajdhani font-semibold uppercase tracking-tight leading-[1.15] text-white mb-5">
                                Structured <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hpe-cyan via-white/80 to-hpe-orange">
                                    National Execution
                                </span><br />
                                <span className="text-white">& Operational Support</span>
                            </h1>
                            <p className="text-sm md:text-base text-slate-400 font-medium max-w-md leading-relaxed border-l-2 border-hpe-cyan/40 pl-4">
                                With 2000+ employees deployed across India, HPE IT Solutions operates a centralized workforce governance framework aligned with enterprise execution standards.
                            </p>
                        </motion.div>

                        {/* Right: Animated visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="hidden lg:flex items-center justify-center"
                        >
                            {/* WORKFORCE: Radiating Deployment Map */}
                            <div className="relative w-72 h-72">
                                {/* Radiating pulse rings */}
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [0.4, 1.6], opacity: [0.6, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: i * 1 }}
                                        className="absolute inset-0 rounded-full border border-hpe-cyan/40"
                                        style={{ margin: 'auto', width: '100%', height: '100%' }}
                                    />
                                ))}
                                {/* Pan-India label */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.06, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-hpe-cyan/30 to-indigo-500/20 border-2 border-hpe-cyan/50 flex items-center justify-center shadow-[0_0_40px_rgba(0,200,200,0.3)]"
                                    >
                                        <svg className="w-7 h-7 text-hpe-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </motion.div>
                                </div>
                                {/* Deployment zone dots */}
                                {[
                                    { angle: 30, r: 90, label: 'GPS', sub: 'Tracking' },
                                    { angle: 110, r: 85, label: 'ITSM', sub: 'ServiceNow' },
                                    { angle: 200, r: 90, label: 'NOC', sub: 'Monitoring' },
                                    { angle: 290, r: 80, label: 'Fleet', sub: 'App' },
                                ].map((dot, i) => {
                                    const rad = (dot.angle * Math.PI) / 180;
                                    const cx = 144 + dot.r * Math.cos(rad);
                                    const cy = 144 + dot.r * Math.sin(rad);
                                    return (
                                        <motion.div
                                            key={i}
                                            animate={{ scale: [1, 1.15, 1] }}
                                            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                                            className="absolute flex flex-col items-center"
                                            style={{ left: cx - 20, top: cy - 20, width: 40 }}
                                        >
                                            <div className="w-2 h-2 rounded-full bg-hpe-cyan shadow-[0_0_6px_rgba(0,200,200,0.8)] mb-0.5" />
                                            <span className="text-[8px] font-black text-hpe-cyan leading-tight">{dot.label}</span>
                                            <span className="text-[7px] text-slate-500 uppercase tracking-wide">{dot.sub}</span>
                                        </motion.div>
                                    );
                                })}
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
                CAPABILITY BADGES
            ────────────────────────────────────────── */}
            <section className={`py-10 ${isDark ? 'bg-[#011b26]' : 'bg-slate-50'}`}>
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
                                    ? 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-hpe-cyan/30'
                                    : 'border-slate-100 bg-white hover:border-hpe-cyan/40 hover:shadow-md'
                                    }`}
                            >
                                <span className="text-hpe-cyan group-hover:text-hpe-orange transition-colors duration-300">
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
                SERVICE MODULES (2+2 grid)
            ────────────────────────────────────────── */}
            <section className={`py-28 px-6 ${isDark ? 'bg-[#011b26]' : ''}`}>
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <FadeUp delay={0}>
                        <div className="mb-16 max-w-2xl">
                            <Label text="Four Core Programs" color="text-hpe-orange" />
                            <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tight leading-tight mt-3 mb-4 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                Governing People, Processes & Continuity at National Scale
                            </h2>
                            <div className="w-16 h-1 bg-hpe-cyan rounded-full" />
                        </div>
                    </FadeUp>

                    {/* First row: 2 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {modules.slice(0, 2).map((mod, i) => (
                            <ServiceModule key={i} index={i} isDark={isDark} {...mod} />
                        ))}
                    </div>

                    {/* Second row: 2 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {modules.slice(2, 4).map((mod, i) => (
                            <ServiceModule key={i} index={i + 2} isDark={isDark} {...mod} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                WHY CHOOSE — Split Section
            ────────────────────────────────────────── */}
            <section className={`py-28 px-6 relative ${isDark ? 'bg-[#011b26]' : 'bg-slate-100/60'}`}>
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-hpe-cyan/5 blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Content */}
                        <FadeUp delay={0.15}>
                            <div className="space-y-8">
                                <div>
                                    <Label text="Workforce Excellence" color="text-hpe-cyan" />
                                    <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tight leading-tight mt-3 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                        Why HPE Workforce & Managed Services?
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { heading: 'Centralised Workforce Governance', desc: '2000+ professionals governed under a single allocation and compliance framework.' },
                                        { heading: 'Pan-India Deployment', desc: 'Engineers, managers and supervisors active across 45+ construction and infrastructure zones.' },
                                        { heading: 'Protocol-Driven Execution', desc: 'Every field engagement operates under structured service protocols with formal reporting standards.' },
                                        { heading: 'Audit-Ready Back Office', desc: 'Documentation, vendor administration and regulatory monitoring ensure continuous audit readiness.' },
                                        { heading: 'Preventive AMC Programs', desc: '24/7 maintenance contracts covering ERP, cloud, and infrastructure with zero-downtime commitment.' },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08, duration: 0.6 }}
                                            className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 group cursor-default ${isDark
                                                ? 'border-white/[0.07] hover:bg-white/[0.05] hover:border-hpe-cyan/20'
                                                : 'border-slate-100 hover:bg-white hover:border-hpe-cyan/30 bg-white/60'
                                                }`}
                                        >
                                            <span className="mt-1 flex-shrink-0">
                                                <CheckCircle2 className="w-5 h-5 text-hpe-cyan" />
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

                        {/* Right: Image */}
                        <FadeUp delay={0}>
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
                                <img
                                    src="/service3.png"
                                    alt="Workforce & Managed Services"
                                    loading="lazy"
                                    className="w-full h-full object-cover scale-[1.02] hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#011b26]/60 via-transparent to-transparent" />
                            </div>
                        </FadeUp>

                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                NATIONAL FOOTPRINT BANNER
            ────────────────────────────────────────── */}
            <section className="py-16 px-6 bg-[#011b26] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-hpe-cyan/10 blur-[80px] rounded-full" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <FadeUp delay={0}>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-hpe-cyan/15 flex items-center justify-center border border-hpe-cyan/20 flex-shrink-0">
                                    <MapPin className="w-7 h-7 text-hpe-cyan" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase mb-1">National Footprint</p>
                                    <p className="text-2xl font-black text-white">45+ Active Deployment Zones Across India</p>
                                </div>
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.2}>
                            <div className="flex items-center gap-6">
                                {[
                                    { icon: <Users className="w-5 h-5" />, val: '2000+', sub: 'Employees', color: 'text-hpe-cyan' },
                                    { icon: <MapPin className="w-5 h-5" />, val: '45+', sub: 'Zones', color: 'text-hpe-orange' },
                                    { icon: <Settings className="w-5 h-5" />, val: '24/7', sub: 'AMC', color: 'text-hpe-cyan' },
                                ].map((item, i) => (
                                    <div key={i} className={`flex flex-col items-center gap-1 px-6 ${i < 2 ? 'border-r border-white/10' : ''}`}>
                                        <span className={item.color}>{item.icon}</span>
                                        <span className="text-xl font-black text-white">{item.val}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.sub}</span>
                                    </div>
                                ))}
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default WorkforceManagedServices;
