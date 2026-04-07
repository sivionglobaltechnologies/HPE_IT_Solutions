import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
    Database, Building2, Users,
    CheckCircle2, ArrowRight, ChevronRight,
    Code2, Cloud, BarChart3,
    HardHat, Wifi, DollarSign,
    Wrench, FileText, Settings,
    Headphones, Shield, Activity
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
    <span className={`inline-block text-[10px] font-black uppercase tracking-[0.55em] ${color}`}>
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

/* ─── Service Division Card ─── */
const DivisionCard = ({
    divisionNo, route, Icon, label, title, tagline, description,
    highlights, accentFrom, accentTo, glowColor, isDark, index
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link to={route} className="block group h-full">
                <Glass isDark={isDark} className="p-6 md:p-7 h-full relative overflow-hidden hover:scale-[1.015] hover:shadow-2xl transition-all duration-500 cursor-pointer">

                    {/* Glow blob on hover */}
                    <div className={`absolute -top-20 -right-24 w-64 h-64 ${glowColor} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                    {/* Top Row: Division No + Icon */}
                    <div className="flex items-start justify-between mb-5 relative z-10">
                        <div>
                            <Label text={`Division ${divisionNo}`} color="text-slate-500" />
                            <h3 className={`text-lg md:text-xl font-rajdhani font-black uppercase tracking-tight leading-tight mt-1 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                {title}
                            </h3>
                        </div>
                        <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${accentFrom} ${accentTo} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                            <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Tag pill */}
                    <div className="mb-4 relative z-10">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-[0.2em] uppercase ${isDark
                            ? 'bg-white/[0.06] text-slate-400 border border-white/10'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                            <span className="w-1 h-1 rounded-full bg-hpe-cyan inline-block animate-pulse" />
                            {label}
                        </span>
                    </div>

                    {/* Tagline */}
                    <p className={`text-[11px] font-black uppercase tracking-wide mb-3 relative z-10 ${isDark ? 'text-hpe-cyan' : 'text-hpe-cyan-dark'}`}>
                        {tagline}
                    </p>

                    {/* Description */}
                    <p className={`text-[12px] font-medium leading-relaxed mb-5 relative z-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {description}
                    </p>

                    {/* Divider */}
                    <div className={`w-full h-px mb-5 relative z-10 ${isDark ? 'bg-white/10' : 'bg-slate-100'}`} />

                    {/* Highlights */}
                    <ul className="grid grid-cols-1 gap-2 mb-6 relative z-10">
                        {highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-hpe-cyan flex-shrink-0" />
                                <span className={`text-[11px] font-medium leading-tight ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{h}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Link */}
                    <div className="relative z-10">
                        <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-hpe-orange group-hover:gap-3 transition-all duration-300`}>
                            Explore Division
                            <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </div>

                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${accentFrom} ${accentTo} group-hover:w-full transition-all duration-700 rounded-b-3xl`} />
                </Glass>
            </Link>
        </motion.div>
    );
};

