import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight, ArrowUpRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../projects/projectsData';

/* ─── Projects with Updated Descriptions ────────────────────────────────── */
const showcaseProjects = projects;

/* ─── Animated Counter ────────────────────────────────────────────────────── */
const useCounter = (target, inView, duration = 1200) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const steps = Math.ceil(duration / 16);
        const increment = target / steps;
        const timer = setInterval(() => {
            start = Math.min(start + increment, target);
            setCount(Math.round(start));
            if (start >= target) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration]);
    return count;
};

/* ─── Reusable Scroll Fade ────────────────────────────────────────────────── */
const FadeUp = ({ children, className = '', delay = 0, once = true }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once, margin: '-60px' });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
};

const FadeIn = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay }}>
            {children}
        </motion.div>
    );
};

/* ─── Stats Data ──────────────────────────────────────────────────────────── */
const stats = [
    { value: 10, suffix: '', label: 'Enterprise Projects', sub: 'Delivered across India' },
    { value: 3, suffix: '+', label: 'Industry Verticals', sub: 'Government, Corporate, Logistics' },
    { value: 4, suffix: '', label: 'Execution Categories', sub: 'From software to infrastructure' },
    { value: 8, suffix: '+', label: 'States Covered', sub: 'Pan-India operational reach' },
];

/* ─── Category Explorer Data ──────────────────────────────────────────────── */
const categories = [
    {
        number: '01–03',
        title: 'Project Group 1',
        desc: 'Three in-depth execution deep-dives — covering enterprise software, government digitization and site monitoring.',
        path: '/projects/group-1',
        image: '/data_center_infrastructure.jpg',
        topColor: 'bg-blue-600',
        textColor: 'text-blue-400',
        tag: 'Group 1',
    },
    {
        number: '04–07',
        title: 'Project Group 2',
        desc: 'Four structured engagements — workforce deployment, construction ERP, housing management and warehouse automation.',
        path: '/projects/group-2',
        image: '/FieldOperations.png',
        topColor: 'bg-indigo-600',
        textColor: 'text-indigo-400',
        tag: 'Group 2',
    },
    {
        number: '08–10',
        title: 'Project Group 3',
        desc: 'Three national-scale projects demanding multi-state coordination, large workforces and structured delivery governance.',
        path: '/projects/group-3',
        image: '/about_image1.jpg',
        topColor: 'bg-violet-600',
        textColor: 'text-violet-400',
        tag: 'Group 3',
    },
];

/* ─── Card color map ──────────────────────────────────────────────────────── */
const categoryColors = {
    detailed: { bg: 'bg-blue-600', text: 'text-blue-400', light: 'bg-blue-50', border: 'border-blue-200' },
    grid: { bg: 'bg-indigo-600', text: 'text-indigo-400', light: 'bg-indigo-50', border: 'border-indigo-200' },
    executive: { bg: 'bg-violet-600', text: 'text-violet-400', light: 'bg-violet-50', border: 'border-violet-200' },
};

