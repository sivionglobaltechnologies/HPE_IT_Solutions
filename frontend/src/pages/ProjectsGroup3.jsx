import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import { projects } from '../projects/projectsData';

const group3Projects = projects.slice(7, 10);

// ─── Animation Wrappers ───────────────────────────────────────────────────────

const FadeUp = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

const FadeIn = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay }}
        >
            {children}
        </motion.div>
    );
};

// ─── Individual Project Section ───────────────────────────────────────────────

const ProjectSection = ({ project, index }) => {
    const isEven = index % 2 === 0;

    return (
        <section
            id={`project-${project.id}`}
            className={`py-12 md:py-20 bg-white dark:bg-[#0a0f1e] ${index > 0 ? 'border-t border-slate-100 dark:border-slate-800/60' : ''}`}
        >
            <div className="max-w-[1600px] mx-auto px-8 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {isEven ? (
                        <>
                            {/* IMAGE LEFT ON DESKTOP - Move to order-2 on mobile */}
                            <FadeIn className="lg:col-span-7 order-2 lg:order-1">
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl group">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/5 dark:bg-black/10 transition-opacity group-hover:opacity-0" />
                                </div>
                            </FadeIn>

                            {/* CONTENT RIGHT ON DESKTOP - Move to order-1 on mobile */}
                            <FadeUp delay={0.1} className="lg:col-span-5 order-1 lg:order-2">
                                <div className="space-y-6">
                                    <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight uppercase mb-8">
                                        {project.name}
                                    </h2>
                                    <div className="space-y-0 border-t border-slate-100 dark:border-slate-800/60">
                                        {project.scope.map((item, i) => (
                                            <div key={i} className="group flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/60 cursor-pointer">
                                                <span className="text-base md:text-lg font-medium text-slate-800 dark:text-slate-200 group-hover:translate-x-2 transition-transform duration-300">
                                                    {item}
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-violet-600 opacity-100 md:opacity-0 md:group-hover:opacity-100 -translate-x-4 md:group-hover:translate-x-0 transition-all duration-300" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="pt-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 font-sans">Execution Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:bg-violet-600 group-hover:text-white transition-all cursor-default">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Impact Metrics */}
                                    {project.outcomes && (
                                        <div className="pt-8 mt-4 border-t border-slate-100 dark:border-slate-800/60">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-600 mb-4">Impact Metrics</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {project.outcomes.map((outcome, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                                                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide leading-tight">
                                                            {outcome}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </FadeUp>
                        </>
                    ) : (
                        <>
                            {/* CONTENT LEFT ON DESKTOP - Move to order-1 on mobile */}
                            <FadeUp delay={0.1} className="lg:col-span-5 order-1 lg:order-1">
                                <div className="space-y-6">
                                    <h2 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white leading-tight uppercase mb-8">
                                        {project.name}
                                    </h2>

                                    <div className="space-y-0 border-t border-slate-100 dark:border-slate-800/60">
                                        {project.scope.map((item, i) => (
                                            <div key={i} className="group flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/60 cursor-pointer">
                                                <span className="text-base md:text-lg font-medium text-slate-800 dark:text-slate-200 group-hover:translate-x-2 transition-transform duration-300">
                                                    {item}
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-violet-600 opacity-100 md:opacity-0 md:group-hover:opacity-100 -translate-x-4 md:group-hover:translate-x-0 transition-all duration-300" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 font-sans">Execution Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-violet-600 hover:text-white transition-all cursor-default">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {project.outcomes && (
                                        <div className="pt-8 mt-4 border-t border-slate-100 dark:border-slate-800/60">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-600 mb-4">Impact Metrics</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {project.outcomes.map((outcome, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                                                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide leading-tight">
                                                            {outcome}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </FadeUp>

                            {/* IMAGE RIGHT ON DESKTOP - Move to order-2 on mobile */}
                            <FadeIn className="lg:col-span-7 order-2 lg:order-2">
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl group">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/5 dark:bg-black/10 transition-opacity group-hover:opacity-0" />
                                </div>
                            </FadeIn>
                        </>
                    )}

                </div>
            </div>
        </section>
    );
};

export default function ProjectsGroup3() {
    return (
        <article className="relative bg-white dark:bg-[#0a0f1e] text-slate-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
            <main className="relative z-10 bg-white dark:bg-[#0a0f1e] pt-20">
                {group3Projects.map((project, index) => (
                    <ProjectSection key={project.id} project={project} index={index} />
                ))}

                <section className="py-40 text-center border-t border-slate-100 dark:border-slate-800">
                    <FadeUp>
                        <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-8">
                            Empowering Enterprise <br />Continuity Nationwide
                        </h3>
                        <div className="w-20 h-1 bg-violet-500 mx-auto rounded-full" />
                    </FadeUp>
                </section>
            </main>
        </article>
    );
}
