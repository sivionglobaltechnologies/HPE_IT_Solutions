import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // ... (rest of the hooks remain the same)
    // Transforms for the front cover slide-up effect
    const frontY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-100%"]);
    const frontOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    // Transforms for the inside cover content
    const insideScale = useTransform(scrollYProgress, [0.1, 0.6], [0.95, 1]);
    const insideOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
    const insideY = useTransform(scrollYProgress, [0.1, 0.6], [50, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] w-full bg-[#011b26] overflow-clip"
            aria-label="Welcome to HPE IT Solutions"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* --- INSIDE COVER (Background Layer) --- */}
                <motion.div
                    style={{
                        scale: insideScale,
                        opacity: insideOpacity,
                        y: insideY
                    }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 bg-[#011b26] text-white overflow-hidden"
                >
                    {/* Background Image */}
                    <img
                        src="/Inside_cover.png"
                        alt="HPE IT Solutions Enterprise Infrastructure"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />

                    {/* Technical Overlay - darker for strategic focus */}
                    <div className="absolute inset-0 bg-[#011b26]/85 transition-colors duration-500" />

                    <div className="relative z-10 max-w-4xl text-center px-6">
                        <header className="mb-6 md:mb-10">
                            <h2 className="text-brand-orange font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 md:mb-6 text-[10px] md:text-sm">Strategic Governance</h2>
                            <p className="text-2xl md:text-5xl font-bold leading-tight">
                                Delivering integrated <span className="text-brand-orange">digital</span> and <br />
                                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                                    physical infrastructure
                                </span> ecosystems.
                            </p>
                        </header>

                        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                            <p className="text-slate-200 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
                                Delivering across India through enterprise technology platforms, structured
                                workforce deployment, and centralized governance frameworks.
                            </p>
                            <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
                                We enable scalable, compliant, and performance-driven execution models for
                                enterprise and infrastructure clients nationwide.
                            </p>
                        </div>
                    </div>

                    <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none z-0" />
                    <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
                </motion.div>

                {/* --- FRONT COVER (Top Layer) --- */}
                <motion.div
                    style={{ y: frontY, opacity: frontOpacity }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                >
                    {/* Background Video */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    >
                        <source src="/home_herobannervideo.mp4" type="video/mp4" />
                    </video>

                    {/* Content Overlay - ensures readability across themes */}
                    <div className="absolute inset-0 bg-[#011b26]/60 dark:bg-[#011b26]/75 transition-colors duration-500" />

                    <div className="relative z-10 max-w-5xl text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-xl md:text-3xl font-rajdhani font-semibold text-white mb-4 uppercase tracking-wide drop-shadow-lg"
                        >
                            HPE <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-orange via-orange-500 to-amber-600">IT Solutions</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex flex-col items-center"
                        >
                            <h2 className="text-lg md:text-2xl font-rajdhani font-semibold text-slate-100 mb-8 max-w-3xl leading-relaxed transition-colors drop-shadow-lg">
                                Enterprise IT & Non-IT Infrastructure Services
                            </h2>

                            <div className="inline-flex items-center justify-center mb-10 md:mb-12 px-5 md:px-8 py-3 bg-white/5 backdrop-blur-md rounded-2xl md:rounded-full border border-white/10 shadow-xl transition-all hover:bg-white/10 group max-w-[90vw]">
                                <p className="text-white/80 text-[9px] md:text-[11px] font-bold tracking-[0.15em] md:tracking-[0.3em] uppercase text-center font-rajdhani leading-relaxed">
                                    Brick-Oriented Project Execution <span className="hidden md:inline mx-2 text-brand-orange/40">|</span>
                                    <span className="md:hidden block h-px w-full bg-white/10 my-1"></span>
                                    Pan-India Operations <span className="hidden md:inline mx-2 text-brand-orange/40">|</span>
                                    <span className="md:hidden block h-px w-full bg-white/10 my-1"></span>
                                    70+ Strategic Mergers
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 md:mb-12 w-full sm:w-auto px-4 sm:px-0">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,141,0,0.6)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/contact#contact-grid')}
                                    className="w-full sm:w-auto bg-brand-orange text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(255,141,0,0.3)] transition-all cursor-pointer"
                                >
                                    Contact Us
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,176,212,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/projects')}
                                    className="w-full sm:w-auto bg-transparent border-2 border-brand-cyan text-brand-cyan px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all cursor-pointer"
                                >
                                    Our Projects
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator (Inside Front Cover) */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30 group"
                        onClick={() =>
                            document
                                .getElementById('about-section')
                                ?.scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        <span className="text-white/60 font-rajdhani tracking-[0.4em] text-[10px] font-black group-hover:text-brand-orange transition-colors">
                            SCROLL DOWN
                        </span>
                        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 group-hover:border-brand-orange/50 transition-colors">
                            <motion.div
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-1 h-3 bg-brand-orange rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

export default Hero;
