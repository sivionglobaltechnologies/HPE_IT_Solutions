import React from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactCTA = () => {
    const navigate = useNavigate();
    return (
        <section id="contact" className="bg-slate-50 dark:bg-[#011b26] py-12 px-6 min-h-[45vh] flex items-center relative overflow-hidden text-slate-900 dark:text-white transition-colors duration-500" aria-labelledby="contact-heading">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[#00b0d4] rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* LEFT SIDE: Content */}
                    <div>
                        <span className="text-brand-orange text-xs font-black tracking-[0.3em] uppercase mb-4 block">
                            GET IN TOUCH
                        </span>
                        <h2 id="contact-heading" className="text-xl md:text-3xl font-semibold mb-4 leading-tight text-[#011b26] dark:text-white">
                            Ready to Transform Your Enterprise?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
                            Let us help you build the digital infrastructure your business needs.
                            Reach out for a expert consultation.
                        </p>
                        <button className="bg-brand-orange hover:bg-white hover:text-[#011b26] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center group cursor-pointer shadow-xl shadow-orange-900/20"
                            onClick={() => navigate('/contact#contact-grid')}
                        >
                            Contact Us
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* RIGHT SIDE: Contact Details */}
                    <div className="space-y-4">
                        {/* Address Card */}
                        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex items-start space-x-5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group shadow-sm dark:shadow-none">
                            <div className="bg-[#00b0d4]/10 p-3 rounded-xl">
                                <MapPin className="w-6 h-6 text-[#00b0d4]" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-[#00b0d4] uppercase tracking-widest mb-1">Office Address</h3>
                                <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 font-bold uppercase transition-colors">
                                    Corporate Office– Hyderabad
                                </p>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <a
                            href="tel:+6282134235909"
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex items-start space-x-5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group shadow-sm dark:shadow-none cursor-pointer no-underline"
                        >
                            <div className="bg-brand-orange/10 p-3 rounded-xl">
                                <Phone className="w-6 h-6 text-brand-orange" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-brand-orange uppercase tracking-widest mb-1">Phone Number</h3>
                                <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 font-bold tracking-wider">+62 821-3423-5909</p>
                            </div>
                        </a>

                        {/* Email Card */}
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=support@hpeitsolutions.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex items-start space-x-5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group shadow-sm dark:shadow-none cursor-pointer no-underline"
                        >
                            <div className="bg-emerald-500/10 p-3 rounded-xl">
                                <Mail className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-widest mb-1">Email Inquiry</h3>
                                <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 font-bold lowercase transition-colors">support@hpeitsolutions.com</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
