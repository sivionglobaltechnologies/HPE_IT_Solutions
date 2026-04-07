import React from 'react';
import { ArrowRight, Globe, Zap, Target } from 'lucide-react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

// Animation variants
const fadeIn = (direction = 'up', delay = 0) => ({
    hidden: {
        y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
        x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
        opacity: 0,
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1.25,
            delay: delay,
            bounce: 0.2
        }
    }
});

const AboutUsSection = () => {
    const navigate = useNavigate();
    return (
        <section id="about-section" className="relative bg-white dark:bg-[#011b26] py-12 px-6 md:py-24 transition-colors duration-500 overflow-hidden" aria-labelledby="about-heading">

            {/* Abstract Background Glows */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#00b0d4]/5 rounded-full blur-[120px] dark:opacity-20" />
                <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#ff8d00]/5 rounded-full blur-[100px] dark:opacity-10" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 font-sans">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* RIGHT SIDE: Text Content - Top for Mobile, Left for Laptop */}
                    <motion.div
                        variants={fadeIn('left', 0.4)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col space-y-8 lg:order-2 order-1"
                    >
                        <div className="space-y-4">
                            <span className="inline-block font-rajdhani text-brand-orange dark:text-[#ff8d00] tracking-[0.4em] font-black text-xs uppercase px-4 py-1.5 bg-[#ff8d00]/10 dark:bg-[#ff8d00]/10 rounded-full">
                                WHO WE ARE
                            </span>

                            <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-5xl text-[#011b26] dark:text-white leading-tight tracking-tighter">
                                Pioneering Enterprise <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b0d4] to-[#ff8d00]">
                                    Infrastructure
                                </span> <br />
                                Ecosystems.
                            </h2>

                            <div className="w-20 h-1.5 bg-gradient-to-r from-[#00b0d4] to-[#ff8d00] rounded-full" />
                        </div>

                        <div className="space-y-4 md:space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-xl leading-relaxed font-medium">
                            <p>
                                HPE IT Solutions is a multi-vertical enterprise focused on IT services, infrastructure support, and
                                <span className="text-[#011b26] dark:text-white font-bold decoration-[#00b0d4] decoration-4 underline-offset-4 underline inline"> brick oriented project execution</span>.
                                With over 70 strategic mergers across India, we manage large-scale enterprise and real estate operations
                                through a blend of centralized digital systems and decentralized execution teams.
                            </p>
                            <p>
                                Our headquarters is in <span className="text-[#ff8d00] font-bold">Hyderabad</span>, with operational hubs in major metropolitan areas across the nation.
                            </p>
                        </div>

                        <div className="pt-6">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,176,212,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group flex items-center space-x-4 bg-gradient-to-r from-[#00b0d4] to-[#008ba8] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-300 shadow-xl cursor-pointer"
                                onClick={() => navigate('/about')}
                            >
                                <span>Read More about us</span>
                                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-3" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* LEFT SIDE: Animated Image Container - Bottom for Mobile, Left for Laptop */}
                    <motion.div
                        variants={fadeIn('right', 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="relative lg:order-1 order-2"
                    >
                        {/* Decorative Background Box */}
                        <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#00b0d4]/20 rounded-2xl -z-10 transition-transform duration-500" />
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#ff8d00]/20 rounded-2xl -z-10" />

                        <div className="relative group overflow-hidden rounded-2xl shadow-2xl glass-reflection border border-white/10">
                            <img
                                src="/infra_ecosys.png"
                                alt="HPE IT Solutions Infrastructure Ecosystems"
                                loading="lazy"
                                className="w-full h-[400px] md:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Refined Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#011b26]/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                            {/* Floating Stats Badge */}
                            <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-[#022534]/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 max-w-[200px] transform hover:scale-105 transition-transform">
                                <p className="text-3xl font-black text-[#ff8d00] leading-none mb-1">70+</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#011b26] dark:text-white opacity-70">Strategic Global Mergers</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
