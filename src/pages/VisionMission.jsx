import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ─── Scroll Fade-Up ─── */
const FadeUp = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Label = ({ text, color = 'text-orange-400', isDark }) => (
    <span className={`inline-block text-[10px] font-black uppercase tracking-[0.55em] ${isDark ? color : color.replace('400', '600')}`}>
        {text}
    </span>
);

/* ─── Inline Video Player ─── */
const VideoBlock = ({ src, poster, className = '', isDark }) => (
    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 shadow-xl group ${isDark ? 'border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.5)]' : 'border-slate-200 shadow-slate-200/50'} ${className}`}>
        <video
            autoPlay
            loop
            muted
            playsInline
            poster={poster}
            className={`w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ${isDark ? 'opacity-80' : 'opacity-95'}`}
        >
            <source src={src} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${isDark ? 'bg-gradient-to-t from-[#0a0f1e]/60 via-transparent to-transparent' : 'bg-gradient-to-t from-black/20 via-transparent to-transparent'}`} />
    </div>
);

const approachItems = [
    { number: '01', title: 'Assessment & Planning', body: 'Comprehensive diagnostic evaluation of existing infrastructure, operational processes, and technology gaps. Formulation of structured execution blueprints aligned with client governance mandates and long-term scalability requirements.' },
    { number: '02', title: 'Architecture & Deployment', body: 'Multi-phase infrastructure architecture design followed by disciplined on-ground deployment across single or multi-site environments. Every deployment adheres to compliance, regulatory, and financial accountability standards.' },
    { number: '03', title: 'Monitoring & Optimization', body: 'Real-time operational monitoring using integrated digital oversight frameworks. Continuous performance benchmarking, risk identification, and tactical optimization ensuring SLA compliance and uptime consistency.' },
    { number: '04', title: 'Continuous Improvement', body: 'Cyclical institutional review protocols that codify lessons learned. Structured improvement cycles ensure each delivery vertical evolves toward higher operational maturity, regulatory precision, and service excellence benchmarks.' },
];

const missionSections = [
    { label: 'Operational Governance', color: 'text-orange-400', borderColor: 'border-orange-400/30', body: 'We establish governance-first operational frameworks that standardize decision-making, resource allocation, and performance review across all operational verticals. Every process tier is structured for accountability and audit-readiness within a unified command hierarchy.' },
    { label: 'Technology Integration', color: 'text-blue-400', borderColor: 'border-blue-400/30', body: 'We integrate digital monitoring platforms, automation tooling, and performance dashboards into client infrastructure environments. This enables real-time visibility, reduces manual overhead, and ensures proactive issue resolution across complex, distributed deployments.' },
    { label: 'Infrastructure Enablement', color: 'text-teal-400', borderColor: 'border-teal-400/30', body: 'We enable structured, multi-location infrastructure deployments by combining centralized architectural oversight with agile local execution. Our delivery capability spans data center build-outs, network modernization, and enterprise-grade facility commissioning.' },
    { label: 'Compliance & Accountability', color: 'text-indigo-400', borderColor: 'border-indigo-400/30', body: 'Financial discipline, regulatory compliance, and institutional risk management are embedded at every layer of our delivery model. ISO-certified audit frameworks and structured reporting protocols ensure complete transparency across all project lifecycles.' },
    { label: 'Strategic Partnerships', color: 'text-amber-400', borderColor: 'border-amber-400/30', body: 'We cultivate enduring enterprise partnerships built on integrity, measurable outcomes, and institutional trust. Our engagement model prioritizes client success through shared accountability, long-term support contracts, and structured escalation processes.' },
];

