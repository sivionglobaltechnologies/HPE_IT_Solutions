import React from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    Lock,
    HeartPulse,
    Leaf,
    BarChart3,
    Award,
    CheckCircle,
    ChevronRight,
    Building2,
    FileCheck,
    BadgeCheck,
    Download,
    PhoneCall
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fadeIn = (direction = 'up', delay = 0) => ({
    hidden: {
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        opacity: 0
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1.25,
            delay: delay,
            ease: [0.25, 0.1, 0.25, 1],
        }
    }
});

const CertificationCard = ({ item, index }) => (
    <motion.div
        variants={fadeIn('up', index * 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="h-full"
    >
        <div className="h-full bg-white dark:bg-[#022534] p-8 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-start text-left group">
            <div className={`p-4 rounded-xl mb-6 ${item.bgColor} dark:bg-white/5 border border-slate-100/50 dark:border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                {React.cloneElement(item.icon, { className: `w-8 h-8 ${item.iconColor}` })}
            </div>

            {item.badge && (
                <span className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                    {item.badge}
                </span>
            )}

            <h3 className="text-xl font-black text-[#011b26] dark:text-white mb-4 group-hover:text-brand-orange transition-colors">
                {item.title}
            </h3>

            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {item.description}
            </p>
        </div>
    </motion.div>
);

const AccreditationCard = ({ item, index }) => (
    <motion.div
        variants={fadeIn('up', index * 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="h-full"
    >
        <div className="h-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex items-center space-x-6 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 group shadow-sm">
            <div className="bg-brand-orange/10 p-4 rounded-xl group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon, { className: "w-8 h-8 text-brand-orange" })}
            </div>
            <div>
                <h3 className="text-lg font-black text-[#011b26] dark:text-white mb-1 group-hover:text-brand-orange transition-colors">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.description}</p>
            </div>
        </div>
    </motion.div>
);

const HighlightBadge = ({ item, index }) => (
    <motion.div
        variants={fadeIn('up', index * 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center p-6 text-center"
    >
        <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-4 border border-brand-cyan/20 text-brand-cyan">
            <CheckCircle className="w-8 h-8" />
        </div>
        <span className="text-xs font-black text-white uppercase tracking-widest leading-relaxed">
            {item}
        </span>
    </motion.div>
);

const CertificationsPage = () => {
    const navigate = useNavigate();

    const corporateCerts = [
        {
            title: "ISO 9001:2015",
            badge: "Quality Management",
            description: "Ensures standardized quality management practices, continuous improvement, and customer satisfaction across all services.",
            icon: <Shield />,
            iconColor: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            title: "ISO 27001:2022",
            badge: "Information Security",
            description: "Ensures robust information security frameworks protecting client data and digital infrastructure.",
            icon: <Lock />,
            iconColor: "text-emerald-500",
            bgColor: "bg-emerald-50"
        },
        {
            title: "ISO 45001",
            badge: "Safety Standards",
            description: "Commitment to maintaining safe, healthy, and risk-free workplace standards.",
            icon: <HeartPulse />,
            iconColor: "text-rose-500",
            bgColor: "bg-rose-50"
        },
        {
            title: "ISO 14001",
            badge: "Environmental",
            description: "Promotes sustainable operations and environmental responsibility.",
            icon: <Leaf />,
            iconColor: "text-green-500",
            bgColor: "bg-green-50"
        },
        {
            title: "CMMI Level 3",
            badge: "Process Maturity",
            description: "Demonstrates defined, documented, and optimized business processes aligned with global best practices.",
            icon: <BarChart3 />,
            iconColor: "text-indigo-500",
            bgColor: "bg-indigo-50"
        },
    ];

    const accreditations = [
        {
            title: "Registered Government Vendor",
            description: "Authorized to execute public sector and government contracts.",
            icon: <Building2 />
        },
        {
            title: "Real Estate Digital Partner",
            description: "Ensuring digital compliance solutions for real estate sector.",
            icon: <BadgeCheck />
        },
        {
            title: "Certified Infrastructure Monitor",
            description: "Certified in infrastructure quality supervision services.",
            icon: <BarChart3 />
        }
    ];

    const highlights = [
        "100% Regulatory Compliance",
        "Data Protected Under ISO 27001",
        "Process Driven Organization",
        "Government Recognized Entity"
    ];

    return (
        <div className="bg-white dark:bg-[#011b26] transition-colors duration-500">

            {/* --- ENHANCED HERO SECTION --- */}
            <section className="relative min-h-[50vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-32 overflow-hidden bg-[#011b26]">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Main Glows */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />

                    {/* Floating Geometric Shapes */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-10 w-32 h-32 border border-white/5 rounded-3xl rotate-12 hidden lg:block"
                    />
                    <motion.div
                        animate={{
                            y: [0, 30, 0],
                            rotate: [0, -15, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-1/4 right-20 w-48 h-48 border border-white/5 rounded-full hidden lg:block"
                    />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <div className="max-w-3xl">


                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-6">
                                    <span className="text-[10px] font-black tracking-[0.2em] text-brand-orange uppercase">Governance & Trust</span>
                                </div>

                                <h1 className="text-xl md:text-3xl font-semibold text-white mb-4 tracking-tight uppercase leading-snug">
                                    World-Class <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-orange">Compliance</span>
                                </h1>

                                <p className="text-sm md:text-base text-slate-300 font-medium max-w-lg leading-relaxed mb-8 border-l-2 border-brand-cyan/30 pl-6">
                                    At HPE IT Solutions, we adhere to the most rigorous global benchmarks in quality, security, and operational excellence to deliver uncompromising value.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    {/* Glassmorphism Badge 1 */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="flex items-center space-x-3 bg-white/5 backdrop-blur-md p-3 px-5 rounded-2xl border border-white/10 hover:border-brand-cyan/30 transition-all duration-300 group cursor-default"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 flex items-center justify-center group-hover:bg-brand-cyan transition-colors">
                                            <Shield className="w-4 h-4 text-brand-cyan group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Security First</p>
                                            <p className="text-[11px] font-bold text-white uppercase tracking-wider">ISO 27001 Certified</p>
                                        </div>
                                    </motion.div>

                                    {/* Glassmorphism Badge 2 */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="flex items-center space-x-3 bg-white/5 backdrop-blur-md p-3 px-5 rounded-2xl border border-white/10 hover:border-brand-orange/30 transition-all duration-300 group cursor-default"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                                            <Award className="w-4 h-4 text-brand-orange group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Process Maturity</p>
                                            <p className="text-[11px] font-bold text-white uppercase tracking-wider">CMMI Level 3</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Visual Element - Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                            className="flex justify-center items-center relative mt-12 lg:mt-0"
                        >
                            <div className="relative group">
                                {/* Background glow effect */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-brand-cyan/20 to-brand-orange/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                                {/* Image frame */}
                                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                                    <img
                                        src="/Certifications__Compliance_about_hero.png"
                                        alt="Certifications & Compliance"
                                        loading="lazy"
                                        className="w-full h-auto object-cover max-w-md transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Overlay Gradient for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#011b26]/40 via-transparent to-transparent" />
                                </div>

                                {/* Floating Badge - Regulatory Compliance */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-6 -right-6 bg-white dark:bg-[#022534] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl hidden xl:flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                                        <BadgeCheck className="text-brand-cyan w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest leading-none mb-1">Governance</p>
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1">100%</p>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Regulatory Compliance</p>
                                    </div>
                                </motion.div>

                                {/* Floating Badge - Trust */}
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -top-6 -left-6 bg-white dark:bg-[#022534] p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl hidden xl:flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                                        <Shield className="text-brand-orange w-5 h-5" />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Global Trust</p>
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* --- CORPORATE CERTIFICATIONS --- */}
            <section className="py-24 bg-slate-50 dark:bg-[#011b26] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <span className="text-brand-orange text-xs font-black tracking-[0.4em] uppercase mb-4 block">GLOBAL BENCHMARKS</span>
                        <h2 className="text-xl md:text-2xl font-semibold text-[#011b26] dark:text-white mb-4 tracking-tight">Corporate Certifications</h2>
                        <div className="w-20 h-2 bg-brand-cyan rounded-full" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {corporateCerts.map((cert, index) => (
                            <div key={index} className="w-full md:w-[45%] lg:w-[30%] min-w-[300px]">
                                <CertificationCard item={cert} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- INDUSTRY ACCREDITATIONS --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <span className="text-brand-cyan text-xs font-black tracking-[0.4em] uppercase mb-4 block">SECTOR EXCELLENCE</span>
                        <h2 className="text-xl md:text-2xl font-semibold text-[#011b26] dark:text-white mb-4 tracking-tight">Industry Accreditations</h2>
                        <div className="w-20 h-2 bg-brand-orange rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {accreditations.map((item, index) => (
                            <AccreditationCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- COMPLIANCE HIGHLIGHTS --- */}
            <section className="py-20 bg-[#011b26] text-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-white/10">
                        {highlights.map((item, index) => (
                            <HighlightBadge key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-cyan/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/4 h-full bg-brand-orange/5 blur-[100px] pointer-events-none" />
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-24 px-6 relative">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-hpe-navy-light dark:bg-[#020c13] border border-slate-200 dark:border-white/10 p-12 md:p-20 rounded-[40px] text-center relative overflow-hidden group shadow-2xl">
                            {/* Background elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/20 transition-colors duration-700" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-brand-orange/20 transition-colors duration-700" />

                            <div className="relative z-10">
                                <span className="text-brand-orange text-xs font-black tracking-[0.5em] uppercase mb-6 block">BUILDING TRUST</span>
                                <h2 className="text-xl md:text-3xl font-semibold mb-5 leading-snug text-white">
                                    Partner with a Certified & <br />
                                    <span className="text-brand-cyan">Compliant</span> Organization
                                </h2>
                                <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto font-medium">
                                    Ensure your enterprise infrastructure projects are handled by team committed to global quality and security benchmarks.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate('/contact#contact-grid')}
                                        className="w-full sm:w-auto bg-brand-orange text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-hpe-navy/20 flex items-center justify-center group cursor-pointer"
                                    >
                                        <PhoneCall className="w-5 h-5 mr-3" />
                                        Contact Us
                                    </motion.button>

                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CertificationsPage;