/* ════════════════════════════════════════════
   STAT CARD
════════════════════════════════════════════ */
const StatCard = ({ stat, delay }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const count = useCounter(stat.value, inView);
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 overflow-hidden">
            {/* Accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <p className="text-5xl md:text-6xl font-black text-slate-900 leading-none tabular-nums">
                {count}{stat.suffix}
            </p>
            <p className="font-black text-slate-900 text-sm uppercase tracking-widest mt-3">{stat.label}</p>
            <p className="text-slate-400 text-xs font-medium mt-1">{stat.sub}</p>
        </motion.div>
    );
};

/* ════════════════════════════════════════════
   CATEGORY CARD
════════════════════════════════════════════ */
/* ════════════════════════════════════════════
   PROJECT CARD
════════════════════════════════════════════ */
const ProjectCard = ({ project, index, delay }) => {
    const targetPath = project.id <= 3
        ? `/projects/group-1#project-${project.id}`
        : project.id <= 7
            ? `/projects/group-2#project-${project.id}`
            : `/projects/group-3#project-${project.id}`;

    return (
        <FadeUp delay={delay} className="h-full">
            <Link to={targetPath}
                className="group block h-full min-h-[450px] rounded-3xl overflow-hidden bg-slate-50 dark:bg-[#020817] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">

                {/* PROJECT IMAGE */}
                <div className="h-60 overflow-hidden relative">
                    <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Visual Accent */}
                <div className="absolute top-60 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                {/* Content Container */}
                <div className="p-6 h-full flex flex-col">
                    <div className="mb-4 flex items-start justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                            Project {project.id < 10 ? `0${project.id}` : project.id}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-white/10 group-hover:text-blue-600 transition-colors" />
                    </div>

                    <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white leading-tight tracking-tight uppercase mb-3 line-clamp-2">
                        {project.name}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-[13px] font-medium leading-relaxed line-clamp-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {project.description || project.summary}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                        View Detailed Case <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </Link>
        </FadeUp>
    );
};

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function ProjectsPage() {
    const headerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start start', 'end start'] });
    const ghostY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

    return (
        <article className="relative bg-white text-slate-900 font-sans overflow-x-hidden pt-20">
            <title>Project Portfolio | HPE IT Solutions</title>

            {/* ══════════════════════════════════════
                HEADER — Typographic hero with ghost text
            ══════════════════════════════════════ */}
            <main className="relative z-10 bg-white dark:bg-[#0a0f1e]">
                {/* ══════════════════════════════════════
                    HEADER — Typographic Hero (No Image)
                ══════════════════════════════════════ */}
                <section className="relative px-8 md:px-16 py-10 md:py-12 border-b border-white/5 bg-[#020c13] overflow-hidden">

                    {/* Subtle background grid */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                    {/* Glowing orb accents */}
                    <div className="absolute -top-20 -left-32 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                {/* Eyebrow tag */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex items-center gap-4 mb-6"
                                >
                                    <motion.div
                                        className="h-px bg-blue-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: 48 }}
                                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                    <span className="text-blue-500 dark:text-blue-400 text-[11px] font-black uppercase tracking-[0.4em]">
                                        Enterprise Portfolio
                                    </span>
                                </motion.div>

                                {/* Main heading — word-by-word slide-up */}
                                <div className="overflow-hidden mb-3">
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-tight leading-tight">
                                        {[
                                            { word: 'Project', color: 'text-white' },
                                            { word: 'Portfolio', color: 'text-blue-400' },
                                        ].map(({ word, color }, wi) => (
                                            <motion.span
                                                key={wi}
                                                className={`inline-block mr-4 ${color}`}
                                                initial={{ y: 80, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: 0.15 + wi * 0.18,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }}
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </h1>
                                </div>

                                {/* Animated underline bar */}
                                <motion.div
                                    className="h-[3px] bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mb-6 origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ width: '4rem' }}
                                />

                                {/* Description paragraph */}
                                <motion.p
                                    className="text-slate-400 text-sm max-w-xl font-medium leading-relaxed"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    A comprehensive record of 10 national-scale infrastructure and digital transformation projects delivered with measurable excellence across the Indian landscape.
                                </motion.p>

                                {/* Stats strip — staggered per-stat animation */}
                                <div className="flex flex-wrap gap-6 mt-6 pt-5 border-t border-slate-200 dark:border-white/5">
                                    {[
                                        { value: '10', label: 'Enterprise Projects' },
                                        { value: '8+', label: 'States Covered' },
                                        { value: '3', label: 'Industry Verticals' },
                                        { value: '800+', label: 'Workforce Deployed' },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex flex-col gap-1"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <span className="text-lg font-bold text-white tabular-nums">{stat.value}</span>
                                            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">{stat.label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Portfolio Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="relative block max-w-lg ml-auto w-full mt-10 lg:mt-0"
                            >
                                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-700 hover:shadow-blue-500/10 hover:border-blue-500/20 h-[300px] md:h-[380px]">
                                    <img
                                        src="/projectportfolio.jpeg"
                                        alt="Project Portfolio Dashboard"
                                        loading="lazy"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                ALL 10 PROJECTS SHOWCASE
            ══════════════════════════════════════ */}
                <section className="pt-12 pb-32 bg-[#020817] border-t border-white/5 relative overflow-hidden group/all">
                    {/* Background Decor */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    <div className="max-w-[1600px] mx-auto relative z-10 px-6">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 mx-auto">
                            <FadeUp className="text-left">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-0.5 bg-[#00e5ff] rounded-full" />
                                    <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#00e5ff]">The Full Portfolio</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                                    Strategic Delivery
                                </h2>
                                <p className="text-slate-400 max-w-2xl font-medium mt-4">
                                    Browse our detailed engagements across state-level infrastructure and enterprise software.
                                </p>
                            </FadeUp>

                            {/* Navigation Buttons */}
                            <FadeUp delay={0.2} className="flex items-center gap-4">
                                <button
                                    onClick={() => {
                                        const container = document.getElementById('project-scroll-container');
                                        if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                    }}
                                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                                    aria-label="Scroll Left"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => {
                                        const container = document.getElementById('project-scroll-container');
                                        if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                    }}
                                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                                    aria-label="Scroll Right"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </FadeUp>
                        </div>

                        {/* Horizontal Scroll Container */}
                        <div
                            id="project-scroll-container"
                            className="flex overflow-x-auto gap-4 md:gap-5 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {showcaseProjects.map((p, i) => (
                                <div key={p.id} className="min-w-[280px] md:min-w-[320px] lg:min-w-[calc((100%-4*1.25rem)/4)] snap-start">
                                    <ProjectCard project={p} index={i} delay={i * 0.05} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CSS to hide scrollbar (standard across browsers) */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                    #project-scroll-container::-webkit-scrollbar {
                        display: none;
                    }
                ` }} />
                </section>

                {/* ══════════════════════════════════════
                    PAGE FOOTER — Large Visionary Image
                ══════════════════════════════════════ */}
                <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden border-t border-white/5">
                    <img
                        src="/projectfullscreen.png"
                        alt="HPE IT Solutions Impact"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.6] transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-[#020817]/60" />

                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8 text-center">
                        <FadeUp>
                            <span className="text-hpe-orange text-[10px] md:text-sm font-black uppercase tracking-[0.6em] mb-6 block drop-shadow-lg">
                                Beyond Infrastructure
                            </span>
                            <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tight max-w-4xl leading-tight drop-shadow-xl">
                                Transforming the <br /> National <span className="text-hpe-orange">Digital</span> Landscape
                            </h2>
                            <p className="text-slate-100 text-base md:text-xl font-medium mt-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                                Every project we undertake is a step towards a more connected and efficient future for India.
                            </p>
                        </FadeUp>
                    </div>
                </section>

            </main>
        </article>
    );
}

const GroupBanner = ({ cat, delay }) => (
    <FadeUp delay={delay} className="w-full">
        <Link to={cat.path} className="group relative block w-full min-h-[60vh] md:min-h-[75vh] overflow-hidden border-b border-white/5">
            {/* Background Image w/ Scale Effect */}
            <div className="absolute inset-0 z-0">
                <img src={cat.image} alt={cat.title}
                    className="w-full h-full object-cover grayscale-[0.3] brightness-[0.4] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-[0.5] transition-all duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            {/* Content Container (TCS Brand Style) */}
            <div className="relative z-10 w-full h-full flex items-center px-8 md:px-16 lg:px-24 py-20">
                <div className="max-w-4xl border-l-[6px] pl-8 md:pl-12" style={{ borderColor: cat.topColor.includes('blue') ? '#2563eb' : cat.topColor.includes('indigo') ? '#4f46e5' : '#8b5cf6' }}>
                    {/* Small Label */}
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/50 block mb-6">
                        {cat.tag} Sector Insight
                    </span>

                    {/* Main Immersive Title */}
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tight uppercase mb-6">
                        {cat.title.replace('Project ', '')} <br />
                        <span className="text-white/40 group-hover:text-white transition-colors duration-500">Mastery & Governance</span>
                    </h3>

                    {/* Description Paragraph */}
                    <p className="text-slate-300 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mb-12">
                        {cat.desc} Integrated execution for multisector projects across Pan-India delivery sites.
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.3em] text-white group-hover:translate-x-3 transition-transform duration-500">
                        Explore Full Sector <ArrowRight className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Subtle numbering background */}
            <div className="absolute right-12 bottom-12 opacity-[0.03] select-none pointer-events-none hidden md:block">
                <span className="text-[15rem] font-black leading-none">{cat.number.split('–')[1]}</span>
            </div>
        </Link>
    </FadeUp>
);