const VisionMission = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <article className={`transition-colors duration-500 overflow-x-hidden font-sans ${isDark ? 'bg-[#0a0f1e] text-white' : 'bg-[#f8fafc] text-slate-900'}`}>

            {/* HERO */}
            <section className="relative w-full h-[55vh] min-h-[450px] flex items-center justify-center overflow-hidden">
                <video
                    autoPlay loop muted playsInline
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${isDark ? 'opacity-50' : 'opacity-70'}`}
                >
                    <source src="https://player.vimeo.com/external/370314051.hd.mp4?s=34a873f1d3e144a1e944b3604929c2bcc5d36e05&profile_id=174" type="video/mp4" />
                </video>

                <div className={`absolute inset-0 transition-colors duration-700 ${isDark ? 'bg-black/40' : 'bg-white/10'}`} />
                <div className={`absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/10 transition-colors duration-700 ${isDark ? 'via-transparent to-[#0a0f1e]' : 'via-transparent to-[#f8fafc]'}`} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col items-center text-center gap-6 px-8 max-w-4xl mx-auto"
                >
                    <Label text="Corporate Strategy" color="text-orange-400" isDark={isDark} />
                    <h1 className={`text-2xl md:text-4xl font-bold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Vision &amp; Mission
                    </h1>
                    <p className={`text-lg md:text-xl font-medium tracking-wide max-w-2xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                        Structured Governance. Scalable Infrastructure. Measurable Execution.
                    </p>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full" />
                </motion.div>
            </section>

            {/* INTRO STRIP */}
            <FadeUp>
                <div className={`border-t border-b py-6 px-8 md:px-16 transition-colors duration-500 ${isDark ? 'border-white/[0.07]' : 'border-slate-200 bg-white/50'}`}>
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <p className={`text-lg font-medium max-w-2xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                            HPE IT Solutions anchors every engagement in a disciplined strategic framework — combining unifying governance architecture with actionable execution excellence across India&apos;s enterprise infrastructure landscape.
                        </p>
                        <Link to="/contact"
                            className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:scale-105 active:scale-95">
                            Begin a Discussion
                            <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </FadeUp>

            <div className="h-12" />

            <main className="space-y-20 pb-24">

                {/* VISION SECTION */}
                <section className="px-8 md:px-16">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
                        <FadeUp className="lg:col-span-6 space-y-10">
                            <div className="space-y-5">
                                <Label text="Our Vision" color="text-orange-400" isDark={isDark} />
                                <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Vision
                                </h2>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full" />
                            </div>

                            <p className={`text-xl font-semibold leading-relaxed ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
                                To lead India&apos;s integrated IT and infrastructure transformation ecosystem through structured governance, scalable digital frameworks, and disciplined execution excellence.
                            </p>

                            <div className={`space-y-7 text-[15px] leading-[1.9] font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                                <p>Integrated transformation, as we define it, means the convergence of technology adoption, operational process redesign, and workforce capability development into a single, coherent enterprise architecture.</p>
                                <p>Our governance-driven architecture is built on the principle that structured accountability precedes scalability.</p>
                                <p>Long-term institutional reliability is the cornerstone of our vision. We design infrastructure frameworks not for immediate project delivery alone, but for sustainable, measurable performance.</p>
                            </div>

                            <div className={`grid sm:grid-cols-3 gap-0 border rounded-2xl overflow-hidden mt-4 shadow-sm transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-slate-200 bg-white'}`}>
                                {[
                                    { label: 'Governance-Driven', desc: 'Structured compliance at every layer' },
                                    { label: 'Scalable Frameworks', desc: 'Built for multi-site national reach' },
                                    { label: 'Disciplined Execution', desc: 'Precision delivery with accountability' },
                                ].map((item, i) => (
                                    <div key={i} className={`p-6 space-y-2 transition-colors duration-500 ${i < 2 ? (isDark ? 'border-r border-white/10' : 'border-r border-slate-100') : ''} hover:bg-slate-50/50`}>
                                        <p className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>{item.label}</p>
                                        <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.2} className="lg:col-span-6 space-y-4">
                            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[450px] ${isDark ? 'border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.5)]' : 'border-slate-200 shadow-slate-200/50'}`}>
                                <img
                                    src="/vision3.png"
                                    alt="Vision"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className={`text-[10px] font-black uppercase tracking-widest text-center ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                                Infrastructure Modernization · National Scale
                            </p>
                        </FadeUp>
                    </div>
                </section>

                <div className={`max-w-7xl mx-auto px-8 md:px-16 border-t ${isDark ? 'border-white/[0.07]' : 'border-slate-200'}`} />

                {/* MISSION SECTION */}
                <section className="px-8 md:px-16">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
                        {/* Image — right side on desktop */}
                        <FadeUp delay={0.2} className="lg:col-span-5 lg:order-last order-first space-y-3">
                            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 shadow-lg aspect-[4/3] lg:h-[380px] ${isDark ? 'border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.4)]' : 'border-slate-200 shadow-slate-200/50'}`}>
                                <img
                                    src="/mission.png"
                                    alt="Mission"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className={`text-[10px] font-black uppercase tracking-widest text-center ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                                Enterprise Operations · Pan-India Coverage
                            </p>
                        </FadeUp>

                        {/* Content — left side */}
                        <FadeUp className="lg:col-span-7 space-y-8 lg:order-first">
                            <div className="space-y-5">
                                <Label text="Our Mission" color="text-blue-400" isDark={isDark} />
                                <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Mission
                                </h2>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-orange-400 rounded-full" />
                            </div>

                            <p className={`text-xl font-semibold leading-relaxed ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
                                To deliver compliant, scalable, and technology-driven execution models for enterprise and infrastructure clients across the Indian subcontinent.
                            </p>

                            <div className="space-y-8">
                                {missionSections.map((item, i) => (
                                    <FadeUp key={i} delay={i * 0.07}>
                                        <div className={`pl-5 border-l-2 space-y-2 transition-colors duration-500 ${isDark ? item.borderColor : item.borderColor.replace('30', '100')} group`}>
                                            <h4 className={`text-[11px] font-black uppercase tracking-[0.45em] transition-colors ${isDark ? item.color : item.color.replace('400', '600')}`}>
                                                {item.label}
                                            </h4>
                                            <p className={`text-[15px] leading-[1.85] font-medium transition-colors ${isDark ? 'text-gray-400' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                                {item.body}
                                            </p>
                                        </div>
                                    </FadeUp>
                                ))}
                            </div>
                        </FadeUp>
                    </div>
                </section>

                <div className={`max-w-7xl mx-auto px-8 md:px-16 border-t ${isDark ? 'border-white/[0.07]' : 'border-slate-200'}`} />

                {/* STRATEGIC APPROACH SECTION */}
                <section className="px-8 md:px-16">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <FadeUp className="space-y-5 max-w-3xl">
                            <Label text="Execution Methodology" color="text-teal-400" isDark={isDark} />
                            <h2 className={`text-xl md:text-2xl font-semibold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Our Strategic Execution Model
                            </h2>
                            <p className={`text-lg font-medium leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                                Every HPE IT Solutions engagement follows a structured, four-phase execution methodology — from diagnostic assessment through continuous institutional improvement.
                            </p>
                        </FadeUp>

                        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-0 border rounded-2xl overflow-hidden transition-all duration-500 ${isDark ? 'border-white/10 bg-white/[0.01]' : 'border-slate-200 bg-white shadow-xl'}`}>
                            {approachItems.map((item, i) => (
                                <FadeUp key={i} delay={i * 0.1}>
                                    <div className={`
                                        p-8 md:p-10 space-y-5 h-full transition-all duration-300 group
                                        ${isDark ? 'border-white/10 hover:bg-white/[0.03]' : 'border-slate-100 hover:bg-slate-50'}
                                        border-b lg:border-b-0
                                        ${i < 3 ? 'lg:border-r' : ''}
                                        ${i === 0 ? 'md:border-r' : ''}
                                        ${i === 1 ? 'lg:border-r' : ''}
                                        ${i === 2 ? 'md:border-r lg:border-r' : ''}
                                    `}>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-3xl font-black leading-none transition-colors ${isDark ? 'text-white/10' : 'text-slate-200'}`}>{item.number}</span>
                                            <div className="w-8 h-px bg-gradient-to-r from-orange-400 to-blue-500" />
                                        </div>
                                        <h3 className={`text-[15px] font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            {item.title}
                                        </h3>
                                        <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                                            {item.body}
                                        </p>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>

                        <FadeUp>
                            <div className={`rounded-2xl p-10 md:p-14 transition-all duration-500 grid lg:grid-cols-2 gap-10 items-center ${isDark ? 'border border-white/10 bg-white/[0.02]' : 'border border-slate-200 bg-white shadow-lg'}`}>
                                <div className="space-y-4">
                                    <Label text="Institutional Foundation" color="text-indigo-400" isDark={isDark} />
                                    <h3 className={`text-lg md:text-xl font-semibold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        Governance Architecture<br />
                                        <span className={isDark ? 'text-white' : 'text-slate-900'}>That Scales With the Nation</span>
                                    </h3>
                                </div>
                                <div className={`space-y-5 text-[15px] leading-relaxed font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                                    <p>HPE IT Solutions operates as a structured institutional entity — not an ad-hoc project firm.</p>
                                    <p>Every engagement contributes to a long-term institutional knowledge base that improves our execution quality and client confidence.</p>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </section>

                {/* CTA STRIP */}
                <section className="px-8 md:px-16">
                    <FadeUp className="max-w-5xl mx-auto">
                        <div className={`relative py-20 px-10 md:px-16 rounded-[2.5rem] border overflow-hidden transition-all duration-500 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white shadow-2xl'}`}>
                            {isDark ? (
                                <>
                                    <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/[0.07] blur-[130px] rounded-full pointer-events-none" />
                                    <div className="absolute -bottom-20 right-16 w-72 h-72 bg-orange-400/[0.06] blur-[110px] rounded-full pointer-events-none" />
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 pointer-events-none" />
                            )}

                            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                                <div className="space-y-4 lg:max-w-xl">
                                    <h2 className={`text-xl md:text-2xl font-bold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        Ready to Align Your <br />
                                        <span className="bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">Enterprise Strategy?</span>
                                    </h2>
                                    <p className={`text-base font-medium leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                        Partner with HPE IT Solutions to build governance-driven, scalable enterprise frameworks aligned with India&apos;s largest infrastructure mandate.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
                                    <Link to="/contact"
                                        className="px-10 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-600/20 text-center">
                                        Begin a Discussion
                                    </Link>
                                    <Link to="/about"
                                        className={`px-10 py-4 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all text-center border ${isDark ? 'bg-white/[0.07] border-white/[0.12] text-white hover:bg-white/[0.13]' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'}`}>
                                        Return to Overview
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeUp>
                </section>

            </main>
        </article>
    );
};

export default VisionMission;
