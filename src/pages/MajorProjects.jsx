import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Clock, ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { detailedProjects } from '../projects/projectsData';

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

const FadeLeft = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
};

const FadeRight = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
};

export default function MajorProjects() {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash?.replace('#', '');
        if (!hash) { window.scrollTo(0, 0); return; }
        const el = document.getElementById(hash);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
    }, [location.hash]);

    return (
        <article className="bg-white text-slate-900 font-sans overflow-x-hidden pt-20">
            <title>Major Case Studies | HPE IT Solutions Projects</title>

            {/* ── Page Header ─────────────────────────────────────────── */}
            <section className="py-16 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-8 md:px-16">
                    <FadeUp>
                        <Link to="/projects"
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mb-6">
                            <ChevronLeft className="w-3 h-3" /> Project Portfolio
                        </Link>
                        <span className="block text-[10px] font-black tracking-[0.5em] uppercase text-blue-600 mb-3">
                            Page 12 — Key Highlights
                        </span>
                        <h1 className="text-xl md:text-3xl font-semibold uppercase tracking-tight text-slate-900 leading-[1.1]">
                            3 Major<br />
                            <span className="text-blue-600">Case Studies</span>
                        </h1>
                        <div className="w-14 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mt-5" />
                        <p className="mt-5 text-slate-600 font-medium text-[15px] leading-relaxed max-w-2xl">
                            Detailed breakdowns of three complex enterprise engagements — covering project scope, technology deployed and measurable outcomes.
                        </p>
                    </FadeUp>
                </div>
            </section>

            {/* ── Case Studies ─────────────────────────────────────────── */}
            <section className="pb-16">
                {detailedProjects.map((cs, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <div key={cs.id}
                            id={cs.slug}
                            className={`scroll-mt-24 py-20 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
                            <div className="max-w-7xl mx-auto px-8 md:px-16">
                                <div className={`grid lg:grid-cols-2 gap-14 items-start ${!isEven ? 'lg:grid-flow-row-dense' : ''}`}>

                                    {/* ── Image ── */}
                                    <FadeLeft delay={0.1} className={!isEven ? 'lg:col-start-2' : ''}>
                                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl group">
                                            <img src={cs.image} alt={cs.name} loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                                            {/* number badge */}
                                            <div className="absolute top-5 left-5 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center">
                                                <span className="text-white font-black text-sm">#{String(cs.id).padStart(2, '0')}</span>
                                            </div>
                                            {/* bottom meta */}
                                            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                                                <div className="flex items-center gap-1.5 text-white text-xs font-black">
                                                    <Clock className="w-3.5 h-3.5" /> {cs.duration}
                                                </div>
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${cs.badgeColor}`}>
                                                    {cs.badge}
                                                </span>
                                            </div>
                                        </div>
                                    </FadeLeft>

                                    {/* ── Content ── */}
                                    <FadeRight delay={0.2} className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                                        <div className="space-y-8">

                                            {/* Header */}
                                            <div className="space-y-3">
                                                <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${cs.badgeColor}`}>
                                                    {cs.type}
                                                </span>
                                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                                                    {cs.name}
                                                </h2>
                                                <div className="w-10 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" />
                                                <p className="text-slate-600 font-medium text-[14px] leading-relaxed">{cs.summary}</p>
                                            </div>

                                            {/* Scope */}
                                            <div className="space-y-3">
                                                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Project Scope</h3>
                                                <ul className="space-y-2">
                                                    {cs.scope.map((s, si) => (
                                                        <li key={si} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                                                            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                                            {s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Technology Stack */}
                                            <div className="space-y-3">
                                                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Technology Used</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {cs.tech.map(t => (
                                                        <span key={t}
                                                            className="text-[10px] font-black uppercase tracking-wide px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all cursor-default">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Outcomes */}
                                            <div className="space-y-3">
                                                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Outcomes</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {cs.outcomes.map(o => (
                                                        <div key={o.label}
                                                            className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:bg-blue-50 transition-all">
                                                            <p className="text-lg font-black text-blue-600">{o.value}</p>
                                                            <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 mt-1">{o.label}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </FadeRight>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* ── Navigation Footer ────────────────────────────────────── */}
            <section className="py-10 border-t border-slate-200 bg-slate-50">
                <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-wrap items-center justify-between gap-4">
                    <Link to="/projects"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
                        <ChevronLeft className="w-3.5 h-3.5" /> Back to Overview
                    </Link>
                    <Link to="/projects/mid"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all">
                        Mid-Size Projects →
                    </Link>
                </div>
            </section>
        </article>
    );
}
