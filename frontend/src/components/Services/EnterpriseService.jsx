import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
    Database, Code2, Cloud, BarChart3,
    CheckCircle2, ChevronRight, ArrowRight,
    ShoppingCart, DollarSign, FileText, ShieldCheck,
    Globe, HardDrive, RefreshCcw,
    LayoutDashboard, TrendingUp, MonitorSmartphone, Activity
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
                        {React.cloneElement(icon, { className: 'w-5 h-5 text-white', strokeWidth: 1.5 })}
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
const EnterpriseService = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const modules = [
        {
            icon: <Database />,
            label: 'ERP & Workflow',
            title: 'Enterprise Resource Planning & Workflow Automation',
            accentBg: 'bg-hpe-cyan',
            accentText: 'text-hpe-cyan',
            bulletColor: 'bg-hpe-cyan',
            bullets: [
                'Procurement & Vendor Management',
                'Financial Workflows & Approval Hierarchies',
                'Project Reporting & Site-Level Data Consolidation',
                'Compliance & Audit Monitoring',
            ],
            result: 'Executive-level dashboards, structured approval chains, and real-time operational intelligence across distributed entities.',
        },
        {
            icon: <Code2 />,
            label: 'App Development',
            title: 'Enterprise Application Development',
            accentBg: 'bg-hpe-orange',
            accentText: 'text-hpe-orange',
            bulletColor: 'bg-hpe-orange',
            bullets: [
                'Construction & Infrastructure Operations',
                'Vendor Automation Platforms',
                'Billing & Cost Control Systems',
                'Workforce Monitoring Interfaces',
            ],
            result: 'Engineered with secure access protocols, role-based authorization, and scalable architecture aligned with enterprise governance standards.',
        },
        {
            icon: <Cloud />,
            label: 'Cloud & Infra',
            title: 'Cloud & Infrastructure Management',
            accentBg: 'bg-indigo-500',
            accentText: 'text-indigo-400',
            bulletColor: 'bg-indigo-400',
            bullets: [
                'ERP Hosting Environments',
                'Enterprise Cloud Architecture',
                'Data Warehousing Systems',
                'Disaster Recovery & Backup Frameworks',
            ],
            result: 'Operational continuity, data security, and infrastructure resilience guaranteed at enterprise scale.',
        },
        {
            icon: <BarChart3 />,
            label: 'Data & Analytics',
            title: 'Data & Analytics Solutions',
            accentBg: 'bg-emerald-500',
            accentText: 'text-emerald-400',
            bulletColor: 'bg-emerald-400',
            bullets: [
                'Executive Dashboards',
                'KPI Monitoring Systems',
                'Real-Time Site Reporting',
                'Financial & Procurement Analytics',
            ],
            result: 'Structured decision-making driven by consolidated enterprise data.',
        },
    ];

    const stats = [
        { value: '4+', label: 'Core Divisions', accent: 'text-hpe-cyan' },
        { value: '100%', label: 'Internal Delivery', accent: 'text-hpe-orange' },
        { value: 'ISO', label: 'Certified Processes', accent: 'text-indigo-400' },
        { value: 'Multi-Site', label: 'Enterprise Scale', accent: 'text-emerald-400' },
    ];

    const capabilities = [
        { icon: <ShoppingCart className="w-5 h-5" />, label: 'Procurement Governance' },
        { icon: <DollarSign className="w-5 h-5" />, label: 'Financial Workflow Automation' },
        { icon: <FileText className="w-5 h-5" />, label: 'Compliance & Audit Monitoring' },
        { icon: <Globe className="w-5 h-5" />, label: 'Enterprise Cloud Hosting' },
        { icon: <HardDrive className="w-5 h-5" />, label: 'Data Warehousing' },
        { icon: <RefreshCcw className="w-5 h-5" />, label: 'Disaster Recovery' },
        { icon: <MonitorSmartphone className="w-5 h-5" />, label: 'Workforce Monitoring Apps' },
        { icon: <Activity className="w-5 h-5" />, label: 'Real-Time KPI Intelligence' },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#011b26] text-white' : 'bg-slate-50 text-slate-900'}`}>

            {/* ──────────────────────────────────────────
                HERO
            ────────────────────────────────────────── */}
            <section className="relative min-h-[60vh] flex items-center pt-36 pb-20 overflow-hidden bg-[#011b26]">
                {/* Background glow orbs */}
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
                            <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-hpe-cyan mb-4">Enterprise IT Division</span>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-rajdhani font-semibold uppercase tracking-tight leading-[1.15] text-white mb-5">
                                Enterprise <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hpe-cyan via-white/80 to-hpe-orange">
                                    Architecture,
                                </span><br />
                                <span className="text-white">Automation &<br />Digital Governance</span>
                            </h1>
                            <p className="text-sm md:text-base text-slate-400 font-medium max-w-md leading-relaxed border-l-2 border-hpe-cyan/40 pl-4">
                                The Enterprise IT Division designs, develops, and manages secure, scalable enterprise ecosystems supporting multi-entity and multi-location operations.
                            </p>
                        </motion.div>

                        {/* Right: Animated visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="hidden lg:flex items-center justify-center"
                        >
                            {/* ENTERPRISE: Floating Network Nodes */}
                            <div className="relative w-80 h-72">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 280">
                                    {/* Connection lines */}
                                    <motion.line x1="160" y1="140" x2="60" y2="60" stroke="rgba(0,200,200,0.25)" strokeWidth="1"
                                        animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0 }} />
                                    <motion.line x1="160" y1="140" x2="260" y2="60" stroke="rgba(0,200,200,0.25)" strokeWidth="1"
                                        animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }} />
                                    <motion.line x1="160" y1="140" x2="60" y2="220" stroke="rgba(255,140,0,0.2)" strokeWidth="1"
                                        animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 0.8 }} />
                                    <motion.line x1="160" y1="140" x2="260" y2="220" stroke="rgba(255,140,0,0.2)" strokeWidth="1"
                                        animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1.2 }} />
                                    <motion.line x1="60" y1="60" x2="260" y2="60" stroke="rgba(0,200,200,0.15)" strokeWidth="1"
                                        animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.6 }} />
                                    <motion.line x1="60" y1="220" x2="260" y2="220" stroke="rgba(255,140,0,0.15)" strokeWidth="1"
                                        animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }} />
                                </svg>
                                {/* Central hub */}
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 20px rgba(0,200,200,0.2)', '0 0 40px rgba(0,200,200,0.5)', '0 0 20px rgba(0,200,200,0.2)'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute w-14 h-14 rounded-2xl bg-gradient-to-br from-hpe-cyan/30 to-hpe-cyan/10 border border-hpe-cyan/50 flex items-center justify-center"
                                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                                >
                                    <svg className="w-6 h-6 text-hpe-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                                    </svg>
                                </motion.div>
                                {/* Satellite nodes */}
                                {[
                                    { x: '14%', y: '18%', delay: 0, color: 'hpe-cyan', label: 'React' },
                                    { x: '74%', y: '18%', delay: 0.3, color: 'hpe-cyan', label: 'Django' },
                                    { x: '14%', y: '72%', delay: 0.6, color: 'hpe-orange', label: 'AWS' },
                                    { x: '74%', y: '72%', delay: 0.9, color: 'hpe-orange', label: 'Docker' },
                                ].map((node, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 2.8 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
                                        className="absolute flex flex-col items-center gap-1"
                                        style={{ left: node.x, top: node.y }}
                                    >
                                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-[9px] font-black uppercase tracking-wide
                                            ${node.color === 'hpe-cyan'
                                                ? 'bg-hpe-cyan/15 border-hpe-cyan/40 text-hpe-cyan'
                                                : 'bg-hpe-orange/15 border-hpe-orange/40 text-hpe-orange'}`}>
                                            {node.label}
                                        </div>
                                    </motion.div>
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
                SERVICE MODULES (4 cards in 2-col grid)
            ────────────────────────────────────────── */}
            <section className="py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <FadeUp delay={0}>
                        <div className="mb-16 max-w-2xl">
                            <Label text="Core Capabilities" color="text-hpe-orange" />
                            <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight mt-3 mb-4 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                Four Pillars of Enterprise Digital Excellence
                            </h2>
                            <div className="w-16 h-1.5 bg-hpe-cyan rounded-full" />
                        </div>
                    </FadeUp>

                    {/* Module Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {modules.map((mod, i) => (
                            <ServiceModule
                                key={i}
                                index={i}
                                isDark={isDark}
                                {...mod}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                WHY CHOOSE US — Split Section
            ────────────────────────────────────────── */}
            <section className={`py-28 px-6 relative ${isDark ? 'bg-[#011b26]' : 'bg-slate-100/60'}`}>
                {/* Decorative background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-hpe-cyan/5 blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                        {/* Visual - Image on Right for Laptop, but bottom for mobile */}
                        <FadeUp delay={0.15} className="lg:order-2 order-2">
                            <div className="relative">
                                {/* Image */}
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                    <img
                                        src="/Service1.png"
                                        alt="Enterprise IT Services"
                                        loading="lazy"
                                        className="w-full h-full object-cover scale-[1.02] hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#011b26] via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Floating Stat Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.7 }}
                                    className={`absolute -bottom-6 -left-6 p-5 rounded-2xl border shadow-2xl ${isDark
                                        ? 'bg-[#011b26]/90 border-white/10 backdrop-blur-xl'
                                        : 'bg-white border-slate-200'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-hpe-cyan/20 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-hpe-cyan" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-hpe-cyan leading-none">100%</p>
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Internal Delivery</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FadeUp>

                        {/* Content - Text on Left for laptop, but top for mobile */}
                        <FadeUp delay={0} className="lg:order-1 order-1">
                            <div className="space-y-8">
                                <div>
                                    <Label text="Enterprise-Grade Commitment" color="text-hpe-cyan" />
                                    <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight mt-3 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                        Why HPE Enterprise IT?
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { heading: 'Zero Sub-Contracting', desc: '100% in-house delivery ensures consistent quality and accountability.' },
                                        { heading: 'Multi-Entity Architecture', desc: 'Designed for organizations spanning multiple business units and locations.' },
                                        { heading: 'Governance-First Design', desc: 'Every application and system is built with regulatory and audit compliance at its core.' },
                                        { heading: 'Scalable Digital Infrastructure', desc: 'Cloud and on-premises solutions that grow with your operational scope.' },
                                        { heading: 'ISO-Certified Processes', desc: 'Standardized development and delivery aligned with ISO 9001 & ISO 27001.' },
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
                    </div>
                </div>
            </section>

        </div>
    );
};

export default EnterpriseService;
