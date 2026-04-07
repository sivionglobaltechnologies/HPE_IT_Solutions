import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Cpu, Globe2, ShieldCheck, MapPin, Briefcase, Building } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { citiesData } from '../data/contactLocations';

// Custom white icon for pinpoints
const whiteIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <div style="background-color: white; width: 10px; height: 10px; border: 1.5px solid #00b0d4; border-radius: 50%; box-shadow: 0 0 10px rgba(255,255,255,0.8);"></div>
            <span style="color: white; font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; text-shadow: 0 1px 4px rgba(0,0,0,0.8); white-space: nowrap;">{{CITY_NAME}}</span>
        </div>
    `,
    iconSize: [80, 25],
    iconAnchor: [40, 5]
});

// Fix Leaflet issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
import { useTheme } from '../context/ThemeContext';

/* ─── Scroll Fade-Up ─── */
const FadeUp = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
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

const Divider = ({ isDark }) => (
    <div className={`max-w-7xl mx-auto px-8 md:px-16 border-t ${isDark ? 'border-white/[0.07]' : 'border-slate-200'}`} />
);

const contentBlocks = [
    { icon: Users, color: 'text-orange-400', borderColor: 'border-orange-400/25', label: 'Workforce Depth', title: 'Institutional-Grade Human Capital', body: ['HPE IT Solutions operates a structured, multi-tier workforce across all delivery verticals. From senior governance executives to field-level technical specialists, every role is defined within a clear accountability hierarchy.', 'Our workforce development model is built around continuous skill advancement, cross-functional deployment capability, and governance-aligned performance management — enabling consistently high delivery standards.'] },
    { icon: Cpu, color: 'text-blue-400', borderColor: 'border-blue-400/25', label: 'Technical Capability', title: 'Engineering Excellence Across Domains', body: ['Our technical teams maintain expertise across infrastructure build-out, network modernization, digital systems integration, and enterprise IT consolidation. This multi-domain proficiency allows us to manage complex, interdependent project components.', 'We deploy structured engineering protocols, technology-specific compliance standards, and performance benchmarking systems that ensure every technical deliverable meets institutional accountability requirements.'] },
    { icon: Globe2, color: 'text-teal-400', borderColor: 'border-teal-400/25', label: 'Infrastructure Reach', title: 'National-Scale Delivery Footprint', body: ['With active operations spanning 20 Indian states and over 500 concurrent sites under management, HPE IT Solutions maintains one of the most extensive infrastructure delivery footprints in the enterprise IT sector.', 'This architecture enables us to scale delivery rapidly in response to project expansions, new mandates, or urgent mobilization requirements — while maintaining full operational coherence, financial accountability, and compliance governance.'] },
    { icon: ShieldCheck, color: 'text-indigo-400', borderColor: 'border-indigo-400/25', label: 'Governance & Management', title: 'Structured Oversight at Every Level', body: ['Our governance architecture integrates ISO-certified audit frameworks, structured reporting protocols, and multi-layer approval mechanisms that ensure total operational transparency.', 'Senior management visibility into every project lifecycle — from initiation through closure — ensures that strategic intent is translated accurately into field execution. Our institutional governance culture is the foundation of our reliability.'] },
];


const Strength = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <article className={`transition-colors duration-500 overflow-x-hidden font-sans ${isDark ? 'bg-[#0a0f1e] text-white' : 'bg-[#f8fafc] text-slate-900'}`}>

            {/* TOP INTRO — Enhanced with Image */}
            <section className="px-8 md:px-16 pt-32 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7 space-y-10">
                            <FadeUp className="space-y-6">
                                <Label text="Organisational Strength" color="text-orange-400" isDark={isDark} />
                                <h1 className={`text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Capability. Scale. <br />
                                    <span className={isDark ? 'text-white' : 'text-slate-900'}>Institutional Depth.</span>
                                </h1>
                                <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full" />
                            </FadeUp>

                            <FadeUp delay={0.15} className="space-y-6">
                                <p className={`text-base md:text-lg font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                                    HPE IT Solutions has built an institutional-grade organisational structure capable of managing large-scale, multi-vertical enterprise mandates with precision.
                                </p>
                                <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                                    Formed through 70+ strategic integrations, our workforce capability, technical depth, and governance architecture represent a singular competitive advantage.
                                </p>
                                <div className="pt-4">
                                    <Link to="/contact" className={`inline-flex items-center gap-4 px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-blue-700 transition-all shadow-xl hover:scale-105 active:scale-95`}>
                                        Engage With Leadership
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </FadeUp>
                        </div>

                        {/* New Side Image */}
                        <FadeUp delay={0.3} className="lg:col-span-5 mt-12 lg:mt-0 flex lg:justify-end">
                            <div className={`relative w-full max-w-[480px] rounded-[2rem] overflow-hidden border transition-all duration-500 group ${isDark ? 'border-white/10 bg-slate-900' : 'border-slate-200 shadow-2xl bg-white'}`}>
                                <div className="aspect-square relative overflow-hidden">
                                    <img
                                        src="/infrastructure.png"
                                        alt="Modern Corporate Architecture"
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
                                </div>
                                <div className="absolute bottom-8 left-8 right-8 z-10">
                                    <p className="text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-2">Corporate Infrastructure</p>
                                    <p className="text-white text-2xl font-black uppercase tracking-tight leading-none">Enterprise Scale</p>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            <Divider isDark={isDark} />

            {/* STATS GRID SECTION */}
            <section className="px-8 md:px-16 py-10 relative z-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            { icon: Users, value: '2000+', label: 'Total Employees', sub: 'Nationwide Workforce' },
                            { icon: Cpu, value: '350+', label: 'IT Professionals', sub: 'Core Engineering Depth' },
                            { icon: Briefcase, value: '1200+', label: 'Field & Infra Experts', sub: 'On-site Technical Force' },
                            { icon: ShieldCheck, value: '200+', label: 'Project Managers', sub: 'Regional Governance' },
                            { icon: Building, value: '150+', label: 'Enterprise Clients', sub: 'Active Institutional Partners' },
                            { icon: Globe2, value: '500+', label: 'Managed Sites', sub: 'Live Operational Assets' },
                        ].map((stat, i) => (
                            <FadeUp key={i} delay={i * 0.05}>
                                <div className={`p-4 rounded-xl border transition-all duration-300 group ${isDark ? 'bg-[#0a0f1e] border-white/[0.07] hover:border-white/15' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}>
                                    <p className={`text-[9px] font-black uppercase tracking-[0.25em] mb-1.5 ${isDark ? 'text-blue-400/70' : 'text-blue-500'}`}>{stat.label}</p>
                                    <p className={`text-2xl font-black tracking-tight leading-none mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</p>
                                    <p className={`text-[8px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>{stat.sub}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* OPERATIONAL FOOTPRINT SECTION */}
            <section className={`py-24 overflow-hidden border-y border-white/10 ${isDark ? 'bg-black' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-8 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Content */}
                        <div className="space-y-10 relative z-10">
                            <div>
                                <Label text="National Footprint" color="text-blue-400" isDark={isDark} />
                                <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight mt-4 leading-[1.1] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Operational <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Presence</span>
                                </h2>
                                <div className="w-20 h-1.5 bg-blue-500 rounded-full mt-8" />
                            </div>

                            <p className={`text-lg font-medium leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                                Our institutional depth is mirrored by our physical reach. With a centralized command structure and decentralized execution hubs, we manage infrastructure assets at scale across the subcontinent.
                            </p>

                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div className="space-y-2">
                                    <p className={`text-4xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>20+</p>
                                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">States Active</p>
                                </div>
                                <div className="space-y-2">
                                    <p className={`text-4xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>500+</p>
                                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">Managed Sites</p>
                                </div>
                            </div>

                            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                <p className={`text-xs font-bold leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                                    HPE IT Solutions leverages a unified operational matrix ensuring localized support and resilient service delivery for enterprise clients nationwide.
                                </p>
                            </div>
                        </div>

                        {/* Right: Focused India Map */}
                        <FadeUp delay={0.2} className="relative">
                            <div className={`relative h-[380px] md:h-[420px] rounded-2xl overflow-hidden border shadow-xl ${isDark ? 'border-white/10 bg-slate-900' : 'border-slate-200'}`}>
                                <MapContainer
                                    center={[22.5, 78]}
                                    zoom={4.5}
                                    scrollWheelZoom={false}
                                    attributionControl={false}
                                    className="h-full w-full grayscale brightness-[0.85]"
                                >
                                    <TileLayer
                                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                    />
                                    {Object.entries(citiesData).map(([city, data]) => {
                                        // Dynamic colors based on theme for the "white map/black dots" request
                                        const dotColor = isDark ? 'black' : 'white';
                                        const textColor = isDark ? 'black' : 'white';
                                        const borderColor = isDark ? '#00b0d4' : '#00b0d4';

                                        const localizedIcon = L.divIcon({
                                            className: 'custom-div-icon',
                                            html: `
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                                <div style="background-color: #00b0d4; width: 8px; height: 8px; border: 1.5px solid #fff; border-radius: 50%; box-shadow: 0 0 8px rgba(0,176,212,0.6);"></div>
                                <span style="color: white; font-family: 'Inter', sans-serif; font-size: 7px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; text-shadow: 0 1px 3px rgba(0,0,0,0.8); white-space: nowrap;">${city}</span>
                            </div>
                            `,
                                            iconSize: [80, 25],
                                            iconAnchor: [40, 5]
                                        });

                                        return (
                                            <Marker key={city} position={data.center} icon={localizedIcon}>
                                                <Popup className="hpe-dark-popup">
                                                    <div className="p-4 bg-slate-900 text-white rounded-xl border border-white/10 min-w-[200px]">
                                                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-blue-400 mb-2 border-b border-white/10 pb-2">{city} HUB</h4>
                                                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed mb-4">Regional execution hub for infrastructure operations.</p>
                                                        <div className="flex items-center gap-2 text-[9px] font-black tracking-widest text-white/50 bg-white/5 p-2 rounded-lg">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                                            HUB ACTIVE
                                                        </div>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        );
                                    })}
                                </MapContainer>

                                {/* Decorative Map Overlay */}
                                <div className="absolute top-6 left-6 p-4 backdrop-blur-md bg-black/20 border border-white/10 rounded-2xl z-[1000] hidden sm:block">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                                        <span className="text-[9px] font-black tracking-widest text-white uppercase">Operational Matrix</span>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            <Divider isDark={isDark} />

            {/* WORKFORCE DEPTH BLOCK */}
            <section id="workforce" className="px-8 md:px-16 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        <FadeUp className="lg:col-span-5 space-y-5">
                            <div className={`pl-5 border-l-2 space-y-3 transition-colors duration-500 ${isDark ? contentBlocks[0].borderColor : contentBlocks[0].borderColor.replace('25', '100')}`}>
                                <Label text={contentBlocks[0].label} color={contentBlocks[0].color} isDark={isDark} />
                                <h2 className={`text-xl font-semibold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {contentBlocks[0].title}
                                </h2>
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${isDark ? 'bg-white/[0.06] border-white/10 text-orange-400' : 'bg-slate-50 border-slate-200 text-orange-600'}`}>
                                    <Users size={20} strokeWidth={1.5} />
                                </div>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
                                    Multi-tier · Pan-India · Governance-aligned
                                </p>
                            </div>
                        </FadeUp>
                        <FadeUp delay={0.15} className={`lg:col-span-7 space-y-5 text-[15px] leading-[1.9] font-medium transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                            {contentBlocks[0].body.map((p, i) => <p key={i}>{p}</p>)}
                        </FadeUp>
                    </div>
                </div>
            </section>


            {/* TECHNICAL CAPABILITY + INFRA REACH */}
            <section id="technical-capability" className="px-8 md:px-16 py-24">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        <FadeUp className={`lg:col-span-7 space-y-5 text-[15px] leading-[1.9] font-medium order-last lg:order-first ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                            {contentBlocks[1].body.map((p, i) => <p key={i}>{p}</p>)}
                        </FadeUp>
                        <FadeUp className="lg:col-span-5 space-y-5">
                            <div className={`pl-5 border-l-2 space-y-3 transition-colors duration-500 ${isDark ? contentBlocks[1].borderColor : contentBlocks[1].borderColor.replace('25', '100')}`}>
                                <Label text={contentBlocks[1].label} color={contentBlocks[1].color} isDark={isDark} />
                                <h2 className={`text-xl font-semibold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {contentBlocks[1].title}
                                </h2>
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${isDark ? 'bg-white/[0.06] border-white/10 text-blue-400' : 'bg-slate-50 border-slate-200 text-blue-600'}`}>
                                    <Cpu size={20} strokeWidth={1.5} />
                                </div>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
                                    Multi-domain · ISO-aligned · Zero sub-contracting
                                </p>
                            </div>
                        </FadeUp>
                    </div>

                    <div className={`border-t transition-colors ${isDark ? 'border-white/[0.07]' : 'border-slate-100'}`} />

                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        <FadeUp className="lg:col-span-5 space-y-5">
                            <div className={`pl-5 border-l-2 space-y-3 transition-colors duration-500 ${isDark ? contentBlocks[2].borderColor : contentBlocks[2].borderColor.replace('25', '100')}`}>
                                <Label text={contentBlocks[2].label} color={contentBlocks[2].color} isDark={isDark} />
                                <h2 className={`text-xl font-semibold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {contentBlocks[2].title}
                                </h2>
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${isDark ? 'bg-white/[0.06] border-white/10 text-teal-400' : 'bg-slate-50 border-slate-200 text-teal-600'}`}>
                                    <Globe2 size={20} strokeWidth={1.5} />
                                </div>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
                                    20 States · 500+ Sites · Rapid Mobilisation
                                </p>
                            </div>
                        </FadeUp>
                        <FadeUp delay={0.15} className={`lg:col-span-7 space-y-5 text-[15px] leading-[1.9] font-medium transition-colors ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                            {contentBlocks[2].body.map((p, i) => <p key={i}>{p}</p>)}
                        </FadeUp>
                    </div>
                </div>
            </section>

            <Divider isDark={isDark} />

            {/* GOVERNANCE BLOCK */}
            <section id="governance" className="px-8 md:px-16 py-12">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                    <FadeUp className="lg:col-span-7 space-y-8">
                        <div className={`pl-5 border-l-2 space-y-3 transition-colors duration-500 ${isDark ? contentBlocks[3].borderColor : contentBlocks[3].borderColor.replace('25', '100')}`}>
                            <Label text={contentBlocks[3].label} color={contentBlocks[3].color} isDark={isDark} />
                            <h2 className={`text-2xl font-semibold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {contentBlocks[3].title}
                            </h2>
                        </div>
                        <div className={`space-y-5 text-[15px] leading-[1.9] font-medium transition-all ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                            {contentBlocks[3].body.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                        <div className={`grid grid-cols-3 gap-0 border rounded-xl overflow-hidden mt-4 shadow-sm transition-all duration-500 ${isDark ? 'border-white/10' : 'border-slate-200 bg-white'}`}>
                            {[
                                { label: 'ISO Certified', desc: 'Audit-ready frameworks', col: 'text-indigo-400' },
                                { label: 'Full Visibility', desc: 'Executive-level reporting', col: 'text-blue-400' },
                                { label: 'Zero Tolerance', desc: 'Governance breach protocols', col: 'text-teal-400' },
                            ].map((item, i) => (
                                <div key={i} className={`p-5 space-y-1.5 transition-colors ${i < 2 ? (isDark ? 'border-r border-white/10' : 'border-r border-slate-100') : ''}`}>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? item.col : item.col.replace('400', '600')}`}>{item.label}</p>
                                    <p className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.18} className="lg:col-span-5 mt-12 lg:mt-0">
                        <div className={`relative w-full rounded-[2rem] overflow-hidden border transition-all duration-500 group ${isDark ? 'border-white/10 bg-slate-900' : 'border-slate-200 shadow-2xl bg-white'}`}>
                            <div className="w-full h-[400px] md:h-[480px] relative overflow-hidden">
                                <img
                                    src="/governance_girl_image.png"
                                    alt="Governance Architecture"
                                    loading="lazy"
                                    className="w-full h-full object-cover object-top grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
                            </div>
                            <div className="absolute bottom-8 left-8 right-8 z-10">
                                <p className="text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-2">Governance Architecture</p>
                                <p className="text-white text-2xl font-black uppercase tracking-tight leading-none">Institutional Oversight</p>
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* CTA */}
            <section className="px-8 md:px-16 pb-40">
                <FadeUp className="max-w-5xl mx-auto">
                    <div className={`relative py-16 px-10 md:px-16 rounded-[2rem] border overflow-hidden transition-all duration-500 group ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-white shadow-2xl'}`}>
                        {isDark ? (
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-500/[0.06] blur-[120px] rounded-full pointer-events-none" />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white pointer-events-none" />
                        )}
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="space-y-3 lg:max-w-lg">
                                <h2 className={`text-lg md:text-xl font-bold uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Partner With an Organisation<br />
                                    <span className="bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">Built for Enterprise Scale</span>
                                </h2>
                                <p className={`text-sm font-medium leading-relaxed max-w-md ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                    Engage with HPE IT Solutions to access institutional-grade workforce depth, technical capability, and national infrastructure reach.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <Link to="/contact" className="px-10 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl shadow-blue-600/20 text-center">Begin Engagement</Link>
                                <Link to="/vision-mission" className={`px-10 py-4 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all text-center border ${isDark ? 'bg-white/[0.06] border-white/10 text-white hover:bg-white/[0.11]' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'}`}>View Vision & Mission</Link>
                            </div>
                        </div>
                    </div>
                </FadeUp>
            </section>

        </article>
    );
};

export default Strength;