/* ─── Service Excellence Section ─── */
const ServiceExcellence = ({ isDark }) => {
    const items = [
        {
            id: 'support',
            title: 'National Support Network',
            icon: Headphones,
            desc: 'A robust, pan-India technical support layer ensuring rapid response and on-ground assistance across all 45+ operational zones.'
        },
        {
            id: 'amc',
            title: 'Annual Maintenance (AMC)',
            icon: Shield,
            desc: 'Comprehensive lifecycle management and 24/7 preventative maintenance programs for mission-critical IT and physical infrastructure.'
        },
        {
            id: 'consulting',
            title: 'Consulting & Strategy',
            icon: Activity,
            desc: 'Strategic technology roadmapping and infrastructure governance consulting to align digital investments with long-term business objectives.'
        }
    ];

    return (
        <section className={`py-24 px-6 ${isDark ? 'bg-[#011b26]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto">
                <FadeUp>
                    <div className="mb-16">
                        <Label text="Operational Quality" color="text-hpe-orange" />
                        <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tight mt-3 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                            Service Excellence
                        </h2>
                    </div>
                </FadeUp>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {items.map((item, i) => (
                        <FadeUp key={i} delay={i * 0.15}>
                            <div className={`p-10 rounded-[2.5rem] border ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'} relative overflow-hidden group`}>
                                <div className={`w-14 h-14 rounded-2xl ${isDark ? 'bg-hpe-cyan/10' : 'bg-hpe-cyan/5'} flex items-center justify-center mb-8 border ${isDark ? 'border-hpe-cyan/20' : 'border-hpe-cyan/10'}`}>
                                    <item.icon className={`w-7 h-7 ${isDark ? 'text-hpe-cyan' : 'text-hpe-cyan-dark'}`} strokeWidth={1.5} />
                                </div>
                                <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight mb-5 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                    {item.title}
                                </h3>
                                <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {item.desc}
                                </p>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
const ServicesPage = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const divisions = [
        {
            divisionNo: '01',
            route: '/services/enterprise',
            Icon: Database,
            label: 'Enterprise IT Services',
            title: 'Enterprise Architecture & Governance',
            tagline: 'ERP · Cloud · Analytics · Apps',
            description: 'Designing secure, scalable enterprise ecosystems supporting multi-entity and multi-location operations.',
            highlights: [
                'ERP & Workflow Automation',
                'Enterprise App Development',
                'Infrastructure Management',
                'Real-Time KPI Intelligence',
            ],
            accentFrom: 'from-hpe-cyan',
            accentTo: 'to-indigo-500',
            glowColor: 'bg-hpe-cyan/20',
        },
        {
            divisionNo: '02',
            route: '/services/infrastructure',
            Icon: Building2,
            label: 'Infrastructure & Brick Services',
            title: 'Governed Infrastructure Execution',
            tagline: 'Construction · Procurement · IoT',
            description: 'Integrating digital systems with physical infrastructure for centrally monitored, performance-controlled environments.',
            highlights: [
                'Construction Project Digitization',
                'Vendor & Procurement Automation',
                'Real Estate ERP Systems',
                'IoT-Based Site Monitoring',
            ],
            accentFrom: 'from-hpe-orange',
            accentTo: 'to-amber-400',
            glowColor: 'bg-hpe-orange/20',
        },
        {
            divisionNo: '03',
            route: '/services/workforce',
            Icon: Users,
            label: 'Workforce & Managed Services',
            title: 'National Execution & Operations',
            tagline: 'Manpower · Engineering · AMC',
            description: 'Centralized workforce governance managing field engineers and technical teams across 45+ national zones.',
            highlights: [
                'Pan-India Manpower Deployment',
                'Field Engineering Support',
                'Operational Compliance',
                '24/7 Managed AMC Support',
            ],
            accentFrom: 'from-hpe-cyan',
            accentTo: 'to-emerald-400',
            glowColor: 'bg-emerald-400/20',
        },
    ];

    const globalStats = [
        { value: '2000+', label: 'Professionals', accent: 'text-hpe-cyan' },
        { value: '120+', label: 'Sites Monitored', accent: 'text-hpe-orange' },
        { value: '45+', label: 'Active Zones', accent: 'text-indigo-400' },
        { value: '3', label: 'Service Divisions', accent: 'text-emerald-400' },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#011b26] text-white' : 'bg-slate-50 text-slate-900'}`}>

            {/* ──────────────────────────────────────────
                HERO
            ────────────────────────────────────────── */}
            <section className="relative min-h-[55vh] flex items-center pt-40 pb-16 overflow-hidden bg-[#011b26]">
                {/* Background glows */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-hpe-cyan/8 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hpe-orange/8 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                </div>

                {/* Right-side floating image */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block w-1/2 h-full z-0 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full h-full flex items-center justify-center p-12"
                    >
                        <img
                            src="/ServiceDivisions.png"
                            alt="HPE Service Divisions Architecture"
                            loading="lazy"
                            className="max-w-full max-h-full object-contain drop-shadow-[0_0_50px_rgba(0,176,212,0.15)]"
                            style={{ clipPath: 'inset(0 0 30px 0)' }}
                        />
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="max-w-3xl">




                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rajdhani font-black uppercase tracking-tighter leading-[1.05] text-white mb-6"
                        >
                            Our Service <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hpe-cyan via-white/70 to-hpe-orange">
                                Divisions
                            </span>
                        </motion.h1>

                        {/* Sub */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-sm md:text-base text-slate-400 font-medium max-w-2xl leading-relaxed border-l-2 border-hpe-cyan/40 pl-5 mb-8"
                        >
                            HPE IT Solutions operates three integrated service divisions — delivering enterprise technology, infrastructure digitization, and national workforce governance as a unified, governance-ready ecosystem.
                        </motion.p>


                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                STATS STRIP
            ────────────────────────────────────────── */}
            <section className={`py-10 ${isDark ? 'bg-[#011b26]' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {globalStats.map((stat, i) => (
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
                THREE DIVISION CARDS
            ────────────────────────────────────────── */}
            <section id="divisions" className="py-16 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <FadeUp delay={0}>
                        <div className="mb-16 max-w-2xl">
                            <Label text="Service Architecture" color="text-hpe-orange" />
                            <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tight leading-tight mt-3 mb-4 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                Three Divisions. One Integrated Vision.
                            </h2>
                            <div className="w-16 h-1 bg-hpe-cyan rounded-full" />
                        </div>
                    </FadeUp>

                    {/* Division cards grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {divisions.map((div, i) => (
                            <DivisionCard key={i} index={i} isDark={isDark} {...div} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                SERVICE EXCELLENCE
            ────────────────────────────────────────── */}
            <ServiceExcellence isDark={isDark} />

            {/* ──────────────────────────────────────────
                INTEGRATION SECTION — How they work together
            ────────────────────────────────────────── */}
            <section className={`py-20 px-6 relative ${isDark ? 'bg-[#011b26]' : 'bg-slate-100/60'}`}>
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-hpe-cyan/5 blur-[120px]" />
                    <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-hpe-orange/5 blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <FadeUp delay={0}>
                        <div className="text-center mb-12">
                            <Label text="Integrated Delivery" color="text-hpe-cyan" />
                            <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tight leading-tight mt-3 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                How Our Divisions Work Together
                            </h2>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Database className="w-8 h-8" />,
                                step: '01',
                                title: 'Digital Systems',
                                desc: 'Enterprise IT builds the ERP backbone — centralizing data, automating approvals, and creating the intelligence layer for the entire operation.',
                                accent: 'text-hpe-cyan',
                                border: 'border-hpe-cyan/20',
                                bg: 'bg-hpe-cyan/10',
                            },
                            {
                                icon: <Building2 className="w-8 h-8" />,
                                step: '02',
                                title: 'Physical Execution',
                                desc: 'Infrastructure & Brick connects those digital systems to real-world sites — digitizing procurement, site monitoring, and cost control across 120+ locations.',
                                accent: 'text-hpe-orange',
                                border: 'border-hpe-orange/20',
                                bg: 'bg-hpe-orange/10',
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                step: '03',
                                title: 'Workforce & Continuity',
                                desc: 'Workforce & Managed Services deploys 2000+ professionals to operate within those systems and environments — maintaining continuity through 24/7 AMC programs.',
                                accent: 'text-emerald-400',
                                border: 'border-emerald-400/20',
                                bg: 'bg-emerald-400/10',
                            },
                        ].map((item, i) => (
                            <FadeUp key={i} delay={i * 0.15}>
                                <div className={`relative p-8 rounded-3xl border ${item.border} ${isDark ? 'bg-white/[0.03]' : 'bg-white'} h-full group hover:scale-[1.015] transition-all duration-500`}>
                                    {/* Step number */}
                                    <p className={`text-[10px] font-black tracking-[0.5em] uppercase mb-5 ${item.accent}`}>Step {item.step}</p>

                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 ${item.accent} group-hover:scale-110 transition-transform duration-500`}>
                                        {item.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className={`text-xl font-black uppercase tracking-tight mb-3 ${isDark ? 'text-white' : 'text-[#011b26]'}`}>{item.title}</h3>
                                    <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>

                                    {/* connector arrow — hidden on last item */}
                                    {i < 2 && (
                                        <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                                            <ChevronRight className={`w-8 h-8 ${item.accent} opacity-30`} />
                                        </div>
                                    )}
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────
                CTA
            ────────────────────────────────────────── */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative overflow-hidden rounded-[3rem] border p-12 md:p-20 text-center ${isDark
                            ? 'bg-white/[0.03] border-white/10'
                            : 'bg-white border-slate-200 shadow-2xl'
                            }`}
                    >
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-hpe-cyan/15 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-hpe-orange/15 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 space-y-6">
                            <Label text="Partner With Us" color="text-hpe-orange" />
                            <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#011b26]'}`}>
                                Ready to Build With <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hpe-cyan to-hpe-orange">
                                    HPE IT Solutions?
                                </span>
                            </h2>
                            <p className={`text-sm md:text-base font-medium max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Whether you need enterprise systems, on-ground infrastructure digitization, or a governed national workforce — we deliver end-to-end.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
                                <Link to="/contact#contact-grid" className="w-full sm:w-auto px-10 py-4 bg-hpe-orange text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-full shadow-xl shadow-hpe-orange/20 hover:bg-white hover:text-[#011b26] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group">
                                    Start a Conversation
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/about" className={`w-full sm:w-auto px-10 py-4 border-2 font-black text-[11px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${isDark
                                    ? 'border-white/20 text-white hover:border-hpe-cyan hover:text-hpe-cyan'
                                    : 'border-slate-200 text-slate-600 hover:border-hpe-cyan hover:text-hpe-cyan hover:bg-hpe-cyan/5'
                                    }`}>
                                    About HPE IT
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default ServicesPage;
