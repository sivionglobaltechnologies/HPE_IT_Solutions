
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-[#011b26] text-white border-t border-white/5 pt-16 pb-10 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* ── Top Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Info — full width on mobile, 1 col on desktop */}
                    <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                        <Link to="/" className="flex flex-col items-center lg:items-start gap-3 group">
                            <img
                                src="/HPE LOGO.png"
                                alt="HPE IT Solutions"
                                loading="lazy"
                                className="h-[70px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="flex flex-col">
                                <span className="text-white font-black text-xl tracking-tight">HPE <span className="text-[#ff8d00]">IT Solutions</span></span>
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Corporate Office – Hyderabad</span>
                            </div>
                        </Link>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs italic font-medium">
                            "Engineering Infrastructure Through Technology."
                        </p>

                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <span
                                    key={i}
                                    className="text-gray-500 hover:text-[#ff8d00] transition-all transform hover:-translate-y-1 cursor-default"
                                    aria-label="Social Media"
                                >
                                    <Icon size={20} />
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Middle columns: 2-col on mobile, side-by-side on desktop */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-8 border-t border-white/5 pt-8 lg:border-0 lg:pt-0">

                        {/* Explore */}
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-5 text-white relative inline-block">
                                Explore
                                <span className="absolute -bottom-1.5 left-0 w-6 h-0.5 bg-[#ff8d00] rounded-full" />
                            </h4>
                            <ul className="space-y-3">
                                {['HOME', 'ABOUT', 'SERVICES', 'PROJECTS', 'CERTIFICATIONS', 'GROWTH STRATEGY', 'CONTACT'].map((link) => (
                                    <li key={link}>
                                        <Link
                                            to={link === 'HOME' ? '/' : link === 'GROWTH STRATEGY' ? '/growth-strategy' : `/${link.toLowerCase()}`}
                                            className="text-gray-400 hover:text-[#00b0d4] text-[10px] font-bold tracking-widest transition-colors flex items-center group"
                                        >
                                            <span className="w-0 overflow-hidden group-hover:w-3 transition-all text-[#ff8d00] text-xs">›</span>
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Expertise */}
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-5 text-white relative inline-block">
                                Expertise
                                <span className="absolute -bottom-1.5 left-0 w-6 h-0.5 bg-[#00b0d4] rounded-full" />
                            </h4>
                            <ul className="space-y-3">
                                {['Cloud Integration', 'Cybersecurity', 'AI & Automation', 'Enterprise ERP', 'Data Analytics'].map((item) => (
                                    <li key={item}>
                                        <div className="text-gray-400 text-[10px] font-semibold cursor-default leading-snug">
                                            {item}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Connect — full width row on mobile */}
                    <div className="lg:col-span-1 border-t border-white/5 pt-8 lg:border-0 lg:pt-0">
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-5 text-white relative inline-block">
                            Connect
                            <span className="absolute -bottom-1.5 left-0 w-6 h-0.5 bg-[#ff8d00] rounded-full" />
                        </h4>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group">
                                <div className="p-2.5 bg-white/5 rounded-lg text-[#ff8d00] shrink-0">
                                    <MapPin size={16} />
                                </div>
                                <span className="text-gray-400 text-xs leading-relaxed">
                                    Corporate Office – Hyderabad
                                </span>
                            </div>

                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@hpeitsolutions.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 group text-gray-400 hover:text-white transition-colors"
                            >
                                <div className="p-2.5 bg-white/5 rounded-lg text-[#00b0d4] shrink-0">
                                    <Mail size={16} />
                                </div>
                                <span className="text-[11px] font-bold tracking-wide break-all">
                                    support@hpeitsolutions.com
                                </span>
                            </a>

                            <a
                                href="tel:+6282134235909"
                                className="flex items-center gap-3 group text-gray-400 hover:text-white transition-colors"
                            >
                                <div className="p-2.5 bg-white/5 rounded-lg text-white shrink-0">
                                    <Phone size={16} />
                                </div>
                                <span className="text-xs font-bold tracking-widest">
                                    +62 821-3423-5909
                                </span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* ── Bottom Bar ── */}
                <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    <p className="text-gray-500 text-[10px] font-bold tracking-[0.15em] uppercase text-center">
                        © {currentYear} HPE IT SOLUTIONS PVT LTD. ALL RIGHTS RESERVED.
                    </p>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((policy) => (
                            <span
                                key={policy}
                                className="text-gray-500 hover:text-white text-[10px] font-bold tracking-widest uppercase transition-colors cursor-default"
                            >
                                {policy}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;

