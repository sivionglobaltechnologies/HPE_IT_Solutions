import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { gridProjects } from '../projects/projectsData';

const FadeUp = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
};

/* Each mid project gets a set of contextual impact metrics */
const projectMetrics = {
    'enterprise-vendor-automation': [
        { label: 'Billing Cycle', value: '45% Faster' },
        { label: 'Compliance', value: 'Zero Errors' },
        { label: 'Automation', value: 'End-to-end' },
        { label: 'Reconciliation', value: 'Automated' },
    ],
    'multi-state-workforce-deployment': [
        { label: 'Deployment Model', value: 'Zero Subcontracting' },
        { label: 'Personnel Scale', value: '800+' },
        { label: 'Geographic Reach', value: 'Pan-India' },
        { label: 'Compliance Rate', value: '100%' },
    ],
    'construction-billing-software': [
        { label: 'BoQ Integration', value: 'Automated' },
        { label: 'Project Scale', value: 'Multi-crore' },
        { label: 'Process Automation', value: '80%+' },
        { label: 'Billing Errors', value: 'Near-zero' },
    ],
    'housing-project-management': [
        { label: 'Residential Units', value: '15,000+' },
        { label: 'Milestone Tracking', value: 'End-to-end' },
        { label: 'Quality Checks', value: 'Digitised' },
        { label: 'Reporting', value: 'Real-time' },
    ],
};

const accentColors = ['blue', 'indigo', 'emerald', 'orange'];
const colorMap = {
    blue: { pill: 'bg-blue-600', text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', ring: 'ring-blue-500/20' },
    indigo: { pill: 'bg-indigo-600', text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', ring: 'ring-indigo-500/20' },
    emerald: { pill: 'bg-emerald-600', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', ring: 'ring-emerald-500/20' },
    orange: { pill: 'bg-orange-600', text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', ring: 'ring-orange-500/20' },
};

export default function MidProjects() {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash?.replace('#', '');
        if (!hash) { window.scrollTo(0, 0); return; }
        const el = document.getElementById(hash);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
    }, [location.hash]);

    return (
        <article className="bg-white text-slate-900 font-sans overflow-x-hidden pt-20">
            <title>Mid-Size Projects | HPE IT Solutions Portfolio</title>

            {/* ── Page Header ─────────────────────────────────────────── */}
            <section className="py-16 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-8 md:px-16">
                    <FadeUp>
                        <Link to="/projects"
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mb-6">
                            <ChevronLeft className="w-3 h-3" /> Project Portfolio
                        </Link>
                        <span className="block text-[10px] font-black tracking-[0.5em] uppercase text-indigo-600 mb-3">
                            Page 13 — Mid-Scale Execution
                        </span>
                        <h1 className="text-xl md:text-3xl font-semibold uppercase tracking-tight text-slate-900 leading-[1.1]">
                            4 Mid-Size<br />
                            <span className="text-indigo-600">Projects</span>
                        </h1>
                        <div className="w-14 h-0.5 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mt-5" />
                        <p className="mt-5 text-slate-600 font-medium text-[15px] leading-relaxed max-w-2xl">
                            Four structured project engagements — each summarised with scope, operational context and impact metrics drawn from actual delivery.
                        </p>
                    </FadeUp>
                </div>
            </section>

            {/* ── 2×2 Grid ─────────────────────────────────────────────── */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-8 md:px-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        {gridProjects.map((p, i) => {
                            const accent = accentColors[i];
                            const c = colorMap[accent];
                            const metrics = projectMetrics[p.slug] || [];

                            return (
                                <FadeUp key={p.id} delay={i * 0.08}>
                                    <div id={p.slug}
                                        className={`scroll-mt-24 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 ring-1 ${c.ring}`}>

                                        {/* Image */}
                                        <div className="relative h-52 overflow-hidden">
                                            <img src={p.img} alt={p.name} loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                                            {/* Project number */}
                                            <div className={`absolute top-4 left-4 text-2xl font-black opacity-30 text-white font-mono`}>
                                                #{String(p.id).padStart(2, '0')}
                                            </div>
                                            {/* Scale badge */}
                                            <span className={`absolute bottom-4 left-4 ${c.pill} text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full`}>
                                                {p.scale}
                                            </span>
                                            <span className="absolute bottom-4 right-4 text-white/60 text-[9px] font-black uppercase tracking-wider">
                                                {p.type}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="p-7 space-y-6">
                                            {/* Title */}
                                            <div className="space-y-2">
                                                <h2 className="text-base font-black uppercase tracking-tight text-slate-900 leading-tight">
                                                    {p.name}
                                                </h2>
                                                <div className={`w-8 h-0.5 ${c.pill} rounded-full`} />
                                                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                                    {p.summary}
                                                </p>
                                            </div>

                                            {/* Impact Metrics Grid */}
                                            <div className="space-y-3">
                                                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Impact Metrics</h3>
                                                <div className="grid grid-cols-2 gap-2.5">
                                                    {metrics.map(m => (
                                                        <div key={m.label}
                                                            className={`${c.bg} border ${c.border} rounded-xl p-3.5 text-center`}>
                                                            <p className={`text-base font-black ${c.text}`}>{m.value}</p>
                                                            <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 mt-0.5">{m.label}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeUp>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Navigation Footer ────────────────────────────────────── */}
            <section className="py-10 border-t border-slate-200 bg-slate-50">
                <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-wrap items-center justify-between gap-4">
                    <Link to="/projects/major"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
                        <ChevronLeft className="w-3.5 h-3.5" /> Major Projects
                    </Link>
                    <Link to="/projects/large"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-7 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all">
                        Large-Scale Projects →
                    </Link>
                </div>
            </section>
        </article>
    );
}
