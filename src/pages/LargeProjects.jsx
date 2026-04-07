import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, MapPin, Clock, Users, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { executiveProjects, accentMap } from '../projects/projectsData';

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

export default function LargeProjects() {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash?.replace('#', '');
        if (!hash) { window.scrollTo(0, 0); return; }
        const el = document.getElementById(hash);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
    }, [location.hash]);

    return (
        <article className="bg-white text-slate-900 font-sans overflow-x-hidden pt-20">
            <title>Large-Scale Projects | HPE IT Solutions Portfolio</title>

            {/* ── Page Header ─────────────────────────────────────────── */}
            <section className="py-16 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-8 md:px-16">
                    <FadeUp>
                        <Link to="/projects"
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mb-6">
                            <ChevronLeft className="w-3 h-3" /> Project Portfolio
                        </Link>
                        <span className="block text-[10px] font-black tracking-[0.5em] uppercase text-violet-600 mb-3">
                            Page 14 — National-Scale Execution
                        </span>
                        <h1 className="text-xl md:text-3xl font-semibold uppercase tracking-tight text-slate-900 leading-[1.1]">
                            3 Large-Scale<br />
                            <span className="text-violet-600">Execution Projects</span>
                        </h1>
                        <div className="w-14 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full mt-5" />
                        <p className="mt-5 text-slate-600 font-medium text-[15px] leading-relaxed max-w-2xl">
                            Workforce-intensive, multi-state deployments executed under structured governance — each requiring precise coordination of people, technology and timelines.
                        </p>
                    </FadeUp>
                </div>
            </section>

            {/* ── Executive Project Cards ───────────────────────────────── */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-8 md:px-16 space-y-12">
                    {executiveProjects.map((lp, i) => {
                        const ac = accentMap[lp.accent];
                        return (
                            <FadeUp key={lp.id} delay={i * 0.1}>
                                <div id={lp.slug}
                                    className={`scroll-mt-24 rounded-2xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 ring-1 ${ac.ring}`}>

                                    {/* ── Title Bar ── */}
                                    <div className={`${ac.bg} border-b border-slate-200 px-8 py-6 flex flex-wrap items-center justify-between gap-4`}>
                                        <div className="flex items-center gap-5">
                                            <span className={`text-5xl font-black ${ac.text} opacity-20 font-mono leading-none`}>
                                                {String(lp.id).padStart(2, '0')}
                                            </span>
                                            <div>
                                                <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-slate-900">
                                                    {lp.name}
                                                </h2>
                                                <p className={`text-[10px] font-black uppercase tracking-widest ${ac.text} mt-0.5`}>
                                                    {lp.type}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`${ac.pill} text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow`}>
                                            {lp.badge}
                                        </span>
                                    </div>

                                    {/* ── Body — 3 columns ── */}
                                    <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

                                        {/* Col 1: Overview + Metrics */}
                                        <div className="p-8 space-y-6">
                                            <div>
                                                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-3">Overview</h3>
                                                <p className="text-sm text-slate-600 font-medium leading-relaxed">{lp.summary}</p>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Execution Metrics</h3>
                                                {[
                                                    { icon: <Clock className="w-4 h-4" />, label: 'Duration', value: lp.duration },
                                                    { icon: <Users className="w-4 h-4" />, label: 'Workforce', value: lp.workforce },
                                                    { icon: <BarChart3 className="w-4 h-4" />, label: 'Impact', value: lp.impact },
                                                ].map(stat => (
                                                    <div key={stat.label} className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-lg ${ac.bg} flex items-center justify-center ${ac.text} border border-slate-200 shrink-0`}>
                                                            {stat.icon}
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                                                            <p className="text-sm font-black text-slate-900">{stat.value}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Col 2: Execution Phases */}
                                        <div className="p-8 space-y-5">
                                            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Execution Phases</h3>
                                            <div className="space-y-2.5">
                                                {lp.phases.map((phase, pi) => (
                                                    <FadeUp key={phase} delay={0.04 * pi}>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col items-center">
                                                                <div className={`w-2.5 h-2.5 rounded-full ${ac.dot} shrink-0`} />
                                                                {pi < lp.phases.length - 1 && <div className="w-px h-4 bg-slate-200 mt-0.5" />}
                                                            </div>
                                                            <div className="flex items-center justify-between w-full gap-2">
                                                                <span className="text-sm text-slate-700 font-semibold">{phase}</span>
                                                                <span className={`text-[9px] font-black uppercase ${ac.text} ${ac.bg} px-2 py-0.5 rounded-full shrink-0`}>
                                                                    {pi + 1}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </FadeUp>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Col 3: States + Scale */}
                                        <div className="p-8 space-y-5">
                                            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">States Covered</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {lp.states.map(st => (
                                                    <span key={st}
                                                        className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border border-slate-200 ${ac.text} ${ac.bg}`}>
                                                        <MapPin className="w-3 h-3" /> {st}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className={`mt-4 bg-gradient-to-r ${ac.line} rounded-xl p-5 text-white text-center`}>
                                                <p className="text-[9px] font-black uppercase tracking-widest opacity-75 mb-1">Scale</p>
                                                <p className="text-xl font-black">{lp.scale}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeUp>
                        );
                    })}
                </div>
            </section>

            {/* ── Navigation Footer ────────────────────────────────────── */}
            <section className="py-10 border-t border-slate-200 bg-slate-50">
                <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-wrap items-center justify-between gap-4">
                    <Link to="/projects/mid"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
                        <ChevronLeft className="w-3.5 h-3.5" /> Mid-Size Projects
                    </Link>
                    <Link to="/projects"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all">
                        Back to Overview →
                    </Link>
                </div>
            </section>
        </article>
    );
}
