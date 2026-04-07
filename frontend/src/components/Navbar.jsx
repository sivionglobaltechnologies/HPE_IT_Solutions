import { Link, useLocation } from 'react-router-dom';
import {
    Sun, Moon, Menu, X, ChevronDown, ArrowRight,
    Building2, Users, LayoutGrid, Shield,
    Headphones, Activity, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

function Navbar() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMega, setActiveMega] = useState(null);
    const [hoveredName, setHoveredName] = useState(null);
    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const [mobileView, setMobileView] = useState('main'); // 'main' or megaKey

    // Close menus on route change & handle scroll to hash
    useEffect(() => {
        setMenuOpen(false);
        setActiveMega(null);
        setExpandedAccordion(null);
        setHoveredName(null);
        setMobileView('main');

        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 600);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT', path: '/about', mega: 'about' },
        { name: 'SERVICES', path: '/services', mega: 'services' },
        { name: 'PROJECTS', path: '/projects', mega: 'projects' },
        { name: 'CERTIFICATIONS', path: '/certifications' },
        { name: 'CONTACT', path: '/contact' },
        { name: 'GROWTH STRATEGY', path: '/growth-strategy' },
    ];

    const megaContent = {
        about: {
            intro: {
                title: "About HPE IT Solutions",
                desc: "India's leading integrated enterprise IT and infrastructure conglomerate, governed by absolute transparency and national scale execution.",
                cta: "Our Heritage",
                path: "/about"
            },
            columns: [
                {
                    title: "Strategy & Purpose",
                    path: "/about#overview",
                    links: [
                        { name: "Company Overview", path: "/about#overview" },
                        { name: "Vision & Mission", path: "/vision-mission" },
                        { name: "Organizational Strength", path: "/strength" },
                        { name: "Corporate Structure", path: "/corporate-structure#org-chart" },
                    ]
                },
                {
                    title: "Governance & Operations",
                    links: [
                        { name: "Governance Model" },
                        { name: "Executive Leadership" },
                        { name: "National Footprint" },
                    ]
                }
            ]
        },
        services: {
            intro: {
                title: "Strategic Service Divisions",
                desc: "HPE IT Solutions operates across three specialized divisions, providing integrated technology and infrastructure excellence at national scale.",
                cta: "Strategic Overview"
            },
            columns: [
                {
                    title: "Core Divisions",
                    links: [
                        { name: "Enterprise IT Services", path: "/services/enterprise", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
                        { name: "Infrastructure & Brick Services", path: "/services/infrastructure", icon: <Building2 className="w-3.5 h-3.5" /> },
                        { name: "Workforce & Managed Services", path: "/services/workforce", icon: <Users className="w-3.5 h-3.5" /> },
                    ]
                },
                {
                    title: "Service Excellence",
                    links: [
                        { name: "National Support Network", icon: <Headphones className="w-3.5 h-3.5" /> },
                        { name: "Annual Maintenance (AMC)", icon: <Shield className="w-3.5 h-3.5" /> },
                        { name: "Consulting & Strategy", icon: <Activity className="w-3.5 h-3.5" /> },
                    ]
                }
            ],
            // featured: {
            //     title: "Nationwide Delivery",
            //     label: "Operational Excellence",
            //     image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
            //     path: "/services"
            // }
        },
        projects: {
            intro: {
                title: "HPE Portfolio",
                desc: "A comprehensive look at our enterprise IT and infrastructure delivery across the Indian landscape.",
                cta: "View Strategy",
                path: "/projects"
            },
            columns: [
                {
                    title: "Case Deep-Dives (Group 1)",
                    path: "/projects/group-1",
                    links: [
                        { name: "Real Estate ERP Implementation", path: "/projects/group-1#project-1" },
                        { name: "SmartSite Monitoring System", path: "/projects/group-1#project-2" },
                        { name: "Govt. Infrastructure Digitization", path: "/projects/group-1#project-3" },
                    ]
                },
                {
                    title: "Operational Systems (Group 2)",
                    path: "/projects/group-2",
                    links: [
                        { name: "Vendor Automation Platform", path: "/projects/group-2#project-4" },
                        { name: "Workforce Deployment Project", path: "/projects/group-2#project-5" },
                        { name: "Cost Control & Billing", path: "/projects/group-2#project-6" },
                        { name: "Housing Project Management", path: "/projects/group-2#project-7" },
                    ]
                },
                {
                    title: "National Infrastructure (Group 3)",
                    path: "/projects/group-3",
                    links: [
                        { name: "Warehouse & Logistics", path: "/projects/group-3#project-8" },
                        { name: "Corporate IT Setup", path: "/projects/group-3#project-9" },
                        { name: "Pan-India AMC & Support", path: "/projects/group-3#project-10" },
                    ]
                }
            ]
        },
    };

    const isAboutActive = location.pathname.startsWith('/about') ||
        ['/vision-mission', '/strength', '/corporate-structure'].includes(location.pathname);
    const isStrategyActive = location.pathname === '/growth-strategy';
    const isProjectsActive = location.pathname.startsWith('/projects');
    const isServicesActive = location.pathname.startsWith('/services');

    const isMegaActive = (megaKey) => {
        if (megaKey === 'about') return isAboutActive;
        if (megaKey === 'projects') return isProjectsActive;
        if (megaKey === 'services') return isServicesActive;
        return false;
    };

    return (
        <>
            <nav className="bg-[#011b26] border-b border-white/10 px-6 h-20 fixed w-full top-0 z-[9999] transition-colors duration-500">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between h-full relative">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center h-full group overflow-hidden">
                        <img
                            src="/HPE LOGO.png"
                            alt="HPE IT Solutions"
                            className="h-full scale-125 w-auto object-contain transition-all duration-300 group-hover:scale-135 group-hover:brightness-110"
                        />
                    </Link>

                    {/* Desktop Nav Links */}
                    <ul className="hidden lg:flex items-center space-x-8 h-full">
                        {navLinks.map((link) => {
                            const isActiveItem = location.pathname === link.path || (link.mega && isMegaActive(link.mega));
                            const isInteracting = (hoveredName === link.name) || (link.mega && activeMega === link.mega);
                            const showLine = isInteracting || (isActiveItem && !hoveredName && !activeMega);

                            return (
                                <li
                                    key={link.name}
                                    className="h-full flex items-center group"
                                    onMouseEnter={() => {
                                        if (link.mega) setActiveMega(link.mega);
                                        setHoveredName(link.name);
                                    }}
                                    onMouseLeave={() => {
                                        setActiveMega(null);
                                        setHoveredName(null);
                                    }}
                                >
                                    <div className="relative py-1 flex items-center gap-1.5">
                                        <Link
                                            to={link.path}
                                            className={`flex items-center gap-1.5 text-xs font-black tracking-widest transition-colors duration-200 cursor-pointer outline-none ${isActiveItem || isInteracting
                                                ? 'text-[#00b0d4]'
                                                : 'text-white hover:text-[#00b0d4]'
                                                }`}
                                        >
                                            {link.name}
                                            {link.mega && (
                                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMega === link.mega ? 'rotate-180' : ''}`} />
                                            )}
                                        </Link>
                                        {showLine && (
                                            <motion.div
                                                layoutId="nav-underline"
                                                initial={false}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#ff8d00] shadow-[0_0_8px_rgba(255,141,0,0.5)] z-10"
                                            />
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-4">
                        {/* CTA (Desktop Only) */}
                        <Link
                            // to="/contact"
                            to="/contact#contact-grid"
                            className="hidden lg:inline-flex bg-[#ff8d00] hover:bg-[#e67e00] text-white px-8 py-3 rounded-full text-xs font-black tracking-widest transition-all transform active:scale-95 shadow-lg shadow-orange-500/20"
                        >
                            GET STARTED
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white group cursor-pointer"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-[#ff8d00] group-hover:rotate-45 transition-transform" />
                            ) : (
                                <Moon className="w-4 h-4 text-[#00b0d4] group-hover:-rotate-12 transition-transform" />
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden p-2 text-white relative z-[100] cursor-pointer"
                        >
                            <AnimatePresence mode="wait">
                                {menuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                    >
                                        <X className="w-7 h-7 text-[#ff8d00]" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, rotate: 90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -90 }}
                                    >
                                        <Menu className="w-7 h-7 text-[#00b0d4]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {activeMega && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            onMouseEnter={() => setActiveMega(activeMega)}
                            onMouseLeave={() => setActiveMega(null)}
                            className="absolute top-20 left-0 w-full bg-[#011b26] border-t border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.7)] z-[90] hidden lg:block"
                        >
                            <div className="max-w-[1400px] mx-auto px-12 py-12 grid grid-cols-12 gap-10">

                                {/* Col 1 — Intro */}
                                <div className="col-span-3 space-y-5 pr-4 border-r border-white/5">
                                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#00b0d4]/60">
                                        {megaContent[activeMega].intro.title}
                                    </p>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {megaContent[activeMega].intro.desc}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-[11px] font-black text-[#ff8d00]/60 uppercase tracking-widest cursor-default">
                                        {megaContent[activeMega].intro.cta}
                                    </div>
                                </div>

                                {/* Col 2+ — Link Columns & Featured */}
                                <div className={`${megaContent[activeMega].featured ? 'col-span-9 grid grid-cols-12 gap-10' : 'col-span-9 grid grid-cols-3 gap-10'}`}>
                                    <div className={`${megaContent[activeMega].featured ? 'col-span-8 grid grid-cols-2 gap-10' : 'col-span-12 grid grid-cols-3 gap-10'}`}>
                                        {megaContent[activeMega].columns.map((col, idx) => (
                                            <div key={idx} className="space-y-5">
                                                {col.path ? (
                                                    <Link
                                                        to={col.path}
                                                        onClick={() => setActiveMega(null)}
                                                        className="inline-block text-[10px] font-black uppercase tracking-[0.35em] text-[#00b0d4]/60 hover:text-[#ff8d00] transition-colors"
                                                    >
                                                        {col.title}
                                                    </Link>
                                                ) : (
                                                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/30">
                                                        {col.title}
                                                    </p>
                                                )}
                                                <div className="flex flex-col gap-1">
                                                    {col.links.map((link) => (
                                                        link.path ? (
                                                            <Link
                                                                key={link.name}
                                                                to={link.path}
                                                                onClick={() => setActiveMega(null)}
                                                                className="group flex items-center gap-2.5 py-1.5 text-white/75 hover:text-[#00b0d4] transition-colors"
                                                            >
                                                                {link.icon && (
                                                                    <span className="text-white/30 group-hover:text-[#ff8d00] transition-colors">
                                                                        {link.icon}
                                                                    </span>
                                                                )}
                                                                <span className="text-[13px] font-semibold leading-snug group-hover:translate-x-1 transition-transform">
                                                                    {link.name}
                                                                </span>
                                                            </Link>
                                                        ) : (
                                                            <div
                                                                key={link.name}
                                                                className="flex items-center gap-2.5 py-1.5 text-white/70 cursor-default"
                                                            >
                                                                {link.icon && (
                                                                    <span className="text-white/30">
                                                                        {link.icon}
                                                                    </span>
                                                                )}
                                                                <span className="text-[13px] font-semibold leading-snug">
                                                                    {link.name}
                                                                </span>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Featured Column */}
                                    {megaContent[activeMega].featured && (
                                        <div className="col-span-4 pl-4 border-l border-white/5">
                                            <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3]">
                                                <img
                                                    src={megaContent[activeMega].featured.image}
                                                    alt={megaContent[activeMega].featured.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#011b26] via-[#011b26]/20 to-transparent" />
                                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                                    <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-[#00b0d4]">
                                                            {megaContent[activeMega].featured.label}
                                                        </p>
                                                        <p className="text-lg font-black uppercase tracking-tight text-white leading-tight">
                                                            {megaContent[activeMega].featured.title}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link
                                                    to={megaContent[activeMega].featured.path}
                                                    onClick={() => setActiveMega(null)}
                                                    className="absolute inset-0 z-10"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                        className="fixed inset-0 z-[10000] bg-[#011b26] flex flex-col h-screen transition-colors duration-500"
                    >
                        {/* Mobile Header: Logo & Close */}
                        <div className="flex items-center justify-between h-20 border-b border-white/10 px-6">
                            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center h-full overflow-hidden">
                                <img
                                    src="/HPE LOGO.png"
                                    alt="HPE IT Solutions"
                                    className="h-full scale-125 w-auto object-contain"
                                />
                            </Link>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="p-2 text-[#00b0d4] hover:text-[#ff8d00] transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Slide Container */}
                        <div className="flex-grow overflow-hidden relative">
                            <AnimatePresence initial={false} mode="wait">
                                {mobileView === 'main' ? (
                                    <motion.div
                                        key="main-view"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="absolute inset-0 overflow-y-auto px-6 py-4"
                                    >
                                        <ul className="space-y-1">
                                            {navLinks.map((nav) => (
                                                <li key={nav.name} className="border-b border-white/5 last:border-0 flex items-center group">
                                                    <Link
                                                        to={nav.path}
                                                        onClick={() => setMenuOpen(false)}
                                                        className="flex-grow py-4 text-base font-semibold tracking-tight text-white/90 hover:text-[#00b0d4] transition-colors"
                                                    >
                                                        {nav.name}
                                                    </Link>
                                                    {nav.mega && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setMobileView(nav.mega);
                                                            }}
                                                            className="h-[56px] w-[56px] flex items-center justify-center text-[#ff8d00] hover:text-[#00b0d4] transition-colors border-l border-white/5"
                                                        >
                                                            <ChevronDown className="w-4 h-4 -rotate-90" />
                                                        </button>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Bottom Global Selectors */}
                                        <div className="mt-12 pt-8 border-t border-white/10">
                                            <button className="flex items-center gap-3 text-white/60 font-bold text-sm hover:text-white transition-colors">
                                                <Globe className="w-5 h-5" />
                                                <span>India (EN)</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="sub-view"
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 20, opacity: 0 }}
                                        className="absolute inset-0 flex flex-col pt-4 overflow-y-auto"
                                    >
                                        {/* Back Anchor */}
                                        <button
                                            onClick={() => setMobileView('main')}
                                            className="px-6 py-4 flex items-center gap-3 text-[#00b0d4] hover:text-[#ff8d00] transition-colors font-black text-xs uppercase tracking-widest border-b border-white/5"
                                        >
                                            <ArrowRight className="w-4 h-4 rotate-180" />
                                            Back to Menu
                                        </button>

                                        {/* Sub-menu Content */}
                                        <div className="px-6 py-8">
                                            <Link
                                                to={navLinks.find(l => l.mega === mobileView)?.path}
                                                onClick={() => setMenuOpen(false)}
                                                className="group inline-flex flex-col mb-8"
                                            >
                                                <h2 className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-[#00b0d4] transition-colors">
                                                    {navLinks.find(l => l.mega === mobileView)?.name}
                                                </h2>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff8d00]">View Main Page</span>
                                                    <ArrowRight className="w-3 h-3 text-[#ff8d00] group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </Link>

                                            <div className="space-y-10">
                                                {megaContent[mobileView].columns.map((col, idx) => (
                                                    <div key={idx} className="space-y-5">
                                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00b0d4]/60">
                                                            {col.title}
                                                        </h3>
                                                        <div className="flex flex-col gap-5">
                                                            {col.links.map((link) => (
                                                                link.path ? (
                                                                    <Link
                                                                        key={link.name}
                                                                        to={link.path}
                                                                        onClick={() => setMenuOpen(false)}
                                                                        className="text-base font-semibold text-white/80 hover:text-white transition-colors flex items-center justify-between group"
                                                                    >
                                                                        <span>{link.name}</span>
                                                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                                    </Link>
                                                                ) : (
                                                                    <div
                                                                        key={link.name}
                                                                        className="text-base font-semibold text-white/50 flex items-center justify-between cursor-default"
                                                                    >
                                                                        <span>{link.name}</span>
                                                                    </div>
                                                                )
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Featured Area */}
                                                {megaContent[mobileView].featured && (
                                                    <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 border-t-brand-cyan/40">
                                                        <div className="flex flex-col gap-4">
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-[#00b0d4]">
                                                                {megaContent[mobileView].featured.label}
                                                            </span>
                                                            <h4 className="text-xl font-black text-white leading-tight">
                                                                {megaContent[mobileView].featured.title}
                                                            </h4>
                                                            <Link
                                                                to={megaContent[mobileView].featured.path}
                                                                onClick={() => setMenuOpen(false)}
                                                                className="inline-flex items-center gap-2 text-xs font-black text-[#ff8d00] uppercase tracking-widest mt-2 hover:gap-3 transition-all"
                                                            >
                                                                Learn More <ArrowRight className="w-4 h-4" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </>
    );
}

export default Navbar;